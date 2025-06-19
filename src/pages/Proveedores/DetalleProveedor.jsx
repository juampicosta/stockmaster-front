import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  obtenerProveedorPorId,
  obtenerArticulosProveedor
} from '../../services/apiProveedores'
import { Link } from 'react-router-dom'
import {
  MdEmail,
  MdPhone,
  MdAttachMoney,
  MdAccessTime,
  MdPerson,
  MdAssignment,
  MdLocalShipping,
  MdInventory,
  MdAddCircle,
  MdEdit,
  MdDateRange
} from 'react-icons/md'
import { toast } from 'sonner'

const DetalleProveedor = () => {
  // Obtener el ID del proveedor desde los parámetros de la URL
  const { id } = useParams()
  const navigate = useNavigate()

  // Llamar al servicio para obtener el proveedor por ID
  const [proveedor, setProveedor] = useState(null)
  useEffect(() => {
    const fetchProveedor = async () => {
      const { data, errorMsg } = await obtenerProveedorPorId(id)
      if (errorMsg) {
        return toast.error(errorMsg)
      }
      setProveedor(data)
    }
    fetchProveedor()
  }, [id])

  // Llamar al servicio para obtener Articulos de un proveedor por ID
  const [articulosProv, setArticulosProv] = useState([])
  useEffect(() => {
    const fetchArticulosProv = async () => {
      const { data, errorMsg } = await obtenerArticulosProveedor(id)

      if (errorMsg) return toast.error(errorMsg)
      setArticulosProv(data) // Array dentro del objeto de Articulos (ArticuloProveedor)
    }
    fetchArticulosProv()
  }, [id])

  //Para mostrar un mensaje de carga mientras se obtiene el proveedor y no de error
  if (!proveedor) {
    return (
      <div className='bg-white min-h-screen p-8 flex items-center justify-center'>
        <span className='text-orange-600 text-lg'>Cargando proveedor...</span>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-br from-orange-50 to-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Detalle de Proveedor
      </h1>

      <div className='bg-white shadow-lg border border-yellow-200 rounded-xl p-6 mb-8'>
        <div className='flex items-center mb-4'>
          <div className='flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-4'>
            <MdPerson className='text-3xl text-orange-700' />
          </div>
          <span className='text-2xl font-semibold text-orange-800'>
            {proveedor.razonSocial}
          </span>
        </div>
        <div className='flex items-center mb-2'>
          <MdEmail className='text-xl text-orange-500 ml-3 mr-2' />
          <a
            href={`mailto:${proveedor.email}`}
            className='text-md text-gray-700'
          >
            {proveedor.email}
          </a>
        </div>
        <div className='flex items-center'>
          <MdPhone className='text-xl text-orange-500 ml-3 mr-2' />
          <a
            href={`tel:${proveedor.telefono}`}
            className='text-md text-gray-700'
          >
            {proveedor.telefono}
          </a>
        </div>
      </div>

      {articulosProv && articulosProv.length > 0 ? (
        <div className='col-span-full'>
          <div className='flex items-center justify-start gap-x-4 w-full col-span-full mt-2 mb-6'>
            <h3 className='text-lg font-semibold text-orange-800 mb-2'>
              <strong>Articulos Seleccionados</strong>
            </h3>
            <button
              type='submit'
              onClick={() => navigate(`/agregar-articulos/${id}`)}
              className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200 flex items-center'
            >
              <MdAddCircle className='mr-2' />
              Añadir Articulo
            </button>
          </div>

          <ul className='space-y-4'>
            {articulosProv.map((articulo) => {
              const proveedorIntermedia =
                articulo.articulo.articuloProveedores.find(
                  (prov) => prov.proveedor.id === parseInt(id)
                )

              const tipoModelo = proveedorIntermedia?.tipoModeloInventario
              return (
                <li
                  key={articulo.articulo.codigo}
                  className='flex justify-between items-center bg-crema shadow-lg border border-yellow-200 rounded-xl p-6'
                >
                  <div className='flex flex-col justify-center items-start'>
                    <div className='flex items-center justify-center mb-3'>
                      <div className='flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mr-3'>
                        <MdInventory className='text-2xl text-orange-700' />
                      </div>
                      <span className='text-xl font-semibold text-orange-800'>
                        {articulo.articulo.descripcion}
                      </span>
                    </div>
                    <div className='flex flex-col ml-3 text-gray-700 text-md'>
                      <ul className='space-y-1 pl-7 text-md'>
                        <li className='flex items-center'>
                          <MdLocalShipping className='text-lg text-blue-500 mr-2' />
                          <span>
                            <strong>Costo de Pedido:</strong>{' '}
                            {proveedorIntermedia?.costoPedido}
                          </span>
                        </li>
                        <li className='flex items-center'>
                          <MdAccessTime className='text-lg text-yellow-600 mr-2' />
                          <span>
                            <strong>Demora de Entrega (Días) :</strong>{' '}
                            {proveedorIntermedia?.demoraEntrega}
                          </span>
                        </li>
                        <li className='flex items-center'>
                          <MdAttachMoney className='text-lg text-green-700 mr-2' />
                          <span>
                            <strong>Precio Unitario:</strong>{' '}
                            {proveedorIntermedia?.preciounitario}
                          </span>
                        </li>
                        <li className='flex items-center'>
                          <MdAssignment className='text-lg text-orange-400 mr-2' />
                          <span>
                            <strong>Tipo de Modelo:</strong>{' '}
                            {tipoModelo.descripcion || 'Modelo no Definido'}
                          </span>
                        </li>{' '}
                        <li className='flex items-center mt-6'>
                          <span
                            className={`ml-3 px-2 py-1 rounded text-xs font-bold ${
                              articulo.isPredeterminado
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {articulo.isPredeterminado
                              ? 'Proveedor Predeterminado'
                              : 'Proveedor no predeterminado'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='flex flex-col items-end gap-2'>
                    <Link
                      to={`/proveedores/${id}/articulos/${articulo.articulo.codigo}`}
                      className='flex items-center text-blue-600 hover:underline'
                    >
                      <MdEdit className='text-lg text-blue-500 mr-2' />
                      Editar
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <p className='col-span-full text-orange-500'>
          No hay articulos seleccionados!
        </p>
      )}
    </div>
  )
}

export default DetalleProveedor
