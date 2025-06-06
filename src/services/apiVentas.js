const API_URL = 'http://localhost:8080/venta'

// Registrar venta (POST)
export const registrarVenta = async (datos) => {
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
      throw new Error(data.mensaje || 'Error al registrar la venta')
    }

    return { data }
  } catch (error) {
    console.error('Error en registrarVenta:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

//Obtener todas las ventas (GET)
export const obtenerVentas = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.mensaje || 'Error al obtener las ventas')
    }

    return { data }
  } catch (error) {
    console.error('Error en obtenerVentas:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

//Obtener venta por ID (GET)
export const obtenerVentaPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.mensaje || 'Error al obtener la venta')
    }

    return { data }
  } catch (error) {
    console.error('Error en obtenerVentaPorId:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}
