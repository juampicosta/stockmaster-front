const API_URL = 'http://localhost:8080/orden-compra'

// Registrar orden (POST)
export const registrarOrden = async (datos) => {
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
      throw new Error(data.mensaje || 'Error al registrar la orden')
    }

    return { data }
  } catch (error) {
    console.error('Error en registrarOrden:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

export const obtenerOrdenes = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.mensaje || 'Error al obtener las ordenes')
    }

    return { data }
  } catch (error) {
    console.error('Error en obtenerOrdenes:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

export const sugerirOrdenCompra = async (articuloId) => {
  try {
    const response = await fetch(`${API_URL}/sugerida/${articuloId}`)

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.mensaje || 'Error al sugerir orden de compra')
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error en sugerirOrdenCompra:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

export const obtenerOrden = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`)

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.mensaje || 'Error al obtener la orden')
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error en obtenerOrden:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

export const editarOrden = async (datos, id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.mensaje || 'Error al editar la orden')
    }
    return { data: null }
  } catch (error) {
    console.error('Error en editarOrden:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

export const cancelarOrden = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cancelar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.mensaje || 'Error al cancelar la orden')
    }

    return { data: null }
  } catch (error) {
    console.error('Error en cancelarOrden:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}

export const advanceOrderState = async (id) => {
  try {
    const response = await fetch(`${API_URL}/avanzar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data?.mensaje || 'Error al avanzar el estado de la orden')
    }

    return { data: null }
  } catch (error) {
    console.error('Error en advanceOrderState:', error)
    return { errorMsg: error.message } // Devuelve un objeto con el mensaje de error
  }
}
