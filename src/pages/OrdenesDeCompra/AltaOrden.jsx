import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { obtenerArticulos } from '../../services/apiArticulos'
import { registrarOrden, sugerirOrdenCompra } from '../../services/apiOrdenes'
import { BsCash } from 'react-icons/bs'
import { useNavigate, useSearchParams } from 'react-router'

const AltaOrden = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const [articulos, setArticulos] = useState([])
  const [selectedArticulo, setSelectedArticulo] = useState(null)
  const [selectedProveedor, setSelectedProveedor] = useState('')
  const [existingOrden, setExistingOrden] = useState(false)
  const [lote, setLote] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
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

    if (existingOrden) {
      const confirmacion = window.confirm(
        'Ya existe una orden de compra pendiente o enviada para este artículo. ¿Desea continuar?'
      )
      if (!confirmacion) {
        return
      }
    }

    const newQuantity = parseInt(lote) + parseInt(selectedArticulo.stock)

    if (
      proveedorIntermedia.tipoModeloInventario.id == 1 &&
      newQuantity <= proveedorIntermedia.modeloInventario.puntoPedido
    ) {
      // Pedir confirmación al usuario
      const confirmacion = window.confirm(
        `El lote ingresado más el stock actual (${newQuantity}) es menor o igual al punto de pedido (${proveedorIntermedia.modeloInventario.puntoPedido}) del proveedor seleccionado. ¿Desea continuar?`
      )
      if (!confirmacion) {
        return
      }
    }

    if (
      proveedorIntermedia.tipoModeloInventario.id == 2 &&
      newQuantity > proveedorIntermedia.modeloInventario.inventarioMax
    ) {
      // Pedir confirmación al usuario
      const confirmacion = window.confirm(
        `El lote ingresado más el stock actual (${newQuantity}) es mayor al inventario máximo (${proveedorIntermedia.modeloInventario.inventarioMax}) del proveedor seleccionado. ¿Desea continuar?`
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
        setSelectedProveedor('')
        setLote('')
        setExistingOrden(false)
        return
      }

      const { data, errorMsg } = await sugerirOrdenCompra(id)
      if (errorMsg) {
        if (
          errorMsg ===
          'El Artículo tiene órdenes de compra en estado Pendiente o Enviada'
        ) {
          setExistingOrden(true)
        }
        setSelectedProveedor(
          articulos.find((art) => art.codigo == id)?.provPredeterminado?.id ||
            ''
        )
        setLote('')
        return toast.error(errorMsg)
      }

      setSelectedProveedor(data?.proveedorPredeterminado?.id ?? '')
      setLote(data?.lote ?? '')
    }

    if (id && articulos.length > 0) {
      const articulo = articulos.find((art) => art.codigo == id)
      setSelectedArticulo(articulo || null)
      suggestOrdenCompra(id)
    }
  }, [id, articulos])

  const handleChangeArticulo = (e) => {
    setExistingOrden(false)
    const selectedCodigo = e.target.value
    if (!selectedCodigo) {
      setSearchParams({})
      setSelectedArticulo(null)
      setSelectedProveedor('')
      setLote('')
      return
    }
    setSearchParams({ id: selectedCodigo })
  }

  const articuloSeleccionado = articulos.find(
    (art) => art.codigo == selectedArticulo?.codigo
  )

  const articuloProveedor = articuloSeleccionado?.articuloProveedores.find(
    (ap) => ap.proveedor.id == selectedProveedor
  )

  const montoTotal =
    articuloProveedor?.preciounitario * lote + articuloProveedor?.costoPedido ||
    0

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
              onChange={(e) => setLote(e.target.value)}
              min={1}
              value={lote}
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
              value={selectedProveedor}
              onChange={(e) => setSelectedProveedor(e.target.value)}
              name='proveedorId'
              className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200'
            >
              {selectedArticulo.articuloProveedores
                .filter(
                  (articuloProveedor) =>
                    !articuloProveedor.proveedor.fechaHoraBaja
                )
                .map((prov) => (
                  <option key={prov.proveedor.id} value={prov.proveedor.id}>
                    {prov.proveedor.razonSocial}
                  </option>
                ))}
            </select>
          </div>
        )}

        {lote && selectedProveedor && (
          <div className='text-orange-800'>
            <p className='flex items-center gap-2'>
              <BsCash className='text-xl text-orange-700' />
              <strong>Monto total:</strong> ${montoTotal.toFixed(2)}
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
