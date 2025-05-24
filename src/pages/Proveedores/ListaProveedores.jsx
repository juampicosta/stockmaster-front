import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { obtenerProveedores } from '../../services/apiProveedores'
import { MdEmail, MdPhone, MdPerson } from 'react-icons/md'

const ListaProveedores = () => {
  const [proveedores, setProveedores] = useState([])

  //Para dar de baja el proveedor
  const handleBorrarProveedor = (index) => {
    setProveedores((prev) => prev.filter((_, idx) => idx !== index))
    toast.success('Proveedor eliminado correctamente')
  }

  useEffect(() => {
    // llamada a la API para obtener los proveedores
    const fetchProveedores = async () => {
      const { data, errorMsg } = await obtenerProveedores()
      if (errorMsg) {
        return toast.error(errorMsg)
      }

      setProveedores(data.content)
    }

    fetchProveedores()
  }, [])

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-3xl font-bold text-orange-900 mb-6'>
        Gestión de Proveedores
      </h1>

      <section className='mb-12'>
        <a
          className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600'
          href='/proveedores/alta-proveedor'
        >
          Crear Proveedor
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
                      className='ml-2 text-green-600 hover:underline'
                    >
                      Ver Detalle
                    </Link>
                    <Link
                      to={`/proveedores/editar/${prov.id}`}
                      className='ml-2 text-blue-600 hover:underline'
                    >
                      Editar
                    </Link>
                    <button
                      className='cursor-pointer ml-2 text-red-600 hover:underline'
                      onClick={() => handleBorrarProveedor(prov.id)}
                    >
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
