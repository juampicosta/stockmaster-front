import { useEffect, useState } from 'react'
import { obtenerArticulos } from '../../services/apiArticulos'
import { toast } from 'sonner'
import {
  MdAddCircle,
  MdEdit,
  MdDelete
} from 'react-icons/md'
import { IoMdPaper } from 'react-icons/io'
import { BsFillBoxSeamFill } from "react-icons/bs";

const Articulos = () => {
  const [articulos, setArticulos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      setArticulos(articulos.filter((a) => a.codigo !== id))
    }
  }

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    const fetchArticulos = async () => {
      setLoading(true)

      const { data, errorMsg } = await obtenerArticulos(filter)

      if (errorMsg) {
        toast.error(errorMsg)
      } else {
        setArticulos(data)
      }

      setLoading(false)
    }

    fetchArticulos()
  }, [filter])

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Gestión de Artículos
      </h1>
      <a
        href='/articulos/alta'
        className='bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition duration-200 flex items-center w-fit gap-2'
      >
        <MdAddCircle />
        Crear Artículo
      </a>

      {/* Filtros */}
      <section className='mt-6'>
        <h2 className='text-xl font-semibold text-orange-800 mb-4'>
          Lista de Órdenes de Compra
        </h2>
        <label
          htmlFor='filtro'
          className='block text-sm font-medium text-orange-800 mb-2'
        >
          Filtrar por proveedor
        </label>
        <select
          id='filtro'
          value={filter}
          onChange={handleChangeFilter}
          className='border-orange-300 bg-white text-orange-800 rounded-md px-4 py-2 mb-4 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-400'
        >
          <option value=''>Todos</option>
          <option value='true'>Con Proveedor</option>
          <option value='false'>Sin Proveedor</option>
        </select>

        {/* Listado */}
        <ul className='space-y-4 mt-6'>
          {loading ? (
            <ul className='text-gray-700'>Cargando artículos...</ul>
          ) : articulos?.length > 0 ? (
            articulos?.map((a) => (
              <li
                key={a.codigo}
                className='bg-white border-1 border-l-4 border-yellow-200 rounded-xl text-orange-800 p-4 shadow-sm flex justify-between items-center'
              >
                {/* <span>
                  <strong>{a.descripcion}</strong> | Stock: {a.stock} | Tipo
                  modelo: {a.tipoModelo}
                </span> */}
                <div>
                  <p className='flex items-center text-xl font-semibold text-orange-800 gap-2'>
                    <span className='flex items-center justify-center size-10 bg-orange-200 rounded-full'>
                      <BsFillBoxSeamFill className='' />
                    </span>
                    {a.descripcion}
                  </p>
                  <div className='ml-3 text-md'>
                    <p>Stock: {a.stock} | Modelo Inventario: {a.tipoModelo}</p>
                  </div>
                </div>
                <div className='flex flex-col items-start'>
                  <a
                    href={`/articulos/detalle/${a.codigo}`}
                    className='text-green-600 hover:text-green-800 flex items-center'
                  >
                    <IoMdPaper className='text-lg text-green-500 mr-2' />
                    Ver detalle
                  </a>
                  <a
                    href={`/articulos/editar/${a.codigo}`}
                    className='text-blue-600 hover:text-blue-800 flex items-center'
                  >
                    <MdEdit className='text-lg text-blue-500 mr-2' />
                    Editar
                  </a>
                  <button
                    onClick={() => handleEliminar(a.codigo)}
                    className='text-red-600 hover:text-red-800 cursor-pointer flex items-center'
                  >
                    <MdDelete className='text-lg text-red-500 mr-2' />
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <ul className='text-gray-700'>No hay artículos disponibles.</ul>
          )}
        </ul>
      </section>
    </div>
  )
}

export default Articulos
