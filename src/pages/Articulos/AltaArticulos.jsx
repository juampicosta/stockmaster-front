import { useEffect, useState } from 'react'
import { registrarArticulo } from '../../services/apiArticulos'
import { toast } from 'sonner'
import { obtenerProveedores } from '../../services/apiProveedores'

const AltaArticulos = () => {
  const [proveedores, setProveedores] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    const { errorMsg } = await registrarArticulo(data)
    if (errorMsg) {
      return toast.error(errorMsg)
    }
    toast.success('Artículo creado correctamente')
  }

  useEffect(() => {
    // llamada a la API para obtener los proveedores
    const fetchProveedores = async () => {
      const { data, errorMsg } = await obtenerProveedores()
      if (errorMsg) {
        return toast.error(errorMsg)
      }

      setProveedores(data.content)
    }

    fetchProveedores()
  }, [])

  return (
    <section className='min-h-screen p-8'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center gap-4 max-w-2xl mx-auto bg-beige p-8 rounded-lg shadow-md'
      >
        <h1 className='text-2xl font-bold text-orange-800 mb-4 text-center'>
          Alta de Artículos
        </h1>
        <label className='block text-sm font-medium text-orange-800'>
          Nombre
          <input
            type='text'
            name='nombre'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800'>
          Descripción
          <input
            type='text'
            name='descripcion'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800'>
          Stock Actual
          <input
            type='number'
            name='stock'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800'>
          Mínimo Stock
          <input
            type='number'
            name='minimoStock'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800'>
          Proveedor
          <select
            name='proveedorId'
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200'
          >
            <option value=''>Seleccionar proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.razonSocial}
              </option>
            ))}
          </select>
        </label>
        <button
          type='submit'
          className='w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
        >
          Crear Artículo
        </button>
      </form>
    </section>
  )
}

export default AltaArticulos
