import { Route, Routes } from 'react-router'
import './App.css'
import ListaArticulos from './pages/Articulos/ListaArticulos'
import OrdenesDeCompra from './pages/OrdenesDeCompra'
import Ventas from './pages/Ventas'
import Layout from './layouts/Layout'
import Inicio from './pages/Inicio'
import ListaProveedores from './pages/Proveedores/ListaProveedores'
import AltaProveedor from './pages/Proveedores/AltaProveedor'
import EditarProveedor from './pages/Proveedores/EditarProveedor'
import DetalleProveedor from './pages/Proveedores/DetalleProveedor'
import AltaArticulos from './pages/Articulos/AltaArticulos'
import DetalleArticulo from './pages/Articulos/DetalleArticulo'
import EditarArticulo from './pages/Articulos/EditarArticulo'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/proveedores' element={<ListaProveedores />} />
        <Route path='/proveedores/alta-proveedor' element={<AltaProveedor />} />
        <Route path='/proveedores/editar/:id' element={<EditarProveedor />} />
        <Route path='/proveedores/detalle/:id' element={<DetalleProveedor />} />
        <Route path='/' element={<ListaArticulos />} />
        <Route path='/articulos' element={<ListaArticulos />} />
        <Route path='/articulos/alta' element={<AltaArticulos />} />
        <Route path='/articulos/editar/:id' element={<EditarArticulo />} />
        <Route path='/articulos/detalle/:id' element={<DetalleArticulo />} />
        <Route path='/ordenes-de-compra' element={<OrdenesDeCompra />} />
        <Route path='/ventas' element={<Ventas />} />
        <Route path='/inicio' element={<Inicio />} />
      </Routes>
    </Layout>
  )
}

export default App
