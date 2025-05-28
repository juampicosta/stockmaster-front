import { useLocation } from 'react-router-dom'
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

const DetalleOrden = () => {
  const location = useLocation()
  const proveedor = location.state?.proveedor

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

      <h2 className='text-2xl font-bold text-orange-800 mb-4'>Artículos</h2>
      {proveedor.articulos?.length > 0 ? (
        proveedor.articulos.map((art) => (
          <div
            key={art.codigo}
            className='bg-white shadow border-l-4 border-orange-400 text-orange-900 p-5 rounded-lg mb-6 ml-8'
          >
            <p className='font-semibold text-lg mb-2 flex items-center'>
              <MdInventory className='text-2xl text-brown-600 mr-2' />
              {art.descripcion}
            </p>
            <ul className='space-y-1 pl-7 text-md'>
              <li className='flex items-center'>
                <MdMonetizationOn className='text-lg text-green-500 mr-2' />
                <span>
                  <strong>Costo de Compra:</strong>{' '}
                  {art.datosArticulo?.costoCompra}
                </span>
              </li>
              <li className='flex items-center'>
                <MdLocalShipping className='text-lg text-blue-500 mr-2' />
                <span>
                  <strong>Costo de Pedido:</strong>{' '}
                  {art.datosArticulo?.costoPedido}
                </span>
              </li>
              <li className='flex items-center'>
                <MdAccessTime className='text-lg text-yellow-600 mr-2' />
                <span>
                  <strong>Demora de Entrega:</strong>{' '}
                  {art.datosArticulo?.demoraEntrega}
                </span>
              </li>
              <li className='flex items-center'>
                <MdAttachMoney className='text-lg text-green-700 mr-2' />
                <span>
                  <strong>Precio Unitario:</strong>{' '}
                  {art.datosArticulo?.precioUnitario}
                </span>
              </li>
            </ul>
          </div>
        ))
      ) : (
        <p className='ml-10 text-orange-500'>No hay artículos asociados.</p>
      )}
    </div>
  )
}

export default DetalleOrden
