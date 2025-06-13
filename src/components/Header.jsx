import { Link } from 'react-router'

const Header = () => {
  return (
    <>
      <header className='bg-beige text-orange-900 rounded-b-lg rounded-bl-none sticky top-0 z-50 h-20 flex items-center justify-between px-6 shadow-xl'>
        <div className='flex items-center space-x-4'>
          <img
            src='/logoSM.png'
            alt='Logo'
            className='size-16 rounded-full shadow-md bg-crema'
          />

          <span className='text-md font-bold'>Gestor de Inventarios</span>
        </div>

        <nav className='flex items-center space-x-6'>
          <Link
            to='/articulos'
            className='text-base font-semibold hover:text-orange-600'
          >
            Artículos
          </Link>
          <Link
            to='/ordenes-de-compra'
            className='text-base font-semibold hover:text-orange-600'
          >
            Órdenes de Compra
          </Link>
          <Link
            to='/proveedores'
            className='text-base font-semibold hover:text-orange-600'
          >
            Proveedores
          </Link>
          <Link
            to='/ventas'
            className='text-base font-semibold hover:text-orange-600'
          >
            Ventas
          </Link>
        </nav>

        <div className='flex flex-row items-center space-x-0'>
          <img
            src='/Deco2.png'
            alt='Deco'
            className='w-32 h-8 object-contain'
          />
        </div>
      </header>
    </>
  )
}

export default Header
