import { Route, Routes } from 'react-router'
import './App.css'
import Articulos from './pages/Articulos'
import Proveedores from './pages/Proveedores'
import OrdenesDeCompra from './pages/OrdenesDeCompra'
import Ventas from './pages/Ventas'
import Layout from './layouts/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Articulos />} />
        <Route path='/articulos' element={<Articulos />} />
        <Route path='/proveedores' element={<Proveedores />} />
        <Route path='/ordenes-de-compra' element={<OrdenesDeCompra />} />
        <Route path='/ventas' element={<Ventas />} />
      </Routes>
    </Layout>
  )
}

export default App
