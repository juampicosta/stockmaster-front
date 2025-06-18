import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { obtenerArticulos } from '../../services/apiArticulos'
import { registrarOrden, sugerirOrdenCompra } from '../../services/apiOrdenes'
import { LuBoxes } from 'react-icons/lu'
import { BsCash } from 'react-icons/bs'
import { useNavigate, useSearchParams } from 'react-router'

const AltaOrden = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const [articulos, setArticulos] = useState([])
  const [selectedArticulo, setSelectedArticulo] = useState(null)
  const [sugerirOrden, setSugerirOrden] = useState(null)
  const [selectedProveedor, setSelectedProveedor] = useState('') // NUEVO estado controlado
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const lote = formData.get('lote')
    const articuloId = formData.get('articuloId')
    const proveedorId = formData.get('proveedorId')
    const proveedorIntermedia = selectedArticulo.articuloProveedores.find(
      (p) => p.proveedor.id == proveedorId
    )
    if (!proveedorIntermedia) {
      return toast.error(
        'Proveedor no encontrado para el articulo seleccionado'
      )
    }

    const newQuantity = parseInt(lote) + parseInt(selectedArticulo.stock)

    if (
      proveedorIntermedia.modeloInventario.id == 2 &&
      newQuantity < proveedorIntermedia.modeloInventario.puntoPedido
    ) {
      // Pedir confirmación al usuario
      const confirmacion = window.confirm(
        `El lote ingresado más la cantidad (${newQuantity}) es menor al punto de pedido (${proveedorIntermedia.modeloInventario.puntoPedido}) del proveedor seleccionado. ¿Desea continuar?`
      )
      if (!confirmacion) {
        return
      }
    }

    const dataToSend = {
      lote: parseInt(lote),
      codigoArticulo: parseInt(articuloId),
      idProveedor: parseInt(proveedorId)
    }

    const { errorMsg } = await registrarOrden(dataToSend)
    if (errorMsg) {
      return toast.error(errorMsg)
    }

    toast.success('Orden creada correctamente')
    e.target.reset()
    navigate('/ordenes-de-compra')
  }

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

  useEffect(() => {
    const suggestOrdenCompra = async (id) => {
      if (!id) {
        setSugerirOrden(null)
        setSelectedProveedor('')
        return
      }

      const { data, errorMsg } = await sugerirOrdenCompra(id)
      if (errorMsg) {
        return toast.error(errorMsg)
      }

      setSugerirOrden(data)
      setSelectedProveedor(data?.proveedorPredeterminado?.id ?? '')
    }

    if (id && articulos.length > 0) {
      const articulo = articulos.find((art) => art.codigo == id)
      setSelectedArticulo(articulo || null)
      suggestOrdenCompra(id)
    }
  }, [id, articulos])

  const handleChangeArticulo = (e) => {
    const selectedCodigo = e.target.value
    if (!selectedCodigo) {
      setSearchParams({})
      return
    }
    setSearchParams({ id: selectedCodigo })
  }

  return (
    <section className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Nueva Orden de Compra
      </h1>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-beige p-6 rounded-lg shadow-md'
      >
        <div>
          <label className='block text-sm font-medium text-orange-800'>
            Articulo
          </label>
          <select
            required
            onChange={handleChangeArticulo}
            value={selectedArticulo?.codigo || ''}
            name='articuloId'
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

        {selectedArticulo && (
          <div>
            <label className='block text-sm font-medium text-orange-800'>
              Lote
            </label>
            <input
              onChange={() => {
                setSugerirOrden(null)
              }}
              min={1}
              defaultValue={sugerirOrden?.lote}
              required
              type='number'
              name='lote'
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </div>
        )}

        {selectedArticulo && (
          <div>
            <label className='block text-sm font-medium text-orange-800'>
              Proveedores
            </label>
            <select
              required
              value={selectedProveedor} // controlado
              onChange={(e) => setSelectedProveedor(e.target.value)}
              name='proveedorId'
              className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200'
            >
              {selectedArticulo.articuloProveedores.map((prov) => (
                <option key={prov.proveedor.id} value={prov.proveedor.id}>
                  {prov.proveedor.razonSocial}
                </option>
              ))}
            </select>
          </div>
        )}

        {sugerirOrden && (
          <div className='text-orange-800'>
            <p className='flex items-center gap-2'>
              <LuBoxes className='text-xl text-orange-700' />
              <strong>Lote:</strong> {sugerirOrden.lote}
            </p>
            <p className='flex items-center gap-2'>
              <BsCash className='text-xl text-orange-700' />
              <strong>Monto total:</strong> ${sugerirOrden.montoTotal}
            </p>
          </div>
        )}

        <div className='flex items-end justify-end w-full col-span-full mt-2'>
          <button
            type='submit'
            className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
          >
            Crear Orden de Compra
          </button>
        </div>
      </form>
    </section>
  )
}

export default AltaOrden
