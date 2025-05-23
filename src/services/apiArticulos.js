const API_URL = 'http://localhost:8080/articulos'

// Registrar artículo (POST)
export const registrarArticulo = async (datos) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data[0].mensaje || 'Error al registrar el artículo')
    }

    return { data } // Devuelve ArticuloCreadoDTO
  } catch (error) {
    console.error('Error en registrarArticulo:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

// Eliminar artículo (DELETE)
export const eliminarArticulo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) throw new Error('Error al eliminar')
    return true // Éxito
  } catch (error) {
    console.error('Error en eliminarArticulo:', error)
    throw error
  }
}
