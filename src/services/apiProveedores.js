const API_URL = 'http://localhost:8080/proveedores'

// Registrar proveedor (POST)
export const registrarProveedor = async (datos) => {
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
      throw new Error(data[0].mensaje || 'Error al registrar el proveedor')
    }

    return { data }
  } catch (error) {
    console.error('Error en registrarProveedor:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}


//Obtener todos los proveedores (GET)
export const obtenerProveedores = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data[0].mensaje || 'Error al obtener los proveedores')
    }

    return { data }
  } catch (error) {
    console.error('Error en obtenerProveedores:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

//Obtener proveedor por ID (GET)
export const obtenerProveedorPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data[0].mensaje || 'Error al obtener el proveedor')
    }

    return { data }
  } catch (error) {
    console.error('Error en obtenerProveedorPorId:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

//Editar proveedor (PUT)
export const editProveedor = async (id, datos) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data[0].mensaje || 'Error al editar el proveedor')
    }

    return { data }
  } catch (error) {
    console.error('Error en editarProveedor:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

//Eliminar proveedor (DELETE)
export const eliminarProveedor = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data[0].mensaje || 'Error al eliminar el proveedor')
    }

    return { data: null }
  } catch (error) {
    console.error('Error en eliminarProveedor:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}