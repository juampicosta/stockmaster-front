import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { MdAddCircle, MdEdit } from 'react-icons/md'
import { IoMdPaper } from 'react-icons/io'
import {
  advanceOrderState,
  cancelarOrden,
  obtenerOrdenes
} from '../../services/apiOrdenes'
import { LuBoxes } from 'react-icons/lu'
import { BsCash, BsClock } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { AiFillProduct } from 'react-icons/ai'
import { getOrderStateColor } from '../../utils/getOrderStateColor'

const ListaOrdenes = () => {
  const [ordenes, setOrdenes] = useState([])

  useEffect(() => {
    // llamada a la API para obtener las ordenes
    const fetchOrdenes = async () => {
      const { data, errorMsg } = await obtenerOrdenes()
      if (errorMsg) {
        return toast.error(errorMsg)
      }

      setOrdenes(data || [])
    }

    fetchOrdenes()
  }, [])

  const states = {
    Pendiente: {
      nextStates: [
        {
          id: 2,
          nombre: 'Enviar',
          descripcion: 'Enviada'
        },
        {
          id: 4,
          nombre: 'Cancelar',
          descripcion: 'Cancelada'
        }
      ]
    },
    Enviada: {
      nextStates: [
        {
          id: 3,
          nombre: 'Finalizar',
          descripcion: 'Finalizada'
        }
      ]
    }
  }

  const handleChangeState = async (id, newStateId) => {
    if (newStateId === 4) {
      const confirm = window.confirm(
        '¿Estás seguro de que deseas cancelar esta orden?'
      )
      if (!confirm) return
      const { errorMsg } = await cancelarOrden(id)
      if (errorMsg) {
        return toast.error(errorMsg)
      }
    } else {
      const { data, errorMsg } = await advanceOrderState(id)
      if (errorMsg) {
        return toast.error(errorMsg)
      }
    }

    // Actualizar el estado de la orden en el frontend
    setOrdenes((prevOrdenes) =>
      prevOrdenes.map((ord) =>
        ord.id === id
          ? {
              ...ord,
              estadoOrdenCompra: {
                ...ord.estadoOrdenCompra,
                id: newStateId,
                descripcion: states[
                  ord.estadoOrdenCompra.descripcion
                ].nextStates.find((state) => state.id === newStateId)
                  .descripcion
              }
            }
          : ord
      )
    )

    toast.success('Estado de la orden actualizado correctamente')
  }

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Gestión de Ordenes de Compra
      </h1>

      <section className='mb-12'>
        <Link
          className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex  items-center justify-center w-fit'
          to='/ordenes-de-compra/alta'
        >
          <MdAddCircle />
          <span className='ml-2'>Crear Orden de Compra</span>
        </Link>
        <section className='mt-10'>
          <h2 className='text-xl font-semibold text-orange-800 mb-4'>
            Lista de Ordenes de Compra
          </h2>
          {ordenes?.length === 0 ? (
            <p className='text-gray-500'>
              Aún no hay ordenes de compra creadas.
            </p>
          ) : (
            <ul className='space-y-4'>
              {ordenes?.map((ord) => (
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
                  <div className='flex flex-col items-center justify-center gap-1'>
                    <Link
                      to={`/ordenes-de-compra/detalle/${ord.id}`}
                      state={{ orden: ord }}
                      className='flex items-center justify-center text-green-600 hover:underline'
                    >
                      <IoMdPaper className='text-lg text-green-500 mr-2' />
                      Ver Detalle
                    </Link>
                    {ord.estadoOrdenCompra.descripcion === 'Pendiente' && (
                      <Link
                        to={`/ordenes-de-compra/editar/${ord.id}`}
                        className=' text-blue-600 hover:underline flex items-center'
                      >
                        <MdEdit className='text-lg text-blue-500 mr-2' />
                        Editar
                      </Link>
                    )}
                    <div className='flex items-center justify-center gap-1'>
                      {states[
                        ord.estadoOrdenCompra.descripcion
                      ]?.nextStates.map((nextState) => (
                        <button
                          key={nextState.descripcion}
                          className={`cursor-pointer hover:underline flex items-center justify-center p-2 rounded-full ${getOrderStateColor(
                            nextState.descripcion
                          )}`}
                          onClick={() =>
                            handleChangeState(ord.id, nextState.id)
                          }
                        >
                          {nextState.nombre}
                        </button>
                      ))}
                    </div>
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
