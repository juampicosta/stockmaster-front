import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  desvincularArticuloProveedor,
  obtenerArticuloPorId
} from '../../services/apiArticulos'
import { toast } from 'sonner'
import { BsFillBoxSeamFill, BsGraphUpArrow } from 'react-icons/bs'
import { FaBoxes } from 'react-icons/fa'
import { FaMoneyBill } from 'react-icons/fa6'
import {
  MdPerson,
  MdAddCircle,
  MdSecurity,
  MdInventory,
  MdLocalShipping,
  MdAccessTime,
  MdAttachMoney,
  MdAssignment,
  MdEdit,
  MdDelete
} from 'react-icons/md'
import { GiPriceTag } from 'react-icons/gi'
import { IoMdCart } from 'react-icons/io'
import { TbMathMax } from 'react-icons/tb'

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

  const handleEliminar = async (codigoArticulo, idProveedor) => {
    if (
      window.confirm('¿Estás seguro de eliminar este proveedor del artículo?')
    ) {
      try {
        const response = await desvincularArticuloProveedor(
          codigoArticulo,
          idProveedor
        )
        if (!response.ok) {
          throw new Error(response.errorMsg || 'Error al eliminar el proveedor')
        }
        setArticulo((prevArticulo) => ({
          ...prevArticulo,
          articuloProveedores: prevArticulo.articuloProveedores.filter(
            (ap) => ap.proveedor.id !== idProveedor
          )
        }))
        toast.success('Proveedor eliminado correctamente')
      } catch (error) {
        toast.error(`Error al eliminar el proveedor: ${error.message}`)
      }
    }
  }

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
              Costo de Almacenamiento (Por Unidad): $
              {articulo.costoAlmacenamiento}
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
          className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors duration-200 flex items-center w-fit gap-2 cursor-pointer'
        >
          <MdAddCircle className='text-lg' />
          Añadir Proveedor
        </button>
      </div>

      {/* Lista de proveedores */}
      <div className='space-y-4'>
        {articulo.articuloProveedores &&
        articulo.articuloProveedores.length > 0 ? (
          articulo.articuloProveedores
            .filter(
              (articuloProveedor) => !articuloProveedor.proveedor.fechaHoraBaja
            )
            .map((articuloProveedor, index) => {
              const isPredeterminado =
                articuloProveedor.proveedor.id ===
                articulo.provPredeterminado.id
              return (
                <div
                  key={index}
                  className='bg-white border border-orange-200 rounded-lg p-4 shadow-sm'
                >
                  <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-col w-full items-start'>
                      <div className='flex items-center justify-center mb-3'>
                        <div className='flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mr-3'>
                          <MdPerson className='text-2xl text-orange-700' />
                        </div>
                        <span className='text-xl font-semibold text-orange-800'>
                          {articuloProveedor.proveedor.razonSocial}
                          <span
                            className={`ml-3 px-2 py-1 rounded text-xs font-bold ${
                              articuloProveedor?.proveedor.id ==
                              articulo.provPredeterminado?.id
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {articuloProveedor?.proveedor.id ==
                            articulo.provPredeterminado?.id
                              ? 'Proveedor Predeterminado'
                              : 'Proveedor no predeterminado'}
                          </span>
                        </span>
                      </div>
                      <div className='flex flex-col ml-3 text-gray-700 text-md'>
                        <ul className='grid grid-cols-3  gap-3'>
                          <li className='flex items-center'>
                            <MdLocalShipping className='text-lg text-blue-500 mr-2' />
                            <span>
                              <strong>Costo de Pedido:</strong>{' '}
                              {articuloProveedor.costoPedido}
                            </span>
                          </li>
                          <li className='flex items-center'>
                            <MdAccessTime className='text-lg text-yellow-600 mr-2' />
                            <span>
                              <strong>Demora de Entrega (Días) :</strong>{' '}
                              {articuloProveedor.demoraEntrega}
                            </span>
                          </li>
                          <li className='flex items-center'>
                            <MdAttachMoney className='text-lg text-green-700 mr-2' />
                            <span>
                              <strong>Precio Unitario:</strong>{' '}
                              {articuloProveedor.preciounitario}
                            </span>
                          </li>
                          <li className='flex items-center'>
                            <MdAssignment className='text-lg text-orange-400 mr-2' />
                            <span>
                              <strong>Tipo de Modelo:</strong>{' '}
                              {
                                articuloProveedor.tipoModeloInventario
                                  .descripcion
                              }
                            </span>
                          </li>
                          {articuloProveedor.tipoModeloInventario.id == 1 && (
                            <>
                              <li className='flex items-center'>
                                <MdInventory className='text-lg text-orange-400 mr-2' />
                                <span>
                                  <strong>CGI:</strong> $
                                  {articuloProveedor.modeloInventario.cgi}
                                </span>
                              </li>
                              <li className='flex items-center'>
                                <IoMdCart className='text-lg text-orange-400 mr-2' />
                                <span>
                                  <strong>Lote Óptimo: </strong>
                                  {
                                    articuloProveedor.modeloInventario
                                      .loteOptimo
                                  }
                                </span>
                              </li>
                              <li className='flex items-center'>
                                <TbMathMax className='text-lg text-orange-400 mr-2' />
                                <span>
                                  <strong>Punto de Pedido: </strong>
                                  {
                                    articuloProveedor.modeloInventario
                                      .puntoPedido
                                  }
                                </span>
                              </li>
                            </>
                          )}
                          {articuloProveedor.tipoModeloInventario.id == 2 && (
                            <li className='flex items-center'>
                              <TbMathMax className='text-lg text-orange-400 mr-2' />
                              <span>
                                <strong>Inventario Máximo: </strong>
                                {
                                  articuloProveedor.modeloInventario
                                    .inventarioMax
                                }
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <Link
                        to={`/proveedores/${articuloProveedor.proveedor.id}/articulos/${id}`}
                        className='h-fit text-blue-600 hover:text-blue-800 flex items-center px-2 py-1 rounded hover:bg-blue-50 transition duration-200'
                      >
                        <MdEdit className='text-lg text-blue-500 mr-2' />
                        Editar
                      </Link>
                      {!isPredeterminado && (
                        <button
                          onClick={() =>
                            handleEliminar(id, articuloProveedor.proveedor.id)
                          }
                          className='text-red-600 hover:text-red-800 cursor-pointer flex items-center px-2 py-1 rounded hover:bg-red-50 transition duration-200'
                        >
                          <MdDelete className='text-lg text-red-500 mr-2' />
                          Eliminar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
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
