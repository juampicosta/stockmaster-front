import { useParams } from 'react-router-dom'
import {
  MdEmail,
  MdPhone,
  MdAttachMoney,
  MdAccessTime,
  MdPerson,
  MdMonetizationOn,
  MdLocalShipping,
  MdInventory
} from 'react-icons/md'
import { LuBoxes } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { obtenerOrden } from '../../services/apiOrdenes'
import { toast } from 'sonner'
import { getOrderStateColor } from '../../utils/getOrderStateColor'
import { BsCash, BsClock } from 'react-icons/bs'

const DetalleOrden = () => {
  const { id } = useParams()
  const [orden, setOrden] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, errorMsg } = await obtenerOrden(id)
      console.log(data)

      if (errorMsg) {
        return toast.error(errorMsg)
      }

      setOrden(data)
    }

    fetchData()
  }, [id])

  console.log(orden)

  return (
    <div className='bg-gradient-to-br from-orange-50 to-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Detalle de Orden
      </h1>
      <div className='space-y-2 bg-white shadow-lg border border-yellow-200 rounded-xl p-6 mb-8'>
        <div className='flex items-center justify-start gap-2'>
          <BsClock className='text-xl text-orange-700' />
          <span className='text-md text-orange-800'>
            <strong>Fecha de Alta: </strong>
            {new Date(orden?.fechaHoraAlta).toLocaleDateString()}
          </span>
        </div>

        <div className='flex items-center justify-start gap-2 text-orange-800'>
          <LuBoxes className='text-xl text-orange-700' />
          <strong>Lote: </strong>
          <span className='text-md text-orange-800'>{orden?.lote}</span>
        </div>
        <div className='flex items-center justify-start gap-2 text-orange-800'>
          <strong>Costo de Compra: </strong>
          <span className='text-md text-orange-800'>
            ${orden?.articulo?.costoCompra}
          </span>
        </div>

        <div className='flex items-center justify-start gap-2 text-orange-800'>
          <strong>Costo de Pedido: </strong>
          <span className='text-md text-orange-800'>
            ${orden?.articulo?.costoPedido}
          </span>
        </div>

        <div className='flex items-center justify-start gap-2 text-orange-800'>
          <BsCash className='text-xl text-orange-700' />
          <strong>Monto Total: </strong>
          <span className='text-md text-orange-800'>${orden?.montoTotal}</span>
        </div>

        <div
          className={`flex items-center justify-start gap-2 text-orange-800`}
        >
          <strong>Estado: </strong>

          <span
            className={`flex items-center justify-center p-2 px-4 w-fit rounded-3xl border text-gray-900 ${getOrderStateColor(
              orden?.estadoOrdenCompra
            )}`}
          >
            {orden?.estadoOrdenCompra}
          </span>
        </div>
      </div>

      <h2 className='text-2xl font-bold text-orange-800 mb-4'>Articulo</h2>
      <div className='bg-white shadow-lg border border-yellow-200 rounded-xl p-6 mb-8'>
        <div className='flex items-center mb-4'>
          <div className='flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-4'>
            <LuBoxes className='text-3xl text-orange-700' />
          </div>
          <span className='text-2xl font-semibold text-orange-800'>
            {orden?.articulo?.descripcion}
          </span>
        </div>
        <div className='flex items-center mb-2 gap-2 text-orange-800'>
          <strong>Costo de Compra: </strong>
          <span className='text-md text-gray-700'>
            {orden?.articulo?.costoCompra}
          </span>
        </div>
        <div className='flex items-center gap-2 text-orange-800'>
          <strong>Costo de Pedido: </strong>
          <span className='text-md text-gray-700'>
            {orden?.articulo?.costoPedido}
          </span>
        </div>
      </div>

      <h2 className='text-2xl font-bold text-orange-800 mb-4'>Proveedor</h2>
      <div className='bg-white shadow-lg border border-yellow-200 rounded-xl p-6 mb-8'>
        <div className='flex items-center mb-4'>
          <div className='flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-4'>
            <MdPerson className='text-3xl text-orange-700' />
          </div>
          <span className='text-2xl font-semibold text-orange-800'>
            {orden?.proveedor?.razonSocial}
          </span>
        </div>
        <div className='flex items-center mb-2'>
          <MdEmail className='text-xl text-orange-500 ml-3 mr-2' />
          <a
            href={`mailto:${orden?.proveedor?.email}`}
            className='text-md text-gray-700'
          >
            {orden?.proveedor?.email}
          </a>
        </div>
        <div className='flex items-center'>
          <MdPhone className='text-xl text-orange-500 ml-3 mr-2' />
          <a
            href={`tel:${orden?.proveedor?.telefono}`}
            className='text-md text-gray-700'
          >
            {orden?.proveedor?.telefono}
          </a>
        </div>
      </div>
    </div>
  )
}

export default DetalleOrden
