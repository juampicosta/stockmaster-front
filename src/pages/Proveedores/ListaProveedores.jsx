import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { obtenerProveedores, eliminarProveedor } from '../../services/apiProveedores'
import {
  MdEmail,
  MdPhone,
  MdPerson,
  MdAdd,
  MdAddCircle,
  MdEdit,
  MdDelete
} from 'react-icons/md'
import { IoMdPaper } from 'react-icons/io'

const ListaProveedores = () => {
  const [proveedores, setProveedores] = useState([])

  //Para dar de baja el proveedor
const handleBorrarProveedor = async (id) => {
  if (!window.confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
    return
  }

  const { errorMsg } = await eliminarProveedor(id)
  console.log('Error al eliminar proveedor:', errorMsg)
  if (errorMsg) {
    if (errorMsg.includes("Orden de Compra asociada")) {
      return toast.error("No se puede eliminar el proveedor porque tiene una Orden de Compra asociada en estado 'Pendiente' o 'En curso'.")
    }
    if (errorMsg.includes("proveedor predeterminado")) {
      return toast.error("No se puede eliminar el proveedor porque es proveedor predeterminado de uno o más Artículos.")
    }
    // Mensaje genérico para otros errores
    return toast.error('No se pudo eliminar el proveedor. ' + errorMsg)
  }

  setProveedores((prevState) => prevState.filter((prov) => prov.id !== id))
  toast.success('Proveedor eliminado correctamente')
}

// Llamar al servicio para obtener los proveedores
  useEffect(() => {
    const fetchProveedores = async () => {
      const { data, errorMsg } = await obtenerProveedores()
      if (errorMsg) {
        return toast.error(errorMsg)
      }

      setProveedores(data)
    }

    fetchProveedores()
  }, [])




  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Gestión de Proveedores
      </h1>

      <section className='mb-12'>
        <a
          className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex  items-center justify-center w-fit'
          href='/proveedores/alta-proveedor'
        >
          <MdAddCircle />
          <span className='ml-2'>Crear Proveedor</span>
        </a>
        <section className='mt-10'>
          <h2 className='text-xl font-semibold text-orange-800 mb-4'>
            Lista de Proveedores
          </h2>
          {proveedores.length === 0 ? (
            <p className='text-gray-500'>Aún no hay proveedores creados.</p>
          ) : (
            <ul className='space-y-4'>
              {proveedores.map((prov) => (
                <li
                  key={prov.id}
                  className='flex justify-between items-center bg-white shadow-lg border border-yellow-200 rounded-xl p-6'
                >
                  <div className='flex flex-col justify-center items-start'>
                    <div className='flex items-center justify-center mb-3'>
                      <div className='flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mr-3'>
                        <MdPerson className='text-2xl text-orange-700' />
                      </div>
                      <span className='text-xl font-semibold text-orange-800'>
                        {prov.razonSocial}
                      </span>
                    </div>
                    <div className='flex items-center mb-1 ml-3'>
                      <MdEmail className='text-lg text-orange-500 mr-2' />
                      <a
                        href={`mailto:${prov.email}`}
                        className='text-md text-gray-700'
                      >
                        {prov.email}
                      </a>
                    </div>
                    <div className='flex items-center ml-3'>
                      <MdPhone className='text-lg text-orange-500 mr-2' />
                      <a
                        href={`tel:${prov.telefono}`}
                        className='text-md text-gray-700'
                      >
                        {prov.telefono}
                      </a>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/proveedores/detalle/${prov.id}`}
                      state={{ proveedor: prov }}
                      className='flex items-center justify-center ml-2 text-green-600 hover:underline'
                    >
                      <IoMdPaper className='text-lg text-green-500 mr-2' />
                      Ver Detalle
                    </Link>
                    <Link
                      to={`/proveedores/editar/${prov.id}`}
                      className='ml-2 text-blue-600 hover:underline flex items-center'
                    >
                      <MdEdit className='text-lg text-blue-500 mr-2' />
                      Editar
                    </Link>
                    <button
                      className='cursor-pointer ml-2 text-red-600 hover:underline flex items-center justify-center'
                      onClick={() => handleBorrarProveedor(prov.id)}
                    >
                      <MdDelete className='text-lg text-red-500 mr-2' />
                      Borrar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </div>
  )
}

export default ListaProveedores
