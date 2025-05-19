import React, { useState } from 'react'

const Articulos = () => {
  // Estado inicial del formulario
  const [articulo, setArticulo] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    stock: '',
    minimoStock: '',
    proveedorId: '',
  })

  const [articulos, setArticulos] = useState([
    {
      id: 1,
      nombre: 'Clavos',
      descripcion: 'Clavos de acero galvanizado',
      stock: 50,
      minimoStock: 100,
      proveedorId: 101,
    },
    {
      id: 2,
      nombre: 'Cemento',
      descripcion: 'Bolsa de cemento x50kg',
      stock: 0,
      minimoStock: 5,
      proveedorId: 102,
    },
    {
      id: 3,
      nombre: 'Tornillos',
      descripcion: 'Tornillos hexagonales M6',
      stock: 80,
      minimoStock: 100,
      proveedorId: 101,
    },
  ])

  const [proveedores] = useState([
    { id: 101, nombre: 'Ferretería Central' },
    { id: 102, nombre: 'Suministros Industriales' },
  ])

  const [modoEdicion, setModoEdicion] = useState(false)
  const [error, setError] = useState('')
  const [alerta, setAlerta] = useState('')

  const handleChange = (e) => {
    setArticulo({ ...articulo, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { nombre, descripcion, stock, minimoStock, proveedorId } = articulo

    if (!nombre || !descripcion || !stock || !minimoStock || !proveedorId) {
      setError('Todos los campos son obligatorios')
      return
    }

    const stockNum = parseInt(stock)
    const minimoStockNum = parseInt(minimoStock)
    const proveedorIdNum = parseInt(proveedorId)

    if (isNaN(stockNum) || isNaN(minimoStockNum)) {
      setError('Stock y Mínimo Stock deben ser números válidos')
      return
    }

    const articuloFinal = {
      ...articulo,
      stock: stockNum,
      minimoStock: minimoStockNum,
      proveedorId: proveedorIdNum,
    }

    if (modoEdicion) {
      // Editar artículo existente
      setArticulos(
        articulos.map((a) =>
          a.id === parseInt(articulo.id) ? articuloFinal : a
        )
      )
      setAlerta('Artículo actualizado correctamente')
    } else {
      // Agregar nuevo artículo
      const nuevoArticulo = {
        ...articuloFinal,
        id: Date.now(),
      }
      setArticulos([...articulos, nuevoArticulo])
      setAlerta('Artículo creado correctamente')
    }

    setTimeout(() => setAlerta(''), 3000)

    setArticulo({
      id: '',
      nombre: '',
      descripcion: '',
      stock: '',
      minimoStock: '',
      proveedorId: '',
    })
    setModoEdicion(false)
  }

  const handleEditar = (articulo) => {
    setArticulo({ ...articulo })
    setModoEdicion(true)
  }

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      setArticulos(articulos.filter((a) => a.id !== id))
      setAlerta('Artículo eliminado correctamente')
      setTimeout(() => setAlerta(''), 3000)
    }
  }

  // Función para obtener el nombre del proveedor
  const proveedorAsociado = (idProveedor) =>
    proveedores.find((p) => p.id === idProveedor)?.nombre || 'Sin proveedor'

  // Listados derivados
  const reponer = articulos.filter((a) => a.stock < a.minimoStock && a.stock > 0)
  const faltantes = articulos.filter((a) => a.stock <= 0)

  return (
    <div className='bg-white min-h-screen p-8'>
      {/* Alerta temporal */}
      {alerta && (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-6 py-3 rounded-lg shadow-md z-50 animate-bounce'>
          {alerta}
        </div>
      )}

      <h1 className='text-3xl font-bold text-orange-900 mb-6'>Gestión de Artículos</h1>

      {/* Formulario Alta / Edición */}
      <section className='mb-12'>
        <h2 className='text-xl font-semibold text-orange-800 mb-4'>
          {modoEdicion ? 'Editar Artículo' : 'Nuevo Artículo'}
        </h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-beige p-6 rounded-lg shadow-md'>
          {error && <div className='col-span-full text-red-600 font-medium'>{error}</div>}

          <input type='hidden' name='id' value={articulo.id} />

          <div>
            <label className='block text-sm font-medium text-orange-800'>Nombre</label>
            <input
              type='text'
              name='nombre'
              value={articulo.nombre}
              onChange={handleChange}
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-orange-800'>Descripción</label>
            <input
              type='text'
              name='descripcion'
              value={articulo.descripcion}
              onChange={handleChange}
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-orange-800'>Stock Actual</label>
            <input
              type='number'
              name='stock'
              value={articulo.stock}
              onChange={handleChange}
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-orange-800'>Mínimo Stock</label>
            <input
              type='number'
              name='minimoStock'
              value={articulo.minimoStock}
              onChange={handleChange}
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-orange-800'>Proveedor</label>
            <select
              name='proveedorId'
              value={articulo.proveedorId}
              onChange={handleChange}
              className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200'
            >
              <option value=''>Seleccionar proveedor</option>
              {proveedores.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-end justify-start'>
            <button
              type='submit'
              className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
            >
              {modoEdicion ? 'Actualizar' : 'Crear Artículo'}
            </button>
          </div>
        </form>
      </section>

      {/* Listados */}
      <section className='space-y-8'>
        {/* A reponer */}
        <div>
          <h2 className='text-xl font-semibold text-orange-800 mb-4'>Artículos a Reponer</h2>
          <ul className='space-y-2'>
            {reponer.length > 0 ? (
              reponer.map((a) => (
                <li
                  key={a.id}
                  className='bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-sm flex justify-between items-center'
                >
                  <span>
                    <strong>{a.nombre}</strong> - {a.descripcion} | Stock: {a.stock}
                  </span>
                  <div className='space-x-2'>
                    <button
                      onClick={() => handleEditar(a)}
                      className='text-blue-600 hover:text-blue-800'
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(a.id)}
                      className='text-red-600 hover:text-red-800'
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No hay artículos por debajo del mínimo stock.</p>
            )}
          </ul>
        </div>

        {/* Faltantes */}
        <div>
          <h2 className='text-xl font-semibold text-orange-800 mb-4'>Productos Faltantes</h2>
          <ul className='space-y-2'>
            {faltantes.length > 0 ? (
              faltantes.map((a) => (
                <li
                  key={a.id}
                  className='bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm'
                >
                  <strong>{a.nombre}</strong> - {a.descripcion} | Sin stock disponible
                </li>
              ))
            ) : (
              <p>No hay productos sin stock.</p>
            )}
          </ul>
        </div>

        {/* Proveedores asociados */}
        <div>
          <h2 className='text-xl font-semibold text-orange-800 mb-4'>Proveedores Asociados</h2>
          <ul className='space-y-2'>
            {articulos.map((a) => (
              <li
                key={a.id}
                className='bg-gray-50 border-l-4 border-orange-300 text-orange-800 p-4 rounded shadow-sm'
              >
                <strong>{a.nombre}</strong> - Proveedor: {proveedorAsociado(a.proveedorId)}
              </li>
            ))}
          </ul>
        </div>

        {/* Todos los artículos */}
        <div>
          <h2 className='text-xl font-semibold text-orange-800 mb-4'>Todos los Artículos</h2>
          <ul className='space-y-2'>
            {articulos.map((a) => (
              <li
                key={a.id}
                className='bg-white border-l-4 border-orange-300 text-orange-800 p-4 rounded shadow-sm flex justify-between items-center'
              >
                <span>
                  <strong>{a.nombre}</strong> - {a.descripcion} | Stock: {a.stock} | Proveedor: {proveedorAsociado(a.proveedorId)}
                </span>
                <div className='space-x-2'>
                  <button
                    onClick={() => handleEditar(a)}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(a.id)}
                    className='text-red-600 hover:text-red-800'
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Articulos