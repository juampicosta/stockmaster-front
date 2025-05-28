import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { MdAddCircle, MdEdit, MdDelete } from 'react-icons/md'
import { IoMdPaper } from 'react-icons/io'
import { obtenerOrdenes } from '../../services/apiOrdenes'
import { LuBoxes } from 'react-icons/lu'
import { BsCash, BsClock } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { AiFillProduct } from 'react-icons/ai'
import { getOrderStateColor } from '../../utils/getOrderStateColor'

const ListaOrdenes = () => {
  const [ordenes, setOrdenes] = useState([])

  //Para dar de baja la orden
  const handleBorrarOrden = (index) => {
    setOrdenes((prev) => prev.filter((_, idx) => idx !== index))
    toast.success('Orden de compra eliminada correctamente')
  }

  useEffect(() => {
    // llamada a la API para obtener las ordenes
    const fetchOrdenes = async () => {
      const { data, errorMsg } = await obtenerOrdenes()
      if (errorMsg) {
        return toast.error(errorMsg)
      }

      setOrdenes(data.content)
    }

    fetchOrdenes()
  }, [])

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Gestión de Ordenes de Compra
      </h1>

      <section className='mb-12'>
        <a
          className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex  items-center justify-center w-fit'
          href='/ordenes-de-compra/alta'
        >
          <MdAddCircle />
          <span className='ml-2'>Crear Orden de Compra</span>
        </a>
        <section className='mt-10'>
          <h2 className='text-xl font-semibold text-orange-800 mb-4'>
            Lista de Ordenes de Compra
          </h2>
          {ordenes.length === 0 ? (
            <p className='text-gray-500'>
              Aún no hay ordenes de compra creadas.
            </p>
          ) : (
            <ul className='space-y-4'>
              {ordenes.map((ord) => (
                <li
                  key={ord.id}
                  className='flex justify-between items-center bg-white shadow-lg border border-yellow-200 rounded-xl p-6'
                >
                  <div className='flex flex-col justify-center items-start gap-2'>
                    <h2 className='text-xl font-semibold text-gray-900'>
                      Orden #{ord.id}
                    </h2>
                    <div className='flex items-center justify-items-start gap-3'>
                      <div className='flex items-center justify-center gap-2'>
                        <LuBoxes className='text-xl text-orange-700' />
                        <span className='text-md text-orange-800'>
                          {ord.lote}
                        </span>
                      </div>
                      <div className='flex items-center justify-center gap-2'>
                        <BsCash className='text-xl text-orange-700' />
                        <span className='text-md text-orange-800'>
                          ${ord.montoTotal}
                        </span>
                      </div>
                      <div className='flex items-center justify-center gap-2'>
                        <BsClock className='text-xl text-orange-700' />
                        <span className='text-md text-orange-800'>
                          {new Date(ord.fechaHoraAlta).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                      <BiUser className='text-xl text-orange-700' />
                      <span className='text-md text-orange-800'>
                        {ord.proveedor.razonSocial}
                      </span>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                      <AiFillProduct className='text-xl text-orange-700' />
                      <span className='text-md text-orange-800'>
                        {ord.articulo.descripcion}
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-center p-2 px-4 rounded-3xl border ${getOrderStateColor(
                        ord.estadoOrdenCompra.descripcion
                      )}`}
                    >
                      <span className='text-md font-semibold text-gray-900'>
                        {ord.estadoOrdenCompra.descripcion}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/ordenes-de-compra/detalle/${ord.id}`}
                      state={{ orden: ord }}
                      className='flex items-center justify-center ml-2 text-green-600 hover:underline'
                    >
                      <IoMdPaper className='text-lg text-green-500 mr-2' />
                      Ver Detalle
                    </Link>
                    {ord.estadoOrdenCompra.descripcion === 'Pendiente' && (
                      <Link
                        to={`/ordenes-de-compra/editar/${ord.id}`}
                        className='ml-2 text-blue-600 hover:underline flex items-center'
                      >
                        <MdEdit className='text-lg text-blue-500 mr-2' />
                        Editar
                      </Link>
                    )}
                    <button
                      className='cursor-pointer ml-2 text-red-600 hover:underline flex items-center justify-center'
                      onClick={() => handleBorrarOrden(ord.id)}
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

export default ListaOrdenes
