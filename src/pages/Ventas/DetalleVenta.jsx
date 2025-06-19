import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { obtenerVentaPorId } from '../../services/apiVentas'
import { toast } from 'sonner'
import { TiTicket } from 'react-icons/ti'
import { BiBox, BiMoney } from 'react-icons/bi'
import { LuBoxes } from 'react-icons/lu'

const DetalleVenta = () => {
  // Obtener el ID del proveedor desde los parámetros de la URL
  const { id } = useParams()

  // Llamar al servicio para obtener el proveedor por ID
  const [venta, setVenta] = useState(null)
  useEffect(() => {
    const fetchProveedor = async () => {
      const { data, errorMsg } = await obtenerVentaPorId(id)
      if (errorMsg) {
        return toast.error(errorMsg)
      }
      setVenta(data)
    }
    fetchProveedor()
  }, [id])

  if (!venta) {
    return (
      <div className='bg-white min-h-screen p-8 flex items-center justify-center'>
        <span className='text-orange-600 text-lg'>Cargando venta...</span>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-br from-orange-50 to-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Detalle de Venta
      </h1>

      <div className='bg-white shadow-lg border border-yellow-200 rounded-xl p-6 mb-8'>
        <div className='flex items-center mb-4'>
          <div className='flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-4'>
            <TiTicket className='text-3xl text-orange-700' />
          </div>
          <span className='text-2xl font-semibold text-orange-800'>
            #{venta.id}
          </span>
        </div>
        <div className='flex items-center mb-2 gap-2 text-orange-800'>
          <BiBox className='text-xl text-orange-500' />
          <strong>Cantidad: </strong>
          <span className='text-md text-gray-700'>{venta?.cantidad}</span>
        </div>
        <div className='flex items-center mb-2 gap-2 text-orange-800'>
          <BiMoney className='text-xl text-orange-500' />
          <strong>Monto Total: </strong>
          <span className='text-md text-gray-700'>${venta?.montoTotal}</span>
        </div>
      </div>

      <h2 className='text-2xl font-bold text-orange-800 mb-4'>Articulo</h2>
      <div className='bg-white shadow-lg border border-yellow-200 rounded-xl p-6 mb-8'>
        <div className='flex items-center mb-4'>
          <div className='flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-4'>
            <LuBoxes className='text-3xl text-orange-700' />
          </div>
          <span className='text-2xl font-semibold text-orange-800'>
            {venta?.articulo?.descripcion}
          </span>
        </div>
        <div className='flex items-center mb-2 gap-2 text-orange-800'>
          <strong>Precio de Venta: </strong>
          <span className='text-md text-gray-700'>
            ${venta?.articulo?.precioVenta}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DetalleVenta
