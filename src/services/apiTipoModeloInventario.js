const API_URL = 'http://localhost:8080/modelos'

export const obtenerTipoModeloInventarios = async () => {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message ||
          'Error al obtener los tipos de modelo de inventario'
      )
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error en obtenerTipoModeloInventario:', error)
    return { errorMsg: error.message }
  }
}
