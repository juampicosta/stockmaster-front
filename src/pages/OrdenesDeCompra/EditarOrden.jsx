import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { editarOrden, obtenerOrden } from '../../services/apiOrdenes'

const EditaOrden = () => {
  const { id } = useParams()
  const [orden, setOrden] = useState(null)
  const navigate = useNavigate() // Hook para redirigir al usuario

  //Dar de alta el nuevo Proveedor
  const handleSubmit = async (e) => {
    e.preventDefault()

    const stockActual = parseInt(orden.articulo.stock, 10)
    const lote = parseInt(orden.lote, 10)

    const { errorMsg } = await editarOrden(orden, id)
    if (errorMsg) {
      return toast.error(errorMsg)
    }

    toast.success('Orden editada correctamente')
    e.target.reset() // Reiniciar el formulario
    navigate('/ordenes-de-compra') // Redirigir a la lista de ordenes
  }

  // Actualizar campos de la orden
  const handleChangeOrden = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setOrden((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  useEffect(() => {
    // Llamar al servicio para obtener la orden
    const fetchOrden = async () => {
      const { errorMsg, data } = await obtenerOrden(id)
      if (errorMsg) {
        return toast.error(errorMsg)
      }
      setOrden(data)
    }

    fetchOrden()
  }, [id])

  console.log(orden)

  return (
    <section className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Editar Orden #{id}
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-beige p-6 rounded-lg shadow-md'
      >
        <div>
          <label className='block text-sm font-medium text-orange-800'>
            Lote
          </label>
          <input
            onChange={handleChangeOrden}
            value={orden?.lote || ''}
            min={1}
            required
            type='number'
            name='lote'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </div>

        <div className='flex items-end justify-start'>
          <button
            type='submit'
            className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
          >
            Editar Orden
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditaOrden
