const API_URL = 'http://localhost:8080/articulos'

// Obtener artículos con filtro opcional
export const obtenerArticulos = async (tieneProveedor) => {
  let url = API_URL

  if (tieneProveedor) {
    url += `?predeterminado=${tieneProveedor}`
  }

  try {
    const response = await fetch(url)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.mensaje || 'Error al obtener los artículos')
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error en obtenerArticulos:', error)
    return { errorMsg: error.message }
  }
}

// Registrar artículo
export const registrarArticulo = async (datos) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.mensaje || 'Error al registrar el artículo')
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error en registrarArticulo:', error)
    return { errorMsg: error.message }
  }
}

// Eliminar artículo
export const eliminarArticulo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.mensaje || 'Error al eliminar el artículo')
    }

    return { success: true }
  } catch (error) {
    console.error('Error en eliminarArticulo:', error)
    return { errorMsg: error.message }
  }
}

// Obtener proveedores
export const obtenerProveedores = async () => {
  const PROVEEDORES_URL = 'http://localhost:8080/proveedores'

  try {
    const response = await fetch(PROVEEDORES_URL)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.mensaje || 'Error al obtener proveedores')
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error en obtenerProveedores:', error)
    return { errorMsg: error.message }
  }
}

// Obtener artículo por ID
export const obtenerArticuloPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error al obtener el artículo con ID ${id}`
      )
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error en obtenerArticuloPorId:', error)
    return { errorMsg: error.message }
  }
}
// Actualizar artículo
export const actualizarArticulo = async (id, datos) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error al actualizar el artículo con ID ${id}`
      )
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error en actualizarArticulo:', error)
    return { errorMsg: error.message }
  }
}
