import { useEffect, useState } from 'react'
import { obtenerArticulos, eliminarArticulo } from '../../services/apiArticulos'
import { toast } from 'sonner'
import { MdAddCircle, MdEdit, MdDelete } from 'react-icons/md'
import { IoMdPaper } from 'react-icons/io'
import { BsFillBoxSeamFill } from 'react-icons/bs'
import { Link } from 'react-router'

const Articulos = () => {
  const [articulos, setArticulos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [conProveedor, setConProveedor] = useState(false)

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      try {
        const { errorMsg } = await eliminarArticulo(id)

        if (errorMsg) {
          toast.error(errorMsg)
          return
        }

        // Actualizar la lista localmente después de eliminar exitosamente
        setArticulos(articulos.filter((a) => a.codigo !== id))
        toast.success('Artículo eliminado correctamente')
      } catch (error) {
        toast.error(error.message || 'Error al eliminar el artículo')
      }
    }
  }

  const handleChangeFilter = (e) => {
    if (e.target.value === '') {
      setConProveedor(null)
      setFilter('')
      return
    }
    if (e.target.value === 'Reponer' || e.target.value === 'Faltantes') {
      setConProveedor(null)
      setFilter(e.target.value)
    } else {
      setConProveedor(e.target.value)
      setFilter(null)
    }
  }

  useEffect(() => {
    const fetchArticulos = async () => {
      setLoading(true)

      try {
        const { data, errorMsg } = await obtenerArticulos(conProveedor, filter)

        if (errorMsg) {
          toast.error(errorMsg)
        } else {
          setArticulos(data || [])
        }
      } catch (error) {
        toast.error(error.message || 'Error al obtener los artículos')
        setArticulos([])
      } finally {
        setLoading(false)
      }
    }

    fetchArticulos()
  }, [filter, conProveedor])

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Gestión de Artículos
      </h1>
      <Link
        to='/articulos/alta'
        className='bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition duration-200 flex items-center w-fit gap-2'
      >
        <MdAddCircle />
        Crear Artículo
      </Link>

      {/* Filtros */}
      <section className='mt-6'>
        <h2 className='text-xl font-semibold text-orange-800 mb-4'>
          Lista de Artículos
        </h2>
        <label
          htmlFor='filtro'
          className='block text-sm font-medium text-orange-800 mb-2'
        >
          Filtrar
        </label>
        <select
          id='filtro'
          onChange={handleChangeFilter}
          className='border-orange-300 bg-white text-orange-800 rounded-md px-4 py-2 mb-4 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-400'
        >
          <option value=''>Todos</option>
          <option value='true'>Con Proveedor</option>
          <option value='false'>Sin Proveedor</option>
          <option value='Reponer'>A Reponer</option>
          <option value='Faltantes'>Faltantes</option>
        </select>

        {/* Listado */}
        <ul className='space-y-4 mt-6'>
          {loading ? (
            <li className='text-gray-700'>Cargando artículos...</li>
          ) : articulos?.length > 0 ? (
            articulos?.map((a) => (
              <li
                key={a.codigo}
                className='bg-white border-1 border-l-4 border-yellow-200 rounded-xl text-orange-800 p-4 shadow-sm flex justify-between items-center'
              >
                <div>
                  <p className='flex items-center text-xl font-semibold text-orange-800 gap-2'>
                    <span className='flex items-center justify-center size-10 bg-orange-200 rounded-full'>
                      <BsFillBoxSeamFill className='' />
                    </span>
                    {a.descripcion}
                  </p>
                  <div className='ml-3 text-md'>
                    <p>Stock: {a.stock}</p>
                    {a.provPredeterminado && (
                      <p className='text-sm text-gray-600'>
                        Proveedor Predeterminado:{' '}
                        {a.provPredeterminado.razonSocial}
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <Link
                    to={`/articulos/detalle/${a.codigo}`}
                    className='text-green-600 hover:text-green-800 flex items-center px-2 py-1 rounded hover:bg-green-50 transition duration-200'
                  >
                    <IoMdPaper className='text-lg text-green-500 mr-2' />
                    Ver detalle
                  </Link>
                  <Link
                    to={`/articulos/editar/${a.codigo}`}
                    className='text-blue-600 hover:text-blue-800 flex items-center px-2 py-1 rounded hover:bg-blue-50 transition duration-200'
                  >
                    <MdEdit className='text-lg text-blue-500 mr-2' />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminar(a.codigo)}
                    className='text-red-600 hover:text-red-800 cursor-pointer flex items-center px-2 py-1 rounded hover:bg-red-50 transition duration-200'
                  >
                    <MdDelete className='text-lg text-red-500 mr-2' />
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className='text-gray-700 text-center py-8'>
              <p className='text-lg'>No hay artículos disponibles.</p>
              <p className='text-sm text-gray-500 mt-2'>
                {filter
                  ? 'Intenta cambiar el filtro o crear un nuevo artículo.'
                  : 'Comienza creando tu primer artículo.'}
              </p>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default Articulos
