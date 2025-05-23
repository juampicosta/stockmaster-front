import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { obtenerProveedores } from '../../services/apiProveedores'

const ListaProveedores = () => {
  const [proveedores, setProveedores] = useState([
    {
      id: 1,
      email: 'proveedor1@gmail.com',
      razonSocial: 'Proveedor Uno S.A.',
      telefono: '123456789',
      articulos: [
        {
          id: 1,
          nombre: 'Articulo 1',
          datosArticulo: {
            costoCompra: 100,
            costoPedido: 150,
            demoraEntrega: 5,
            precioUnitario: 200
          }
        },
        {
          id: 2,
          nombre: 'Articulo 2',
          datosArticulo: {
            costoCompra: 200,
            costoPedido: 250,
            demoraEntrega: 10,
            precioUnitario: 300
          }
        }
      ]
    }
  ])

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
                  className='flex justify-between items-center bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded'
                >
                  <div>
                    <p>
                      <strong>Email:</strong> {prov.email}
                    </p>
                    <p>
                      <strong>Razón Social:</strong> {prov.razonSocial}
                    </p>
                    <p>
                      <strong>Teléfono:</strong> {prov.telefono}
                    </p>
                  </div>
                  <div>
                    <Link
                      to={`/proveedores/detalle/${prov.id}`}
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
