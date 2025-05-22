import { Route, Routes } from 'react-router'
import './App.css'
import ListaArticulos from './pages/Articulos/ListaArticulos'
import Proveedores from './pages/Proveedores'
import OrdenesDeCompra from './pages/OrdenesDeCompra'
import Ventas from './pages/Ventas'
import Layout from './layouts/Layout'
import Inicio from './pages/Inicio'
import AltaArticulos from './pages/Articulos/AltaArticulos'
import DetalleArticulo from './pages/Articulos/DetalleArticulo'
import EditarArticulo from './pages/Articulos/EditarArticulo'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<ListaArticulos />} />
        <Route path='/articulos' element={<ListaArticulos />} />
        <Route path='/articulos/alta' element={<AltaArticulos />} />
        <Route path='/articulos/editar/:id' element={<EditarArticulo />} />
        <Route path='/articulos/detalle/:id' element={<DetalleArticulo />} />
        <Route path='/proveedores' element={<Proveedores />} />
        <Route path='/ordenes-de-compra' element={<OrdenesDeCompra />} />
        <Route path='/ventas' element={<Ventas />} />
        <Route path='/inicio' element={<Inicio />} />
      </Routes>
    </Layout>
  )
}

export default App
