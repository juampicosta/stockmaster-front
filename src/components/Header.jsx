const Header = () => {
  return (
    <>
      <header className='bg-beige text-orange-900 sticky top-0 z-50 py-2 flex items-center justify-between px-6 shadow-xl'>
        <div className='flex justify-center items-center'>
          <img
            src='/LogoSM.jpg'
            alt='Logo'
            className='size-12 rounded-full shadow-2xl'
          />
        </div>

        <nav className='flex items-center space-x-4 text-md'>
          <a href='/' className='font-semibold hover:text-orange-600'>
            Inicio
          </a>
          <a href='/Articulos' className='font-semibold hover:text-orange-600'>
            Artículos
          </a>
          <a
            href='/OrdenesDeCompra'
            className='font-semibold hover:text-orange-600'
          >
            Órdenes de Compra
          </a>
          <a
            href='/Proveedores'
            className='font-semibold hover:text-orange-600'
          >
            Proveedores
          </a>
          <a href='/Ventas' className='font-semibold hover:text-orange-600'>
            Ventas
          </a>
        </nav>
        <div className='animate-heartBeat relative inline-block'>
          <span className='absolute top-1 right-1 flex size-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
            <span className='relative inline-flex size-2 rounded-full bg-red-500'></span>
          </span>
          <div className='rounded-full hover:bg-arena transition-colors duration-200 p-2'>
            <svg
              class='w-6 h-6 text-amber-950'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z' />
            </svg>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
