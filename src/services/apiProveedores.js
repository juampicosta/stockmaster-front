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
      throw new Error(data?.mensaje || 'Error al registrar el proveedor')
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
      throw new Error(data?.mensaje || 'Error al obtener los proveedores')
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
      throw new Error(data?.mensaje || 'Error al obtener el proveedor')
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
      throw new Error(data?.mensaje || 'Error al editar el proveedor')
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
    const response = await fetch(`${API_URL}/${id}`, 
    { method: 'DELETE' });
  
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.mensaje || 'Error al eliminar el proveedor')
    }
    return {success: true};
  } catch (error) {
    console.error('Error en eliminarProveedor:', error)
    return { errorMsg: error.message };
  }
}

// Obtener Articulos de un Proveedor por ID (GET)
export const obtenerArticulosProveedor = async (idProveedor) => {
  try {
    const response = await fetch(`${API_URL}/${idProveedor}/articulos`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.mensaje || 'Error al obtener los artículos del proveedor');
    }

    return { data };
  } catch (error) {
    console.error('Error en obtenerArticulosProveedor:', error);
    return { errorMsg: error.message }; // Devuelve un objeto con el mensaje de error
  }
}

// Editar Articulo de un Proveedor (PUT)
export const editArticuloProveedor = async (idProveedor, codigoArticulo, datos) => {
  try {
    const response = await fetch(`${API_URL}/${idProveedor}/articulos/${codigoArticulo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

   
  if (!response.ok) {

      const data = await response.json()
      throw new Error(data?.mensaje || 'Error al editar el artículo del proveedor')
    }

    return {ok: true};
  } catch (error) {
    console.error('Error en editarArticuloProveedor:', error);
    return { errorMsg: error.message }; // Devuelve un objeto con el mensaje de error
  }
}


//Obtener articulos ajenos (PUT)
export const obtenerArticulosAjenos = async (idProveedor) => {
  try {
    const response = await fetch(`${API_URL}/${idProveedor}/articulos-ajenos`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.mensaje || 'Error al obtener los artículos ajenos');
    }

    return { data };
  } catch (error) {
    console.error('Error en obtenerArticulosAjenos:', error);
    return { errorMsg: error.message };
  }
};


//Para agregar un artículo ajeno a un proveedor (PUT)
export const vincularArticuloProveedor = async (idArticulo, idProveedor, datos) => {
  try {
const url = `http://localhost:8080/vincular/${idArticulo}/${idProveedor}`;
    console.log("Enviando a:", url); // <-- Esto te muestra la URL en la consola
    const response = await fetch(url, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data?.mensaje || 'Error al vincular el artículo al proveedor');
    }

    return { ok: true };
  } catch (error) {
    console.error('Error en vincularArticuloProveedor:', error);
    return { errorMsg: error.message };
  }
};