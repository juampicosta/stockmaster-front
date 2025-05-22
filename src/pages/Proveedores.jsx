import { useState } from 'react'

const Proveedores = () => {
  //Datos temporales para cargar Articulo en el Alta de Proveedor
  const [articulos] = useState([
    { codigo: 1, nombre: 'Articulo 1' },
    { codigo: 2, nombre: 'Articulo 2' }
  ])

  const [articuloDatos, setArticuloDatos] = useState([])

  //Estados de Alerta y Error:
  const [alerta, setAlerta] = useState('')
  const [error, setError] = useState('')

  //Actualizar el estado de los articulos selecciondos
  const handleChange = (e) => {
    e.preventDefault()
    setArticuloDatos((prevState) => [
      ...prevState,
      {
        id: e.target.value,
        nombre: e.target.options[e.target.selectedIndex].text,
        datosArticulo: {
          costoCompra: 0,
          costoPedido: 0,
          demoraEntrega: 0,
          precioUnitario: 0
        }
      }
    ])
  }

  //Dar de alta el nuevo Proveedor
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target) //Recupero los datos del formulario
    const email = formData.get('email')
    const razonSocial = formData.get('razonSocial')
    const telefono = formData.get('telefono')

    const data = {
      email,
      razonSocial,
      telefono,
      articulos: articuloDatos
    }

    // Llamar al servicio
    // const {error} = await crearProveedor(data)
    // setError(error)

    setAlerta('Proveedor creado correctamente')
    setTimeout(() => setAlerta(''), 3000)
  }

  // Actualizar el costo de compra del articulo
  const handleChangeCosto = (e, id) => {
    e.preventDefault()
    const { value } = e.target
    const findArticulo = articuloDatos.find((art) => art.id === id)
    if (findArticulo) {
      setArticuloDatos((prevState) =>
        prevState.map((articulo) =>
          articulo.id === id
            ? {
                ...articulo,
                datosArticulo: {
                  ...articulo.datosArticulo,
                  costoCompra: parseFloat(value)
                }
              }
            : articulo
        )
      )
    }
  }

  // Actualizar el costo de compra del articulo
  const handleChangeCostoPedido = (e, id) => {
    e.preventDefault()
    const { value } = e.target
    const findArticulo = articuloDatos.find((art) => art.id === id)
    if (findArticulo) {
      setArticuloDatos((prevState) =>
        prevState.map((articulo) =>
          articulo.id === id
            ? {
                ...articulo,
                datosArticulo: {
                  ...articulo.datosArticulo,
                  costoPedido: parseFloat(value)
                }
              }
            : articulo
        )
      )
    }
  }

  console.log(articuloDatos)

  return (
    <div className='bg-white min-h-screen p-8'>
      {/* Alerta temporal */}
      {alerta && (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-6 py-3 rounded-lg shadow-md z-50 animate-bounce'>
          {alerta}
        </div>
      )}

      <h1 className='text-3xl font-bold text-orange-900 mb-6'>
        Gestión de Proveedores
      </h1>

      <section className='mb-12'>
        <h2 className='text-xl font-semibold text-orange-800 mb-4'>
          Nuevo Proveedor
        </h2>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-beige p-6 rounded-lg shadow-md'
        >
          {/* Error de campo/s vacío/s */}
          {error && (
            <div className='col-span-full text-red-600 font-medium'>
              {error}
            </div>
          )}
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
              required
              name='articuloId'
              onChange={handleChange}
              className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200'
            >
              <option value=''>Seleccionar articulo</option>
              {articulos.map((art) => (
                <option key={art.codigo} value={art.codigo}>
                  {art.nombre}
                </option>
              ))}
            </select>
          </div>
          {articuloDatos.length > 0 ? (
            <div className='col-span-full'>
              <h3 className='text-lg font-semibold text-orange-800 mb-2'>
                Articulos Seleccionados
              </h3>
              <ul className='list-disc pl-5'>
                {articuloDatos.map((articulo) => (
                  <li key={articulo.id} className='text-sm text-gray-700'>
                    {articulo.nombre}
                    <label className='block text-sm font-medium text-orange-800'>
                      Costo de compra
                      <input
                        required
                        type='number'
                        name='costoCompra'
                        value={articulo.datosArticulo.costoCompra}
                        onChange={(e) => handleChangeCosto(e, articulo.id)}
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
                          handleChangeCostoPedido(e, articulo.id)
                        }
                        className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No hay articulos seleccionados!</p>
          )}

          <div className='flex items-end justify-start'>
            <button
              type='submit'
              className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
            >
              Crear Proveedor
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Proveedores
