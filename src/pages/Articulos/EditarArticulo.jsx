import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  obtenerArticuloPorId,
  actualizarArticulo
} from '../../services/apiArticulos'
import { toast } from 'sonner'

const EditarArticulo = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [articulo, setArticulo] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar artículo y proveedores al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const { data: articuloData, errorMsg: errorArticulo } =
          await obtenerArticuloPorId(id)

        if (errorArticulo) return toast.error(errorArticulo)

        setArticulo(articuloData)
      } catch (error) {
        toast.error(`Error al cargar los datos: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setArticulo((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const formValues = Object.fromEntries(form.entries())

    const descripcion = formValues.descripcion.trim()
    const demandaArticulo = parseFloat(formValues.demandaArticulo)
    const costoAlmacenamiento = parseFloat(formValues.costoAlmacenamiento)
    const stock = parseInt(formValues.stock)
    const stockSeguridad = parseInt(formValues.stockSeguridad)
    const precioVenta = parseFloat(formValues.precioVenta)
    const idProvPredeterminado =
      parseInt(formValues.idProvPredeterminado) || null

    // Construir payload
    const payload = {
      descripcion,
      demandaArticulo,
      costoAlmacenamiento,
      stock,
      stockSeguridad,
      precioVenta,
      idProvPredeterminado
    }

    try {
      const { errorMsg } = await actualizarArticulo(id, payload)

      if (errorMsg) throw new Error(errorMsg)

      toast.success('Artículo actualizado correctamente')
      navigate('/articulos') // Redirige al listado
    } catch (error) {
      toast.error(error.message || 'Error al actualizar el artículo')
    }
  }

  if (loading || !articulo) return <p>Cargando datos...</p>

  return (
    <section className='min-h-screen p-8'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center gap-4 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md'
      >
        <h1 className='text-2xl font-bold text-orange-800 mb-4 text-center'>
          Editar Artículo
        </h1>

        {/* Campos del formulario */}
        <label className='block text-sm font-medium text-orange-800 w-full'>
          Descripción
          <input
            required
            type='text'
            name='descripcion'
            defaultValue={articulo?.descripcion}
            onChange={handleInputChange}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Demanda (Anual)
          <input
            required
            type='number'
            name='demandaArticulo'
            step='any'
            min={0}
            defaultValue={articulo?.demandaArticulo}
            onChange={handleInputChange}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Costo de Almacenamiento (Por Unidad)
          <input
            required
            type='number'
            min={0}
            name='costoAlmacenamiento'
            step='any'
            defaultValue={articulo?.costoAlmacenamiento}
            onChange={handleInputChange}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Stock
          <input
            required
            min={0}
            type='number'
            name='stock'
            defaultValue={articulo?.stock}
            onChange={handleInputChange}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Stock de Seguridad
          <input
            required
            min={0}
            type='number'
            name='stockSeguridad'
            defaultValue={articulo?.stockSeguridad}
            onChange={handleInputChange}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Proveedor Predeterminado
          <select
            name='idProvPredeterminado'
            defaultValue={articulo?.provPredeterminado?.id || ''}
            onChange={(e) => {
              handleInputChange(e)
            }}
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-200'
          >
            <option value=''>Seleccionar proveedor</option>
            {articulo.articuloProveedores.map((articuloProveedor) => (
              <option
                key={articuloProveedor.proveedor.id}
                value={articuloProveedor.proveedor.id}
              >
                {articuloProveedor.proveedor.razonSocial}
              </option>
            ))}
          </select>
        </label>

        <button
          type='submit'
          className='w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
        >
          Guardar Cambios
        </button>
      </form>
    </section>
  )
}

export default EditarArticulo
