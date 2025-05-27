import { useEffect, useState } from 'react'
import { obtenerArticulos } from '../../services/apiArticulos'

const filters = [
  {
    id: 1,
    nombre: 'A reponer'
  },
  {
    id: 2,
    nombre: 'Faltantes'
  }
]

const Articulos = () => {
  const [articulos, setArticulos] = useState([])
  const [filter, setFilter] = useState('')

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      setArticulos(articulos.filter((a) => a.id !== id))
      // falta llamada a la API para eliminar el artículo
    }
  }

  const handleChangeFilter = (e) => {
    e.preventDefault()
    const selectedFilter = e.target.value
    setFilter(selectedFilter)
  }

  useEffect(() => {
    const fetchArticulos = async () => {
      const { data } = await obtenerArticulos()
      const { content } = data
      setArticulos(content)
    }

    fetchArticulos()
  }, [])

  console.log(articulos)

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-3xl font-bold text-orange-900 mb-6'>
        Lista de Artículos
      </h1>

      <a
        href='/articulos/alta'
        className='bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition duration-200'
      >
        Crear Artículo
      </a>

      <section>
        {/* Proveedores asociados
        <div>
          <h2 className='text-xl font-semibold text-orange-800 mb-4'>
            Proveedores Asociados
          </h2>
          <ul className='space-y-2'>
            {articulos.map((a) => (
              <li
                key={a.id}
                className='bg-gray-50 border-l-4 border-orange-300 text-orange-800 p-4 rounded shadow-sm'
              >
                <strong>{a.nombre}</strong> - Proveedor:{' '}
                {proveedorAsociado(a.proveedorId)}
              </li>
            ))}
          </ul>
        </div> */}

        {/* Todos los artículos */}
        <select
          onChange={handleChangeFilter}
          value={filter}
          className='rounded-md border-1 p-1 text-black mt-4'
          name='filter'
        >
          <option value=''>Seleccionar filtro</option>
          {filters.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nombre}
            </option>
          ))}
        </select>
        <ul className='space-y-2 mt-6'>
          {articulos.map((a) => (
            <li
              key={a.codigo}
              className='bg-white border-l-4 border-orange-300 text-orange-800 p-4 rounded shadow-sm flex justify-between items-center'
            >
              <span>
                <strong>{a.descripcion}</strong> | Stock: {a.stock} | Proveedor
                Predeterminado: {a.provPredeterminado}
              </span>
              <div className='space-x-2'>
                <a
                  href={`/articulos/detalle/${a.codigo}`}
                  className='text-green-600 hover:text-green-800'
                >
                  Ver detalle
                </a>
                <a
                  href={`/articulos/editar/${a.codigo}`}
                  className='text-blue-600 hover:text-blue-800'
                >
                  Editar
                </a>
                <button
                  onClick={() => handleEliminar(a.codigo)}
                  className='text-red-600 hover:text-red-800'
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Articulos
