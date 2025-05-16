const Header = () => {
  return (
    <>
      <header className='bg-beige text-orange-900 rounded-b-lg rounded-bl-none sticky top-0 z-50 h-24 flex items-center justify-between px-6 shadow-xl'>
        <div className='flex items-center space-x-4'>
          <img
            src='/LogoSM.jpg'
            alt='Logo'
            className='w-20 h-20 rounded-full shadow-md'
          />

          <span className='text-md font-bold'>Gestor de Inventarios</span>
        </div>

        <nav className='flex items-center space-x-6'>
          <a href='/' className='text-lg font-semibold hover:text-orange-600'>
            Inicio
          </a>
          <a
            href='/Articulos'
            className='text-lg font-semibold hover:text-orange-600'
          >
            Artículos
          </a>
          <a
            href='/OrdenesDeCompra'
            className='text-lg font-semibold hover:text-orange-600'
          >
            Órdenes de Compra
          </a>
          <a
            href='/Proveedores'
            className='text-lg font-semibold hover:text-orange-600'
          >
            Proveedores
          </a>
          <a
            href='/Ventas'
            className='text-lg font-semibold hover:text-orange-600'
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
          <div className='animate-heartBeat relative inline-block'>
            <span className='absolute top-1 right-1 flex size-3'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
              <span className='relative inline-flex size-3 rounded-full bg-red-500'></span>
            </span>
            <div className='rounded-full hover:bg-arena transition-colors duration-200 p-2'>
              <img
                src='/Alerta4.png'
                alt='Alertas'
                className='w-10 h-10 rounded-full animate-wiggle'
              />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
