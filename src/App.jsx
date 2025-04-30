import { Route, Routes } from 'react-router'
import './App.css'
import Articulos from './pages/Articulos'
import Proveedores from './pages/Proveedores'
import OrdenesDeCompra from './pages/OrdenesDeCompra'
import Ventas from './pages/Ventas'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Articulos />} />
      <Route path='/articulos' element={<Articulos />} />
      <Route path='/proveedores' element={<Proveedores />} />
      <Route path='/ordenes-de-compra' element={<OrdenesDeCompra />} />
      <Route path='/ventas' element={<Ventas />} />
    </Routes>
  )
}

export default App
