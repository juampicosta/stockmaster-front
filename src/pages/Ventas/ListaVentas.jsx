import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { MdAddCircle } from 'react-icons/md'
import { IoMdPaper } from 'react-icons/io'
import { obtenerVentas } from '../../services/apiVentas'
import { TiTicket } from 'react-icons/ti'
import { BiBox, BiMoney } from 'react-icons/bi'
import { AiFillProduct } from 'react-icons/ai'

const ListaVentas = () => {
  const [ventas, setVentas] = useState([])

  // Llamar al servicio para obtener los proveedores
  useEffect(() => {
    const fetchVentas = async () => {
      const { data, errorMsg } = await obtenerVentas()
      if (errorMsg) {
        return toast.error(errorMsg)
      }

      setVentas(data)
    }

    fetchVentas()
  }, [])

  console.log(ventas)

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Gestión de Ventas
      </h1>

      <section className='mb-12'>
        <a
          className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex  items-center justify-center w-fit'
          href='/ventas/alta-venta'
        >
          <MdAddCircle />
          <span className='ml-2'>Crear Venta</span>
        </a>
        <section className='mt-10'>
          <h2 className='text-xl font-semibold text-orange-800 mb-4'>
            Lista de Ventas
          </h2>
          {ventas.length === 0 ? (
            <p className='text-gray-500'>Aún no hay ventas creadas.</p>
          ) : (
            <ul className='space-y-4'>
              {ventas.map((venta) => (
                <li
                  key={venta.id}
                  className='flex justify-between items-center bg-white shadow-lg border border-yellow-200 rounded-xl p-6'
                >
                  <div className='flex flex-col justify-center items-start'>
                    <div className='flex items-center justify-center mb-3'>
                      <div className='flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mr-3'>
                        <TiTicket className='text-2xl text-orange-700' />
                      </div>
                      <span className='text-xl font-semibold text-orange-800'>
                        #{venta.id}
                      </span>
                    </div>
                    <div className='flex items-center ml-3'>
                      <BiBox className='text-lg text-orange-500 mr-2' />
                      <span className='text-md text-gray-700'>
                        {venta.cantidad}
                      </span>
                    </div>
                    <div className='flex items-center ml-3'>
                      <AiFillProduct className='text-lg text-orange-500 mr-2' />
                      <span className='text-md text-gray-700'>
                        {venta.articulo.descripcion}
                      </span>
                    </div>
                    <div className='flex items-center ml-3'>
                      <BiMoney className='text-lg text-orange-500 mr-2' />
                      <span className='text-md text-gray-700'>
                        ${venta.montoTotal}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/ventas/detalle/${venta.id}`}
                      state={{ venta }}
                      className='flex items-center justify-center ml-2 text-green-600 hover:underline'
                    >
                      <IoMdPaper className='text-lg text-green-500 mr-2' />
                      Ver Detalle
                    </Link>
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

export default ListaVentas
