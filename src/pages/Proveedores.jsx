import React, { useState } from "react";

const Proveedores = () => {
  //Estado inicial del Formulario
  const [proveedor, setProv] = useState({
    id: "",
    email: "",
    razonSocial: "",
    telefono: "",
    articuloId: "",
  });

  //Datos temporales para cargar Articulo en el Alta de Proveedor
  const [articulos] = useState([
    { codigo: 1, nombre: "Articulo 1" },
    { codigo: 2, nombre: "Articulo 2" },
  ]);

  const [articuloDatos, setArticuloDatos] = useState([]);

  //Estados de Alerta y Error:
  const [alerta, setAlerta] = useState("");
  const [error, setError] = useState("");

  //Actualizar el estado del Proveedor cuando lleno los campos
  const handleChange = (e) => {
    setProv({ ...proveedor, [e.target.name]: e.target.value });
    
  };

  //Dar de alta el nuevo Proveedor
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, razonSocial, telefono, articuloId } = proveedor; //Extraigo los campos del objeto de Proveedor

    if (!email || !razonSocial || !telefono || !articuloId) {
      //Más fácil en vez de usar proveedor.email, etc.
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    setAlerta("Proveedor creado correctamente");
    setTimeout(() => setAlerta(""), 3000);

    setProv({
      id: "",
      email: "",
      razonSocial: "",
      telefono: "",
      articuloId: "",
    });
  };

  return (
    <div className="bg-white min-h-screen p-8">
      {/* Alerta temporal */}
      {alerta && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-6 py-3 rounded-lg shadow-md z-50 animate-bounce">
          {alerta}
        </div>
      )}

      <h1 className="text-3xl font-bold text-orange-900 mb-6">
        Gestión de Proveedores
      </h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-orange-800 mb-4">
          Nuevo Proveedor
        </h2>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-beige p-6 rounded-lg shadow-md"
        >
          {/* Error de campo/s vacío/s */}
          {error && (
            <div className="col-span-full text-red-600 font-medium">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-orange-800">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={proveedor.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-800">
              Razón Social
            </label>
            <input
              type="text"
              name="razonSocial"
              value={proveedor.razonSocial}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-800">
              Teléfono
            </label>
            <input
              type="number"
              name="telefono"
              value={proveedor.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-800">
              Articulo
            </label>
            <select
              name="articuloId"
              value={proveedor.articuloId}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200"
            >
              <option value="">Seleccionar articulo</option>
              {articulos.map((art) => (
                <option key={art.codigo} value={art.codigo}>
                  {art.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end justify-start">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
            >
              Crear Proveedor
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Proveedores;
