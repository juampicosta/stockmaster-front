import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { obtenerArticuloPorId } from '../../services/apiArticulos'
import { toast } from 'sonner'
import { BsFillBoxSeamFill, BsGraphUpArrow } from 'react-icons/bs'
import { FaBoxes } from 'react-icons/fa'
import { FaMoneyBill } from 'react-icons/fa6'
import { MdPerson, MdAddCircle, MdSecurity } from 'react-icons/md'
import { GiPriceTag } from 'react-icons/gi'
import { AiOutlineProduct } from 'react-icons/ai'

const DetalleArticulo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [articulo, setArticulo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticulo = async () => {
      setLoading(true)
      try {
        const { data, errorMsg } = await obtenerArticuloPorId(id)

        if (errorMsg) {
          throw new Error(errorMsg)
        }

        setArticulo(data)
      } catch (error) {
        toast.error(`Error al cargar el artículo: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchArticulo()
  }, [id])

  if (loading) {
    return (
      <div className='bg-gradient-to-br from-orange-50 to-white min-h-screen p-8'>
        <p className='text-center text-orange-800'>
          Cargando detalles del artículo...
        </p>
      </div>
    )
  }

  if (!articulo) {
    return (
      <div className='bg-gradient-to-br from-orange-50 to-white min-h-screen p-8'>
        <p className='text-center text-orange-800'>
          No se encontró el artículo.
        </p>
      </div>
    )
  }
  console.log(articulo)

  return (
    <div className='bg-gradient-to-br from-orange-50 to-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Detalle de Artículo
      </h1>

      {/* Información del artículo */}
      <div className='bg-white border-1 border-l-4 border-yellow-200 rounded-xl text-orange-800 p-4 shadow-sm mb-8'>
        <div>
          <p className='flex items-center text-2xl font-semibold text-orange-800 gap-2 mb-3'>
            <span className='flex items-center justify-center size-10 bg-orange-200 rounded-full'>
              <BsFillBoxSeamFill className='' />
            </span>
            {articulo.descripcion} #{articulo.codigo}
          </p>
          <div className='ml-3 text-md'>
            <p className='flex gap-1.5 items-center mb-2'>
              <FaBoxes />
              Stock: {articulo.stock}
            </p>

            <p className='flex gap-1.5 items-center mb-2'>
              <BsGraphUpArrow />
              Demanda (Anual): {articulo.demandaArticulo}
            </p>

            <p className='flex gap-1.5 items-center mb-2'>
              <FaMoneyBill />
              Costo de Almacenamiento (Anual): ${articulo.costoAlmacenamiento}
            </p>

            <p className='flex gap-1.5 items-center mb-2'>
              <MdSecurity />
              Stock de Seguridad: {articulo.stockSeguridad}
            </p>

            <p className='flex gap-1.5 items-center mb-2'>
              <GiPriceTag />
              Precio de Venta: ${articulo.precioVenta}
            </p>

            <p className='flex gap-1.5 items-center'>
              <MdPerson />
              Proveedor predeterminado:{' '}
              {articulo.provPredeterminado?.razonSocial ||
                'Sin proveedor predeterminado'}
            </p>
          </div>
        </div>
      </div>

      {/* Sección de proveedores */}
      <div className='flex items-center justify-start gap-x-4 w-full mb-6'>
        <h2 className='text-2xl font-bold text-orange-800'>Proveedores</h2>
        <button
          onClick={() => navigate(`/agregar-proveedor/${id}`)}
          className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors duration-200 flex items-center w-fit gap-2'
        >
          <MdAddCircle className='text-lg' />
          Añadir Proveedor
        </button>
      </div>

      {/* Lista de proveedores */}
      <div className='space-y-4'>
        {articulo.articuloProveedores &&
        articulo.articuloProveedores.length > 0 ? (
          articulo.articuloProveedores.map((articuloProveedor, index) => (
            <div
              key={index}
              className='bg-white border border-orange-200 rounded-lg p-4 shadow-sm'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-lg font-semibold text-orange-800 mb-2'>
                    {articuloProveedor.proveedor?.razonSocial ||
                      `Proveedor ${articuloProveedor.proveedor.id}`}
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-orange-700'>
                    <div>
                      <span className='font-medium'>Precio Unitario:</span>
                      <span className='ml-2'>
                        ${articuloProveedor.preciounitario || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className='font-medium'>
                        Costo de Pedido (Anual):
                      </span>
                      <span className='ml-2'>
                        ${articuloProveedor.costoPedido || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className='font-medium'>
                        Demora de Entrega (Días) (dias):
                      </span>
                      <span className='ml-2'>
                        {articuloProveedor.demoraEntrega || 'N/A'} días
                      </span>
                    </div>
                    <div>
                      <span className='font-medium'>Modelo de Inventario:</span>
                      <span className='ml-2'>
                        {articuloProveedor.tipoModeloInventario.descripcion ||
                          'N/A'}
                      </span>
                    </div>
                    {articuloProveedor.tipoModeloInventario.id == 1 && (
                      <>
                        <div>
                          <span className='font-medium'>
                            CGI (Costo de Gestión de Inventario):
                          </span>
                          <span className='ml-2'>
                            ${articuloProveedor.modeloInventario.cgi || 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className='font-medium'>Lote Óptimo:</span>
                          <span className='ml-2'>
                            {articuloProveedor.modeloInventario.loteOptimo ||
                              'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className='font-medium'>Punto de pedido:</span>
                          <span className='ml-2'>
                            {articuloProveedor.modeloInventario.puntoPedido ||
                              'N/A'}
                          </span>
                        </div>
                      </>
                    )}
                    {/* Mostrar Inventario Máximo solo si es Intervalo Fijo */}
                    {articuloProveedor.tipoModeloInventario.id == 2 && (
                      <div>
                        <span className='font-medium'>Inventario Máximo:</span>
                        <span className='ml-2'>
                          {articuloProveedor.modeloInventario?.inventarioMax ||
                            'N/A'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Link
                    to={`/proveedores/${articuloProveedor.proveedor.id}/articulos/${id}`}
                    className='flex items-center text-blue-600 hover:underline'
                  >
                    Editar
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='bg-white border border-orange-200 rounded-lg p-6 shadow-sm text-center'>
            <p className='text-orange-600 text-lg'>
              No hay proveedores asociados a este artículo.
            </p>
            <p className='text-orange-500 text-sm mt-2'>
              Puedes agregar un proveedor haciendo clic en el botón "Añadir
              Proveedor".
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetalleArticulo
