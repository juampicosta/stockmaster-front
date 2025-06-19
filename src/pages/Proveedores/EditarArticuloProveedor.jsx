import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  editArticuloProveedor,
  obtenerArticulosProveedor
} from '../../services/apiProveedores'
import { obtenerTipoModeloInventarios } from '../../services/apiTipoModeloInventario'
import { toast } from 'sonner'
import { MdPerson, MdInventory } from 'react-icons/md'

const EditarArticuloProveedor = () => {
  const { id, codigo } = useParams()
  const navigate = useNavigate()
  const [proveedor, setProveedor] = useState(null)
  const [articuloNombre, setArticuloNombre] = useState('')
  const [tipoModelos, setTipoModelos] = useState([])

  //Dar de alta el nuevo articulo del proveedor
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Llamar al servicio con los datos de la relación
    const { errorMsg } = await editArticuloProveedor(id, codigo, relacion)
    if (errorMsg) {
      return toast.error(errorMsg)
    }

    toast.success('Artículo del proveedor editado correctamente')
    // Ir a la página anterior
    navigate(-1)
  }

  //Traer los tipos de modelo para editar el artículo del proveedor
  useEffect(() => {
    const fetchTipoModelos = async () => {
      const { data, errorMsg } = await obtenerTipoModeloInventarios()
      if (errorMsg) {
        return toast.error(errorMsg)
      }
      setTipoModelos(data)
    }
    fetchTipoModelos()
  }, [])

  //Actualizar el articulo del proveedor
  const [relacion, setRelacion] = useState(null)
  useEffect(() => {
    const fetchRelacion = async () => {
      const { data, errorMsg } = await obtenerArticulosProveedor(id)
      if (errorMsg) {
        toast.error(errorMsg)
        return
      }
      // Buscar el artículo correcto por código
      const articulo = data.find(
        (a) => String(a.articulo.codigo) === String(codigo)
      )
      if (!articulo) {
        toast.error('No se encontró el artículo para este proveedor')
        return
      }
      // Extraer los datos de la relación
      const datosRelacion = Array.isArray(articulo.articulo.articuloProveedores)
        ? articulo.articulo.articuloProveedores.find(
            (rel) => String(rel.proveedor.id) === String(id)
          )
        : articulo.articulo.articuloProveedores

      setRelacion({
        costoPedido: datosRelacion?.costoPedido ?? '',
        demoraEntrega: datosRelacion?.demoraEntrega ?? '',
        precioUnitario: datosRelacion?.preciounitario ?? '',
        idTipoModelo: datosRelacion?.tipoModeloInventario?.id ?? '',
        intervaloRevision: datosRelacion?.intervaloRevision ?? ''
      })
      setArticuloNombre(articulo.articulo.descripcion || '')
      setProveedor(datosRelacion?.proveedor || null)
    }
    fetchRelacion()
  }, [id, codigo])

  return (
    <section className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Editar datos del Articulo
      </h1>
      <div className='bg-white shadow-lg border border-yellow-200 rounded-xl p-6 mb-8'>
        <h2 className='text-2xl font-bold text-orange-800 mb-4'>Información</h2>
        <div className='flex items-center mb-4'>
          <div className='flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mr-3'>
            <MdPerson className='text-2xl text-orange-700' />
          </div>
          <span className='text-xl font-semibold text-orange-800'>
            {proveedor?.razonSocial || 'Proveedor'}
          </span>
        </div>
        <div className='flex items-center'>
          <div className='flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mr-3'>
            <MdInventory className='text-2xl text-orange-700' />
          </div>
          <span className='text-xl font-semibold text-orange-800'>
            {articuloNombre || 'Artículo'}
          </span>
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 bg-beige p-6 rounded-lg shadow-md'
      >
        <h1 className='text-2xl font-extrabold text-orange-900 mb-4'>
          Datos a modificar del Articulo
        </h1>
        {relacion ? (
          <>
            <label className='block text-sm font-medium text-orange-800'>
              Costo de Pedido
              <input
                required
                type='number'
                name='costoPedido'
                value={relacion.costoPedido}
                onChange={(e) =>
                  setRelacion({ ...relacion, costoPedido: e.target.value })
                }
                className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
              />
            </label>
            <label className='block text-sm font-medium text-orange-800'>
              Demora de Entrega (Días)
              <input
                required
                type='number'
                name='demoraEntrega'
                value={relacion.demoraEntrega}
                onChange={(e) =>
                  setRelacion({ ...relacion, demoraEntrega: e.target.value })
                }
                className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
              />
            </label>
            <label className='block text-sm font-medium text-orange-800'>
              Precio Unitario
              <input
                required
                type='number'
                name='precioUnitario'
                value={relacion.precioUnitario}
                onChange={(e) =>
                  setRelacion({ ...relacion, precioUnitario: e.target.value })
                }
                className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
              />
            </label>
            <label className='block text-sm font-medium text-orange-800 w-full'>
              Tipo de Modelo
              <select
                value={relacion.idTipoModelo} // <-- Esto selecciona el modelo previamente guardado
                onChange={(e) => {
                  setRelacion({ ...relacion, idTipoModelo: e.target.value })
                }}
                required
                name='idTipoModelo'
                className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-200'
              >
                <option value=''>Seleccionar tipo de modelo</option>
                {tipoModelos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : (
          <p className='col-span-full text-orange-500'>
            No se encontró la relación con el artículo seleccionado.
          </p>
        )}

        <div className='flex items-end justify-start'>
          <button
            type='submit'
            className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
          >
            Editar Articulo
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditarArticuloProveedor
