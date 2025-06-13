const Header = () => {
  return (
    <>
      <header className='bg-beige text-orange-900 rounded-b-lg rounded-bl-none sticky top-0 z-50 h-20 flex items-center justify-between px-6 shadow-xl'>
        <div className='flex items-center space-x-4'>
          <img
            src='/LogoSM.jpg'
            alt='Logo'
            className='size-16 rounded-full shadow-md'
          />

          <span className='text-md font-bold'>Gestor de Inventarios</span>
        </div>

        <nav className='flex items-center space-x-6'>
          <a
            href='/articulos'
            className='text-base font-semibold hover:text-orange-600'
          >
            Artículos
          </a>
          <a
            href='/ordenes-de-compra'
            className='text-base font-semibold hover:text-orange-600'
          >
            Órdenes de Compra
          </a>
          <a
            href='/proveedores'
            className='text-base font-semibold hover:text-orange-600'
          >
            Proveedores
          </a>
          <a
            href='/ventas'
            className='text-base font-semibold hover:text-orange-600'
          >
            Ventas
          </a>
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
