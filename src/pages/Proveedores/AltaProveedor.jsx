import { useState, useEffect } from 'react'
import { registrarProveedor } from '../../services/apiProveedores'
import { toast } from 'sonner'
import { obtenerArticulos } from '../../services/apiArticulos'

const AltaProveedor = () => {
  //Datos de los Articulos para el proveedor
  const [articulos, setArticulos] = useState([])

  //Datos de cada Articulo del Proveedor
  const [articuloDatos, setArticuloDatos] = useState([])

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
    const { errorMsg, data } = await registrarProveedor(dataToSend)
    if (errorMsg) {
      return toast.error(errorMsg)
    }

    toast.success('Proveedor creado correctamente')
    e.target.reset() // Reiniciar el formulario
    setArticuloDatos([]) // Reiniciar los articulos seleccionados
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
    fetchArticulos()
  }, [])

  console.log(articuloDatos)

  //Actualizar el estado de los articulos selecciondos
  const handleChange = (e) => {
    e.preventDefault()
    const { value } = e.target

    const alreadyExists = articuloDatos.some(
      (articulo) => articulo.idArticulo == value
    )
    if (alreadyExists) {
      return toast.warning('Articulo ya seleccionado')
    }
    if (!value) return toast.warning('Seleccione un articulo')
    setArticuloDatos((prevState) => [
      ...prevState,
      {
        idArticulo: value,
        descripcion: e.target.options[e.target.selectedIndex].text,
        datosArticulo: {
          costoCompra: 0,
          costoPedido: 0,
          demoraEntrega: 0,
          precioUnitario: 0
        }
      }
    ])
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
            required
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
                  <span className='text-lg font-semibold'>
                    {articulo.descripcion}
                  </span>
                  <label className='block text-sm font-medium text-orange-800'>
                    Costo de compra
                    <input
                      required
                      type='number'
                      name='costoCompra'
                      value={articulo.datosArticulo.costoCompra}
                      onChange={(e) =>
                        handleChangeArticulo(e, articulo.idArticulo)
                      }
                      className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
                    />
                  </label>
                  <label className='block text-sm font-medium text-orange-800'>
                    Costo de pedido
                    <input
                      required
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
                    Demora de Entrega
                    <input
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
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className='col-span-full text-orange-500'>
            No hay articulos seleccionados!
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
