import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner'
import { obtenerArticulos } from '../../services/apiArticulos'
import {
  editProveedor,
  obtenerProveedorPorId,
  obtenerArticulosProveedor
} from '../../services/apiProveedores'

const EditarProveedor = () => {
  const { id } = useParams()
  const [proveedor, setProveedor] = useState(null)

  // Actualizar cualquier campo de un articulo del proveedor
  const handleChangeArticulo = (e, codigo) => {
    e.preventDefault()
    const { value, name } = e.target

    setProveedor((prevState) => {
      return {
        ...prevState,
        articulos: prevState.articulos.map((articulo) =>
          articulo.codigo === codigo
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
  const handleDeleteArticulo = (e, codigo) => {
    e.preventDefault()
    setProveedor((prevState) => {
      return {
        ...prevState,
        articulos: prevState.articulos.filter(
          (articulo) => articulo.codigo !== codigo
        )
      }
    })
  }

  //Dar de alta el nuevo Proveedor
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Llamar al servicio
    const { errorMsg, data } = await editProveedor(id, proveedor)
    if (errorMsg) {
      return toast.error(errorMsg)
    }

    toast.success('Proveedor editado correctamente')
    e.target.reset() // Reiniciar el formulario
    setProveedor([]) // Reiniciar los articulos seleccionados
  }

  //Actualizar el estado de los articulos del proveedor
  const handleChangeSelect = (e) => {
    e.preventDefault()
    const { value } = e.target

    if (!value) return toast.warning('Seleccione un articulo')

    const alreadyExists = (proveedor.articulos ?? []).some(
      (articulo) => articulo.codigo === parseInt(value)
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
            codigo: value,
            descripcion: e.target.options[e.target.selectedIndex].text,
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

  // Llamar al servicio para obtener articulos
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

  // Llamar al servicio para obtener el proveedor por ID
  const [articulos, setArticulos] = useState([])
  useEffect(() => {
    const fetchProveedor = async () => {
      const { errorMsg, data } = await obtenerProveedorPorId(id)
      if (errorMsg) {
        return toast.error(errorMsg)
      }

      setProveedor({
        ...data,
        articulos: Array.isArray(data.articulos) ? data.articulos : []
      })
    }
    fetchProveedor()
  }, [id])

  // Llamar al servicio para obtener Articulos de un proveedor por ID
  const [articulosProv, setArticulosProv] = useState([])
  useEffect(() => {
    const fetchArticulosProv = async () => {
      const { data, errorMsg } = await obtenerArticulosProveedor(id)
      console.log(data)

      if (errorMsg) return toast.error(errorMsg)
      setArticulosProv(data) // Array dentro del objeto de Articulos (ArticuloProveedor)
    }
    fetchArticulosProv()
  }, [id])

  if (!proveedor) {
    return (
      <section className='bg-white p-6 rounded-lg shadow-md'>
        <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
          Editar Proveedor
        </h1>
        <p className='text-orange-600'>Cargando proveedor...</p>
      </section>
    )
  }

  return (
    <section className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Editar Proveedor
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
              <option key={art.codigo} value={art.codigo}>
                {art.descripcion}
              </option>
            ))}
          </select>
        </div>
        {articulosProv && articulosProv.length > 0 ? (
          <div className='col-span-full'>
            <h3 className='text-lg font-semibold text-orange-800 mb-2'>
              Articulos Seleccionados
            </h3>
            <ul className='list-disc pl-5 space-y-3'>
              {articulosProv.map((articulo) => {
                const proveedorIntermedia = articulo.articuloProveedores.find(
                  (prov) => prov.proveedor.id === parseInt(id)
                )
                return (
                  <li key={articulo.codigo} className='text-sm text-marron'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='font-bold'>
                        {articulo.descripcion} (Código: {articulo.codigo})
                      </span>
                      <button
                        onClick={(e) =>
                          handleDeleteArticulo(e, articulo.codigo)
                        }
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
                        value={proveedorIntermedia.costoCompra}
                        onChange={(e) =>
                          handleChangeArticulo(e, articulo.codigo)
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
                        value={proveedorIntermedia.costoPedido}
                        onChange={(e) =>
                          handleChangeArticulo(e, articulo.codigo)
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
                        value={proveedorIntermedia.demoraEntrega}
                        onChange={(e) =>
                          handleChangeArticulo(e, articulo.codigo)
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
                        value={proveedorIntermedia.preciounitario}
                        onChange={(e) =>
                          handleChangeArticulo(e, articulo.codigo)
                        }
                        className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
                      />
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <p className='col-span-full text-orange-500'>
            No hay articulos seleccionados!
          </p>
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
