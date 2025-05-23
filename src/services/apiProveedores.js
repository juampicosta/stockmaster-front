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
