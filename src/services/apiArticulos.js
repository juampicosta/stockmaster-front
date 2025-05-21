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

    if (!response.ok) throw new Error("Error al registrar");
    return await response.json(); // Devuelve ArticuloCreadoDTO
  } catch (error) {
    console.error("Error en registrarArticulo:", error);
    throw error;
  }
};

// Eliminar artículo (DELETE)
export const eliminarArticulo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar");
    return true; // Éxito
  } catch (error) {
    console.error("Error en eliminarArticulo:", error);
    throw error;
  }
};