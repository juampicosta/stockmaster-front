const API_URL = "http://localhost:8080/articulos";

// Registrar artículo (POST)
export const registrarArticulo = async (datos) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data[0]?.mensaje || "Error al registrar el artículo");
    }

    return { data }; // Devuelve ArticuloCreadoDTO
  } catch (error) {
    console.error("Error en registrarArticulo:", error);
    return { errorMsg: error.message };
  }
};

// Eliminar artículo (DELETE)
export const eliminarArticulo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData[0]?.mensaje || "Error al eliminar el artículo");
    }

    return { success: true };
  } catch (error) {
    console.error("Error en eliminarArticulo:", error);
    return { errorMsg: error.message };
  }
};

// Obtener todos los artículos (GET)
export const obtenerArticulos = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData[0]?.mensaje || "Error al obtener los artículos");
    }

    const data = await response.json();
    return { data }; // Ahora es un array plano
  } catch (error) {
    console.error("Error en obtenerArticulos:", error);
    return { errorMsg: error.message };
  }
};