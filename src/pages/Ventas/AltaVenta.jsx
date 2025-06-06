import { toast } from 'sonner'
import { obtenerArticulos } from '../../services/apiArticulos'
import { registrarVenta } from '../../services/apiVentas'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const AltaVenta = () => {
  const [articulos, setArticulos] = useState([]) // Estado para almacenar los articulos
  const navigate = useNavigate()
  //Dar de alta el nuevo Proveedor
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target) //Recupero los datos del formulario
    const cantidad = formData.get('cantidad')
    const idArticulo = formData.get('idArticulo')

    const dataToSend = {
      cantidad: parseInt(cantidad),
      idArticulo
    }

    // Llamar al servicio
    const { errorMsg, data } = await registrarVenta(dataToSend)
    if (errorMsg) {
      return toast.error(errorMsg)
    }

    toast.success('Venta creada correctamente')
    e.target.reset() // Reiniciar el formulario
    navigate('/ventas') // Redirigir a la lista de ventas
  }

  // Obtener los articulos al cargar el componente
  useEffect(() => {
    const fetchArticulos = async () => {
      const { errorMsg, data } = await obtenerArticulos()
      if (errorMsg) {
        return toast.error(errorMsg)
      }
      setArticulos(Array.isArray(data) ? data : [])
    }
    fetchArticulos()
  }, [])

  return (
    <section className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Nueva Venta
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-beige p-6 rounded-lg shadow-md'
      >
        <div>
          <label className='block text-sm font-medium text-orange-800'>
            Cantidad
          </label>
          <input
            min={1}
            required
            type='number'
            name='cantidad'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-orange-800'>
            Articulo
          </label>
          <select
            required
            name='idArticulo'
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200'
          >
            <option value=''>Seleccionar articulo</option>
            {articulos.map((art) => (
              <option key={art.codigo} value={art.codigo}>
                {art.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-end justify-end w-full col-span-full mt-2'>
          <button
            type='submit'
            className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
          >
            Crear Venta
          </button>
        </div>
      </form>
    </section>
  )
}

export default AltaVenta
