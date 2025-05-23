import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner'

const EditarProveedor = () => {
  const { id } = useParams()
  // Datos temporales para cargar Proveedor, esto hay que traerlo de la API
  const [proveedor, setProveedor] = useState({
    id,
    email: 'proveedor@example.com',
    razonSocial: 'Proveedor S.A.',
    telefono: '123456789',
    articulos: [
      {
        id: 1,
        nombre: 'Articulo 1',
        costoCompra: 100,
        costoPedido: 150,
        demoraEntrega: 5,
        precioUnitario: 200
      }
    ]
  })

  //Datos temporales para Articulos, esto hay que traerlo de la API
  const [articulos, setArticulos] = useState([
    { id: 1, nombre: 'Articulo 1' },
    { id: 2, nombre: 'Articulo 2' }
  ])

  // Actualizar cualquier campo de un articulo del proveedor
  const handleChangeArticulo = (e, id) => {
    e.preventDefault()
    const { value, name } = e.target

    setProveedor((prevState) => {
      return {
        ...prevState,
        articulos: prevState.articulos.map((articulo) =>
          articulo.id === id
            ? {
                ...articulo,
                [name]: parseFloat(value)
              }
            : articulo
        )
      }
    })
  }

  // Eliminar un articulo del proveedor
  const handleDeleteArticulo = (e, id) => {
    e.preventDefault()
    setProveedor((prevState) => {
      return {
        ...prevState,
        articulos: prevState.articulos.filter((articulo) => articulo.id !== id)
      }
    })
  }

  //Dar de alta el nuevo Proveedor
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Llamar al servicio
    /* const { errorMsg, data } = await editarProveedor(proveedor)
    if (errorMsg) {
      return toast.error(errorMsg)
    } */

    toast.success('Proveedor editado correctamente')
    e.target.reset() // Reiniciar el formulario
    setProveedor([]) // Reiniciar los articulos seleccionados
  }

  //Actualizar el estado de los articulos del proveedor
  const handleChangeSelect = (e) => {
    e.preventDefault()
    const { value } = e.target

    if (!value) return toast.warning('Seleccione un articulo')

    const alreadyExists = proveedor.articulos.some(
      (articulo) => articulo.id === parseInt(value)
    )
    if (alreadyExists) {
      return toast.warning('Articulo ya añadido en la lista')
    }

    setProveedor((prevState) => {
      return {
        ...prevState,
        articulos: [
          ...prevState.articulos,
          {
            id: value,
            nombre: e.target.options[e.target.selectedIndex].text,
            costoCompra: 0,
            costoPedido: 0,
            demoraEntrega: 0,
            precioUnitario: 0
          }
        ]
      }
    })
  }

  // Actualizar campos del proveedor
  const handleChangeProveedor = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setProveedor((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  return (
    <section className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold text-orange-800 mb-4'>
        Editar Proveedor
      </h2>

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
            onChange={handleChangeProveedor}
            value={proveedor.email}
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
            onChange={handleChangeProveedor}
            value={proveedor.razonSocial}
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
            onChange={handleChangeProveedor}
            value={proveedor.telefono}
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
            onChange={(e) => handleChangeSelect(e)}
            required
            name='articuloId'
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200'
          >
            <option value=''>Seleccionar articulo</option>
            {articulos.map((art) => (
              <option key={art.id} value={art.id}>
                {art.nombre}
              </option>
            ))}
          </select>
        </div>
        {proveedor.articulos && proveedor.articulos.length > 0 ? (
          <div className='col-span-full'>
            <h3 className='text-lg font-semibold text-orange-800 mb-2'>
              Articulos Seleccionados
            </h3>
            <ul className='list-disc pl-5'>
              {proveedor.articulos.map((articulo) => (
                <li key={articulo.id} className='text-sm text-marron'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='font-bold'> {articulo.nombre}</span>
                    <button
                      onClick={(e) => handleDeleteArticulo(e, articulo.id)}
                      className='bg-red-500 text-white p-1 rounded-md hover:bg-red-600'
                    >
                      Eliminar
                    </button>
                  </div>
                  <label className='block text-sm font-medium text-orange-800'>
                    Costo de compra
                    <input
                      required
                      type='number'
                      name='costoCompra'
                      value={articulo.costoCompra}
                      onChange={(e) => handleChangeArticulo(e, articulo.id)}
                      className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
                    />
                  </label>
                  <label className='block text-sm font-medium text-orange-800'>
                    Costo de pedido
                    <input
                      required
                      type='number'
                      name='costoPedido'
                      value={articulo.costoPedido}
                      onChange={(e) => handleChangeArticulo(e, articulo.id)}
                      className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
                    />
                  </label>
                  <label className='block text-sm font-medium text-orange-800'>
                    Demora de Entrega
                    <input
                      required
                      type='number'
                      name='demoraEntrega'
                      value={articulo.demoraEntrega}
                      onChange={(e) => handleChangeArticulo(e, articulo.id)}
                      className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
                    />
                  </label>
                  <label className='block text-sm font-medium text-orange-800'>
                    Precio Unitario
                    <input
                      required
                      type='number'
                      name='precioUnitario'
                      value={articulo.precioUnitario}
                      onChange={(e) => handleChangeArticulo(e, articulo.id)}
                      className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className='text-orange-500'>No hay articulos seleccionados!</p>
        )}

        <div className='flex items-end justify-start'>
          <button
            type='submit'
            className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
          >
            Editar Proveedor
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditarProveedor
