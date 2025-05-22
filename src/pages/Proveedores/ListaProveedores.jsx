import { useState } from 'react'
import { Link } from 'react-router'

const ListaProveedores = () => {
  //Proveedores creados temporales
  const [proveedoresCreados, setProveedoresCreados] = useState([
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
  //Estados de Alerta y Error:
  const [alerta, setAlerta] = useState('')

  //Para dar de baja el proveedor
  const handleBorrarProveedor = (index) => {
    setProveedoresCreados((prev) => prev.filter((_, idx) => idx !== index))
    setAlerta('Proveedor borrado correctamente')
    setTimeout(() => setAlerta(''), 3000)
  }

  return (
    <div className='bg-white min-h-screen p-8'>
      {alerta && (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-6 py-3 rounded-lg shadow-md z-50 animate-bounce'>
          {alerta}
        </div>
      )}
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
          {proveedoresCreados.length === 0 ? (
            <p className='text-gray-500'>Aún no hay proveedores creados.</p>
          ) : (
            <ul className='space-y-4'>
              {proveedoresCreados.map((prov) => (
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
