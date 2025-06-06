import { Route, Routes } from 'react-router'
import './App.css'
import ListaArticulos from './pages/Articulos/ListaArticulos'
import Layout from './layouts/Layout'
import ListaProveedores from './pages/Proveedores/ListaProveedores'
import AltaProveedor from './pages/Proveedores/AltaProveedor'
import EditarProveedor from './pages/Proveedores/EditarProveedor'
import DetalleProveedor from './pages/Proveedores/DetalleProveedor'
import AltaArticulos from './pages/Articulos/AltaArticulos'
import DetalleArticulo from './pages/Articulos/DetalleArticulo'
import EditarArticulo from './pages/Articulos/EditarArticulo'
import { Toaster } from 'sonner'
import ListaOrdenes from './pages/OrdenesDeCompra/ListaOrdenes'
import AltaOrden from './pages/OrdenesDeCompra/AltaOrden'
import EditarOrdenes from './pages/OrdenesDeCompra/EditarOrden'
import DetalleOrdenes from './pages/OrdenesDeCompra/DetalleOrden'
import EditarArticuloProveedor from './pages/Proveedores/EditarArticuloProveedor'
import AgregarArticulosProveedor from './pages/Proveedores/AgregarArticulosProveedor'
import ListaVentas from './pages/Ventas/ListaVentas'
import AltaVenta from './pages/Ventas/AltaVenta'
import DetalleVenta from './pages/Ventas/DetalleVenta'

function App() {
  return (
    <Layout>
      <Toaster />
      <Routes>
        <Route path='/proveedores' element={<ListaProveedores />} />
        <Route path='/proveedores/alta-proveedor' element={<AltaProveedor />} />
        <Route path='/proveedores/editar/:id' element={<EditarProveedor />} />
        <Route path='/proveedores/detalle/:id' element={<DetalleProveedor />} />
        <Route
          path='/proveedores/:id/articulos/:codigo'
          element={<EditarArticuloProveedor />}
        />
        <Route
          path='/agregar-articulos/:id'
          element={<AgregarArticulosProveedor />}
        />
        <Route path='/' element={<ListaArticulos />} />
        <Route path='/articulos' element={<ListaArticulos />} />
        <Route path='/articulos/alta' element={<AltaArticulos />} />
        <Route path='/articulos/editar/:id' element={<EditarArticulo />} />
        <Route path='/articulos/detalle/:id' element={<DetalleArticulo />} />
        <Route path='/ordenes-de-compra' element={<ListaOrdenes />} />
        <Route path='/ordenes-de-compra/alta' element={<AltaOrden />} />

        <Route
          path='/ordenes-de-compra/editar/:id'
          element={<EditarOrdenes />}
        />
        <Route
          path='/ordenes-de-compra/detalle/:id'
          element={<DetalleOrdenes />}
        />
        <Route path='/ventas' element={<ListaVentas />} />
        <Route path='/ventas/alta-venta' element={<AltaVenta />} />
        <Route path='/ventas/detalle/:id' element={<DetalleVenta />} />
      </Routes>
    </Layout>
  )
}

export default App
