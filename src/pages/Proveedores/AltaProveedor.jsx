import { useState, useEffect } from 'react'
import { registrarProveedor } from '../../services/apiProveedores'
import { toast } from 'sonner'
import { obtenerArticulos } from '../../services/apiArticulos'
import { useNavigate } from 'react-router-dom'
import { obtenerTipoModeloInventarios } from '../../services/apiTipoModeloInventario'
import { MdKeyboardArrowUp } from 'react-icons/md'
const AltaProveedor = () => {
  //Estados de los articulos expandidos
  const [articulosExpandido, setArticulosExpandido] = useState({})

  //Para navegar a otras rutas
  const navigate = useNavigate()

  //Datos de los Articulos para el proveedor
  const [articulos, setArticulos] = useState([])

  //Datos de cada Articulo del Proveedor
  const [articuloDatos, setArticuloDatos] = useState([])

  //Tipo de modelos de inventarios
  const [tipoModelos, setTipoModelos] = useState([])

  // Actualizar campos del articulo
  const handleChangeArticulo = (e, id) => {
    e.preventDefault()
    const { value, name } = e.target

    setArticuloDatos((prevState) =>
      prevState.map((articulo) =>
        articulo.idArticulo === id
          ? {
              ...articulo,
              datosArticulo: {
                ...articulo.datosArticulo,
                [name]: parseFloat(value)
              }
            }
          : articulo
      )
    )
  }

  //Función para elimianr una articulo seleccionado
  const handleRemoveArticulo = (id) => {
    const articuloExistente = articuloDatos.find((art) => art.idArticulo == id)
    if (!articuloExistente) {
      return toast.error('Articulo no encontrado')
    }

    setArticulos((prev) => [
      ...prev,
      {
        codigo: articuloExistente.idArticulo,
        descripcion: articuloExistente.descripcion
      }
    ])
    setArticuloDatos((prev) => prev.filter((art) => art.idArticulo !== id))
    setArticulosExpandido((prev) => {
      const nuevo = { ...prev }
      delete nuevo[id]
      return nuevo
    })

    toast.success('Articulo eliminado correctamente')
  }

  ///Función para expandir o contraer los articulos
  const toggleExpand = (id) => {
    setArticulosExpandido((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  //Dar de alta el nuevo Proveedor
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target) //Recupero los datos del formulario
    const email = formData.get('email')
    const razonSocial = formData.get('razonSocial')
    const telefono = formData.get('telefono')

    const dataToSend = {
      email,
      razonSocial,
      telefono,
      articulos: articuloDatos
    }

    // Llamar al servicio
    const { errorMsg } = await registrarProveedor(dataToSend)
    if (errorMsg) {
      return toast.error(errorMsg)
    }

    toast.success('Proveedor creado correctamente')
    e.target.reset() // Reiniciar el formulario
    setArticuloDatos([]) // Reiniciar los articulos seleccionados
    navigate(`/proveedores`) // Redirigir a la lista de proveedores
  }

  //Llamar al servicio para traer los articulos

  useEffect(() => {
    const fetchArticulos = async () => {
      const { errorMsg, data } = await obtenerArticulos()
      if (errorMsg) {
        return toast.error(errorMsg)
      }
      setArticulos(Array.isArray(data) ? data : [])
    }

    const fetchTipoModelos = async () => {
      const { errorMsg, data } = await obtenerTipoModeloInventarios()
      if (errorMsg) {
        return toast.error(errorMsg)
      }
      setTipoModelos(Array.isArray(data) ? data : [])
    }
    fetchArticulos()
    fetchTipoModelos()
  }, [])

  //Actualizar el estado de los articulos selecciondos
  const handleChange = (e) => {
    e.preventDefault()
    const { value } = e.target

    const articuloExistente = articuloDatos.some(
      (art) => art.idArticulo === value
    )
    if (articuloExistente) {
      return toast.warning('Articulo ya seleccionado')
    }

    const articuloSeleccionado = articulos.find((art) => art.codigo == value)
    if (!articuloSeleccionado) {
      return toast.error('Articulo no encontrado')
    }

    if (!value) return toast.warning('Seleccione un articulo')
    setArticuloDatos((prevState) => [
      ...prevState,
      {
        idArticulo: value,
        descripcion: articuloSeleccionado.descripcion,
        datosArticulo: {
          costoPedido: '',
          demoraEntrega: '',
          precioUnitario: ''
        }
      }
    ])
    setArticulosExpandido((prev) => ({
      ...prev,
      [value]: true
    }))

    setArticulos((articulos) => articulos.filter((art) => art.codigo != value))
    e.target.value = ''
    toast.success('Articulo agregado correctamente')
  }

  return (
    <section className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Nuevo Proveedor
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-beige p-6 rounded-lg shadow-md'
      >
        <div>
          <label className='block text-sm font-medium text-orange-800'>
            Email
          </label>
          <input
            required
            type='email'
            name='email'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-orange-800'>
            Razón Social
          </label>
          <input
            required
            type='text'
            name='razonSocial'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-orange-800'>
            Teléfono
          </label>
          <input
            min={0}
            required
            type='number'
            name='telefono'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-orange-800'>
            Articulo
          </label>
          <select
            onChange={(e) => handleChange(e)}
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
        {articuloDatos.length > 0 ? (
          <div className='col-span-full'>
            <h3 className='text-xl font-semibold text-orange-800 mb-2'>
              Articulos Seleccionados
            </h3>
            <ul className='flex flex-col gap-4 pl-5'>
              {articuloDatos.map((articulo) => (
                <li key={articulo.idArticulo} className='text-sm text-marron'>
                  <div
                    className={`rounded-xl transition-all duration-200 ${
                      articulosExpandido[articulo.idArticulo]
                        ? 'bg-crema shadow-lg border-2 border-orange-400 p-4'
                        : 'bg-crema shadow-md border border-yellow-200 p-2'
                    }`}
                  >
                    {/* Cabecera del artículo */}
                    <div className='flex items-center justify-between w-full'>
                      <div className='flex items-center'>
                        <span className='text-lg font-semibold'>
                          {articulo.descripcion}
                        </span>
                        <button
                          type='button'
                          onClick={() => toggleExpand(articulo.idArticulo)}
                          className='ml-2 text-orange-600 focus:outline-none'
                        >
                          <span
                            className={`inline-block transition-transform duration-200 ${
                              articulosExpandido[articulo.idArticulo]
                                ? 'rotate-180'
                                : ''
                            }`}
                          >
                            <MdKeyboardArrowUp size={20} />
                          </span>
                        </button>
                      </div>

                      <button
                        type='button'
                        onClick={() =>
                          handleRemoveArticulo(articulo.idArticulo)
                        }
                        className='px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md transition-colors duration-200'
                        title='Eliminar artículo'
                      >
                        Eliminar
                      </button>
                    </div>

                    {/* Inputs desplegables */}
                    {articulosExpandido[articulo.idArticulo] && (
                      <div className='mt-4 flex flex-col gap-4'>
                        <label className='block text-sm font-medium text-orange-800'>
                          Costo de Pedido
                          <input
                            required
                            min={0}
                            type='number'
                            name='costoPedido'
                            value={articulo.datosArticulo.costoPedido}
                            onChange={(e) =>
                              handleChangeArticulo(e, articulo.idArticulo)
                            }
                            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
                          />
                        </label>
                        <label className='block text-sm font-medium text-orange-800'>
                          Demora de Entrega (Días)
                          <input
                            min={0}
                            required
                            type='number'
                            name='demoraEntrega'
                            value={articulo.datosArticulo.demoraEntrega}
                            onChange={(e) =>
                              handleChangeArticulo(e, articulo.idArticulo)
                            }
                            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
                          />
                        </label>
                        <label className='block text-sm font-medium text-orange-800'>
                          Precio Unitario
                          <input
                            min={0}
                            required
                            type='number'
                            name='precioUnitario'
                            value={articulo.datosArticulo.precioUnitario}
                            onChange={(e) =>
                              handleChangeArticulo(e, articulo.idArticulo)
                            }
                            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
                          />
                        </label>

                        <label className='block text-sm font-medium text-orange-800 w-full'>
                          Tipo de Modelo
                          <select
                            value={articulo.idTipoModelo}
                            onChange={(e) => {
                              handleChangeArticulo(e, articulo.idArticulo)
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
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className='col-span-full text-orange-500'>
            ¡No hay artículos seleccionados!
          </p>
        )}

        <div className='flex items-end justify-end w-full col-span-full mt-2'>
          <button
            type='submit'
            className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
          >
            Crear Proveedor
          </button>
        </div>
      </form>
    </section>
  )
}

export default AltaProveedor
