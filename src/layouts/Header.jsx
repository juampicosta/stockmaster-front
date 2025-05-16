

const Header = () => {
    return (
        <>
            <header className="bg-beige text-orange-900 rounded-b-lg rounded-bl-none sticky top-0 z-50 h-24 flex items-center justify-between px-6 shadow-xl">
              
                <div className="flex-shrink-0 flex items-center">
                    <img src="/Deco2.png" alt="Deco" className="w-40 h-20"/>
                </div>

               
                <div className="flex-1 flex justify-center items-center">
                    <img src="/LogoSM.jpg" alt="Logo" className="w-24 h-24 rounded-full shadow-2xl" />
                </div>

             
                <nav className="flex items-center space-x-4">
                    
                    <div className="animate-heartBeat relative inline-block">
                        <span className="absolute top-1 right-1 flex size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                        </span>
                        <div className="rounded-full hover:bg-arena transition-colors duration-200 p-3">
                            <img src="/Alerta2.png" alt="Alertas" className="w-12 h-12 rounded-full animate-wiggle" />
                        </div>
                    </div>

                    <a href="/" className="text-lg font-semibold hover:text-orange-600">Inicio</a>
                    <a href="/Articulos" className="text-lg font-semibold hover:text-orange-600">Artículos</a>
                    <a href="/OrdenesDeCompra" className="text-lg font-semibold hover:text-orange-600">Órdenes de Compra</a>
                    <a href="/Proveedores" className="text-lg font-semibold hover:text-orange-600">Proveedores</a>
                    <a href="/Ventas" className="text-lg font-semibold hover:text-orange-600">Ventas</a>
                </nav>
            </header>
        </>
    );
};

export default Header;
