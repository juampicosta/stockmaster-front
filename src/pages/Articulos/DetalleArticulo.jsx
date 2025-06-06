import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { obtenerArticuloPorId } from '../../services/apiArticulos'
import { toast } from 'sonner'
import { BsFillBoxSeamFill, BsGraphUpArrow } from 'react-icons/bs'
import { FaBoxes } from 'react-icons/fa'
import { FaMoneyBill } from 'react-icons/fa6'
import {
  MdOutlineInventory,
  MdPerson,
  MdAddCircle,
  MdSecurity
} from 'react-icons/md'
import { GiPriceTag } from 'react-icons/gi'

const DetalleArticulo = () => {
  const { id } = useParams()
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
              Demanda: {articulo.demandaArticulo}
            </p>

            <p className='flex gap-1.5 items-center mb-2'>
              <FaMoneyBill />
              Costo de almacenamiento: {articulo.costoAlmacenamiento}
            </p>

            <p className='flex gap-1.5 items-center mb-2'>
              <MdSecurity />
              Stock de Seguridad: {articulo.stock_seguridad}
            </p>

            <p className='flex gap-1.5 items-center mb-2'>
              <GiPriceTag />
              Precio de Venta: {articulo.precioVenta}
            </p>

            <p className='flex gap-1.5 items-center mb-2'>
              <MdOutlineInventory />
              Modelo Inventario: {articulo.tipoModeloInventario.descripcion}
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
      <div className='flex gap-8 items-center mb-6'>
        <h2 className='text-2xl font-bold text-orange-800'>Proveedores</h2>
        <button className='bg-green-500 text-white px-4 py-1.5 rounded-md shadow-md hover:bg-green-700 transition duration-200 flex items-center w-fit gap-2'>
          <MdAddCircle className='text-lg' />
          Agregar Proveedor
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
                      <span className='font-medium'>Costo de Compra:</span>
                      <span className='ml-2'>
                        ${articuloProveedor.costoCompra || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className='font-medium'>Costo de Pedido:</span>
                      <span className='ml-2'>
                        ${articuloProveedor.costoPedido || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className='font-medium'>Demora de Entrega:</span>
                      <span className='ml-2'>
                        {articuloProveedor.demoraEntrega || 'N/A'} días
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button className='text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-300 hover:bg-blue-50 transition duration-200'>
                    Editar
                  </button>
                  <button className='text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-300 hover:bg-red-50 transition duration-200'>
                    Eliminar
                  </button>
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
              Puedes agregar un proveedor haciendo clic en el botón "Agregar
              Proveedor".
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetalleArticulo
