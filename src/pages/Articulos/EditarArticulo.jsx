import { useParams } from 'react-router'

const EditarArticulo = () => {
  const { id } = useParams()
  return (
    <div>
      <h1>Editar Articulo</h1>
      <form></form>
    </div>
  )
}

export default EditarArticulo
