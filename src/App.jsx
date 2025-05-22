import { Route, Routes } from 'react-router'
import './App.css'
import Articulos from './pages/Articulos'
import OrdenesDeCompra from './pages/OrdenesDeCompra'
import Ventas from './pages/Ventas'
import Layout from './layouts/Layout'
import Inicio from './pages/Inicio'
import ListaProveedores from './pages/Proveedores/ListaProveedores'
import AltaProveedor from './pages/Proveedores/AltaProveedor'
import EditarProveedor from './pages/Proveedores/EditarProveedor'
import DetalleProveedor from './pages/Proveedores/DetalleProveedor'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Articulos />} />
        <Route path='/articulos' element={<Articulos />} />
        <Route path='/proveedores' element={<ListaProveedores />} />
        <Route path='/proveedores/alta-proveedor' element={<AltaProveedor />} />
        <Route path='/proveedores/editar/:id' element={<EditarProveedor />} />
        <Route path='/proveedores/detalle/:id' element={<DetalleProveedor />} />
        <Route path='/ordenes-de-compra' element={<OrdenesDeCompra />} />
        <Route path='/ventas' element={<Ventas />} />
        <Route path='/inicio' element={<Inicio />} />
      </Routes>
    </Layout>
  )
}

export default App
