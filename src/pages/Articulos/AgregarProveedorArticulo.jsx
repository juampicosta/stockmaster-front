import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { vincularProveedorArticulo } from '../../services/apiArticulos'
import { obtenerProveedoresAjenos } from '../../services/apiArticulos'
import { toast } from 'sonner'
import { obtenerTipoModeloInventarios } from '../../services/apiTipoModeloInventario'
import Button from '../../components/Button'

const AgregarProveedorArticulo = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [proveedoresDisponibles, setProveedoresDisponibles] = useState([])
  const [tipoModelos, setTipoModelos] = useState([])
  const [idSeleccionado, setIdSeleccionado] = useState('')
  const [relacion, setRelacion] = useState({
    costoPedido: '',
    demoraEntrega: '',
    precioUnitario: '',
    idTipoModelo: ''
  })
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { errorMsg } = await vincularProveedorArticulo(
      id, // idArticulo (desde useParams)
      idSeleccionado, // idProveedor
      relacion // datos de la relación
    )
    if (errorMsg) {
      toast.error(errorMsg)
      return
    }
    toast.success('Proveedor vinculado correctamente')
    navigate(`/articulos/detalle/${id}`)
  }

  // Obtener todos los proveedores ajenos
  useEffect(() => {
    const fetchProveedores = async () => {
      const { data, errorMsg } = await obtenerProveedoresAjenos(id)
      if (errorMsg) {
        toast.error(errorMsg)
        return
      }
      setProveedoresDisponibles(data || [])
      setIdSeleccionado('')
      setProveedorSeleccionado(null)
      setRelacion({
        costoPedido: '',
        demoraEntrega: '',
        precioUnitario: ''
      })
    }
    const fetchTipoModelos = async () => {
      const { data, errorMsg } = await obtenerTipoModeloInventarios()
      if (errorMsg) {
        toast.error(errorMsg)
        return
      }
      setTipoModelos(data || [])
    }
    fetchProveedores()
    fetchTipoModelos()
  }, [id])

  // Cuando seleccionas un proveedor, lo guardas y reseteas los inputs
  useEffect(() => {
    if (!idSeleccionado) {
      setProveedorSeleccionado(null)
      setRelacion({
        costoPedido: '',
        demoraEntrega: '',
        precioUnitario: ''
      })
      return
    }
    const proveedor = proveedoresDisponibles.find(
      (p) => String(p.id) === String(idSeleccionado)
    )
    setProveedorSeleccionado(proveedor || null)
    setRelacion({
      costoPedido: '',
      demoraEntrega: '',
      precioUnitario: ''
    })
  }, [idSeleccionado, proveedoresDisponibles])

  return (
    <section className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Añadir Proveedor al Artículo
      </h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 bg-beige p-6 rounded-lg shadow-md'
      >
        {/* Lista desplegable de proveedores */}
        <label className='block text-sm font-medium text-orange-800'>
          Selecciona un proveedor
          <select
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400 mt-1'
            value={idSeleccionado}
            onChange={(e) => setIdSeleccionado(e.target.value)}
          >
            {proveedoresDisponibles.length === 0 && (
              <option value=''>No hay proveedores disponibles</option>
            )}
            {proveedoresDisponibles.length > 0 && (
              <option value=''>Selecciona un proveedor</option>
            )}
            {proveedoresDisponibles.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.razonSocial}
              </option>
            ))}
          </select>
        </label>

        {/* Mostrar datos del proveedor seleccionado */}
        {proveedorSeleccionado && (
          <div className='mb-2 text-orange-700 font-semibold'>
            {proveedorSeleccionado.email} - {proveedorSeleccionado.telefono}
          </div>
        )}

        {/* Inputs solo si hay proveedor seleccionado */}
        {proveedorSeleccionado && (
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
                onChange={(e) =>
                  setRelacion({
                    ...relacion,
                    idTipoModelo: parseInt(e.target.value)
                  })
                }
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
        )}

        <div className='flex items-end justify-start'>
          <Button type='submit' disabled={!proveedorSeleccionado}>
            Guardar
          </Button>
        </div>
      </form>
    </section>
  )
}

export default AgregarProveedorArticulo
