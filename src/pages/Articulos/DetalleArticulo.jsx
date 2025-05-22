import { useParams } from 'react-router'

const DetalleArticulo = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>Detalle Articulo</h1>
      <p>Todos los campos y proveedores asociados.</p>
    </div>
  )
}

export default DetalleArticulo
