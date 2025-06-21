import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  registrarArticulo,
  obtenerProveedores
} from '../../services/apiArticulos'
import { toast } from 'sonner'
import { obtenerTipoModeloInventarios } from '../../services/apiTipoModeloInventario'

const AltaArticulos = () => {
  const [proveedores, setProveedores] = useState([])
  const [selectedProveedor, setSelectedProveedor] = useState(null)
  const [tipoModelos, setTipoModelos] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Desactivar el botón de envío
    e.target.querySelector('button[type="submit"]').disabled = true
    e.target.querySelector('button[type="submit"]').classList.add('opacity-50')
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    // Convertir tipos
    data.demandaArticulo = parseFloat(data.demandaArticulo)
    data.costoAlmacenamiento = parseFloat(data.costoAlmacenamiento)
    data.stock = parseInt(data.stock, 10)
    data.stockSeguridad = parseInt(data.stockSeguridad, 10)
    data.precioVenta = parseFloat(data.precioVenta)
    data.precioUnitario = parseFloat(data.precioUnitario)
    data.costoPedido = parseFloat(data.costoPedido)
    data.demoraEntrega = parseFloat(data.demoraEntrega)
    data.intervaloRevision = parseInt(data.intervaloRevision, 10)

    // Construir payload
    const payload = {
      articuloDTO: {
        descripcion: data.descripcion,
        demandaArticulo: data.demandaArticulo,
        costoAlmacenamiento: data.costoAlmacenamiento,
        stock: data.stock,
        stockSeguridad: data.stockSeguridad,
        precioVenta: data.precioVenta
      }
    }

    if (data.idProveedor) {
      payload.idProveedor = data.idProveedor || null
      payload.articuloProveedorDTO = {
        precioUnitario: data.precioUnitario,
        costoPedido: data.costoPedido,
        demoraEntrega: data.demoraEntrega,
        idTipoModelo: data.idTipoModelo || null,
        intervaloRevision: data.intervaloRevision
      }
    }

    try {
      const { errorMsg } = await registrarArticulo(payload)

      if (errorMsg) throw new Error(errorMsg)

      toast.success('Artículo creado correctamente')
      e.target.reset()
      navigate('/articulos') // Redirige a la lista
    } catch (error) {
      console.log(error.message)

      toast.error(error.message || 'Error al crear el artículo')
    } finally {
      // Reactivar el botón de envío
      e.target.querySelector('button[type="submit"]').disabled = false
      e.target
        .querySelector('button[type="submit"]')
        .classList.remove('opacity-50')
    }
  }

  useEffect(() => {
    const fetchProveedores = async () => {
      const { data, errorMsg } = await obtenerProveedores()

      if (errorMsg) {
        return toast.error(errorMsg)
      }

      setProveedores(data) // Debe devolver un array plano de proveedores
    }

    const fetchTipoModelos = async () => {
      const { data, errorMsg } = await obtenerTipoModeloInventarios()
      if (errorMsg) {
        return toast.error(errorMsg)
      }
      setTipoModelos(data) // Debe devolver un array plano de tipos de modelo
    }

    fetchProveedores()
    fetchTipoModelos()
  }, [])

  // Actualizar campos del proveedor
  const handleChangeProveedor = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setSelectedProveedor((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  return (
    <section className='min-h-screen p-8'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center gap-4 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md'
      >
        <h1 className='text-2xl font-bold text-orange-800 mb-4 text-center'>
          Alta de Artículos
        </h1>

        {/* Campos del formulario */}
        <label className='block text-sm font-medium text-orange-800 w-full'>
          Descripción
          <input
            required
            type='text'
            name='descripcion'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Demanda (Anual)
          <input
            required
            min={0}
            type='number'
            name='demandaArticulo'
            step='any'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Costo de Almacenamiento (Por Unidad)
          <input
            required
            min={0}
            type='number'
            name='costoAlmacenamiento'
            step='any'
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
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Precio de Venta
          <input
            required
            min={0}
            type='number'
            name='precioVenta'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Proveedor Predeterminado (Opcional)
          <select
            name='idProveedor'
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-200'
            onChange={handleChangeProveedor}
          >
            <option value=''>Seleccionar proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.razonSocial}
              </option>
            ))}
          </select>
        </label>

        {selectedProveedor?.idProveedor && (
          <div>
            <label className='block text-sm font-medium text-orange-800 w-full'>
              Precio Unitario
              <input
                required
                min={0}
                type='number'
                name='precioUnitario'
                step='any'
                className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
              />
            </label>

            <label className='block text-sm font-medium text-orange-800 w-full'>
              Costo de Pedido
              <input
                required
                min={0}
                type='number'
                name='costoPedido'
                step='any'
                className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
              />
            </label>

            <label className='block text-sm font-medium text-orange-800 w-full'>
              Demora de Entrega (Días)
              <input
                required
                min={0}
                type='number'
                name='demoraEntrega'
                step='any'
                className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
              />
            </label>

            <label className='block text-sm font-medium text-orange-800 w-full'>
              Tipo de Modelo
              <select
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
          </div>
        )}

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
