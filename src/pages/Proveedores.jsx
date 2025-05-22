import { useEffect, useState } from "react";

const Proveedores = () => {
  //Datos temporales para cargar Articulo en el Alta de Proveedor
  const [articulos] = useState([
    { codigo: 1, nombre: "Articulo 1" },
    { codigo: 2, nombre: "Articulo 2" },
  ]);

  //Datos guardados del proveedor para editarlo luego
  const [proveedor, setProveedor] = useState({
    email: "",
    razonSocial: "",
    telefono: "",
  });

  //Proveedores creados temporales
  const [proveedoresCreados, setProveedoresCreados] = useState([]);

  //Datos de cada Articulo del Proveedor
  const [articuloDatos, setArticuloDatos] = useState([]);

  //Para editar el proveedor
  const [proveedorEditado, setProveedorEditado] = useState(null);

  //Estados de Alerta y Error:
  const [alerta, setAlerta] = useState("");
  const [error, setError] = useState("");

  //Actualizar el estado de los articulos selecciondos
  const handleChange = (e) => {
    e.preventDefault();
    setArticuloDatos((prevState) => [
      ...prevState,
      {
        id: e.target.value,
        nombre: e.target.options[e.target.selectedIndex].text,
        datosArticulo: {
          costoCompra: 0,
          costoPedido: 0,
          demoraEntrega: 0,
          precioUnitario: 0,
        },
      },
    ]);
  };

  //Dar de alta el nuevo Proveedor
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); //Recupero los datos del formulario
    const email = formData.get("email");
    const razonSocial = formData.get("razonSocial");
    const telefono = formData.get("telefono");

    const data = {
      email,
      razonSocial,
      telefono,
      articulos: articuloDatos,
    };

    // Llamar al servicio
    // const {error} = await crearProveedor(data)
    // setError(error)

    if (proveedorEditado !== null) {
      setProveedoresCreados((prev) =>
        prev.map((prov, idx) => (idx === proveedorEditado ? data : prov))
      );
      setProveedorEditado(null); // Salir del modo edición
      setAlerta("Proveedor modificado correctamente");
    } else {
      setProveedoresCreados((prevState) => [...prevState, data]);
      setAlerta("Proveedor creado correctamente");
    }
    setTimeout(() => setAlerta(""), 3000);
    e.target.reset(); // Reiniciar el formulario
    setArticuloDatos([]); // Reiniciar los articulos seleccionados
    setProveedor({
      email: "",
      razonSocial: "", //Reiniciar el proveedor
      telefono: "",
    });
  };

  //Para dar de baja el proveedor
  const handleBorrarProveedor = (index) => {
    setProveedoresCreados((prev) => prev.filter((_, idx) => idx !== index));
    setAlerta("Proveedor borrado correctamente");
    setTimeout(() => setAlerta(""), 3000);
  };

  // Actualizar el costo de compra del articulo
  const handleChangeCosto = (e, id) => {
    e.preventDefault();
    const { value } = e.target;
    const findArticulo = articuloDatos.find((art) => art.id === id);
    if (findArticulo) {
      setArticuloDatos((prevState) =>
        prevState.map((articulo) =>
          articulo.id === id
            ? {
                ...articulo,
                datosArticulo: {
                  ...articulo.datosArticulo,
                  costoCompra: parseFloat(value),
                },
              }
            : articulo
        )
      );
    }
  };

  // Actualizar el costo de compra del articulo
  const handleChangeCostoPedido = (e, id) => {
    e.preventDefault();
    const { value } = e.target;
    const findArticulo = articuloDatos.find((art) => art.id === id);
    if (findArticulo) {
      setArticuloDatos((prevState) =>
        prevState.map((articulo) =>
          articulo.id === id
            ? {
                ...articulo,
                datosArticulo: {
                  ...articulo.datosArticulo,
                  costoPedido: parseFloat(value),
                },
              }
            : articulo
        )
      );
    }
  };

  // Actualizar la demora de entrega del articulo
  const handleChangeDemoraEntrega = (e, id) => {
    e.preventDefault();
    const { value } = e.target;
    const findArticulo = articuloDatos.find((art) => art.id === id);
    if (findArticulo) {
      setArticuloDatos((prevState) =>
        prevState.map((articulo) =>
          articulo.id === id
            ? {
                ...articulo,
                datosArticulo: {
                  ...articulo.datosArticulo,
                  demoraEntrega: parseFloat(value),
                },
              }
            : articulo
        )
      );
    }
  };

  // Actualizar el precio unitario del articulo
  const handleChangePrecioUnitario = (e, id) => {
    e.preventDefault();
    const { value } = e.target;
    const findArticulo = articuloDatos.find((art) => art.id === id);
    if (findArticulo) {
      setArticuloDatos((prevState) =>
        prevState.map((articulo) =>
          articulo.id === id
            ? {
                ...articulo,
                datosArticulo: {
                  ...articulo.datosArticulo,
                  precioUnitario: parseFloat(value),
                },
              }
            : articulo
        )
      );
    }
  };

  console.log(articuloDatos);

  //Efecto para cargar los datos del proveedor a editar
  useEffect(() => {
    if (proveedorEditado !== null) {
      const prov = proveedoresCreados[proveedorEditado];
      setArticuloDatos(prov.articulos);
      setProveedor({
        email: prov.email,
        razonSocial: prov.razonSocial,
        telefono: prov.telefono,
      });
    }
  }, [proveedorEditado, proveedoresCreados]);

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
          <div>
            <label className="block text-sm font-medium text-orange-800">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={proveedor.email}
              onChange={(e) =>
                setProveedor({ ...proveedor, email: e.target.value })
              }
              className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-800">
              Razón Social
            </label>
            <input
              required
              type="text"
              name="razonSocial"
              value={proveedor.razonSocial}
              onChange={(e) =>
                setProveedor({ ...proveedor, razonSocial: e.target.value })
              }
              className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-800">
              Teléfono
            </label>
            <input
              required
              type="number"
              name="telefono"
              value={proveedor.telefono}
              onChange={(e) =>
                setProveedor({ ...proveedor, telefono: e.target.value })
              }
              className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-800">
              Articulo
            </label>
            <select
              required={proveedorEditado === null}
              name="articuloId"
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
          {articuloDatos.length > 0 ? (
            <div className="col-span-full">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">
                Articulos Seleccionados
              </h3>
              <ul className="list-disc pl-5">
                {articuloDatos.map((articulo) => (
                  <li key={articulo.id} className="text-sm text-marron">
                    {articulo.nombre}
                    <label className="block text-sm font-medium text-orange-800">
                      Costo de compra
                      <input
                        required
                        type="number"
                        name="costoCompra"
                        value={articulo.datosArticulo.costoCompra}
                        onChange={(e) => handleChangeCosto(e, articulo.id)}
                        className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
                      />
                    </label>
                    <label className="block text-sm font-medium text-orange-800">
                      Costo de pedido
                      <input
                        required
                        type="number"
                        name="costoPedido"
                        value={articulo.datosArticulo.costoPedido}
                        onChange={(e) =>
                          handleChangeCostoPedido(e, articulo.id)
                        }
                        className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
                      />
                    </label>
                    <label className="block text-sm font-medium text-orange-800">
                      Demora de Entrega
                      <input
                        required
                        type="number"
                        name="demoraEntrega"
                        value={articulo.datosArticulo.demoraEntrega}
                        onChange={(e) =>
                          handleChangeDemoraEntrega(e, articulo.id)
                        }
                        className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
                      />
                    </label>
                    <label className="block text-sm font-medium text-orange-800">
                      Precio Unitario
                      <input
                        required
                        type="number"
                        name="precioUnitario"
                        value={articulo.datosArticulo.precioUnitario}
                        onChange={(e) =>
                          handleChangePrecioUnitario(e, articulo.id)
                        }
                        className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No hay articulos seleccionados!</p>
          )}

          <div className="flex items-end justify-start">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
            >
              {proveedorEditado !== null
                ? "Modificar Proveedor"
                : "Crear Proveedor"}
            </button>
          </div>
        </form>

        {/* Proveedores Creados */}

        <section className="mt-10"></section>
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-orange-800 mb-4">
            Proveedores creados
          </h2>
          {proveedoresCreados.length === 0 ? (
            <p className="text-gray-500">Aún no hay proveedores creados.</p>
          ) : (
            <ul className="space-y-4">
              {proveedoresCreados.map((prov, idx) => (
                <li
                  key={idx}
                  className="'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded"
                >
                  <div>
                    <p>
                      <strong>Email:</strong> {prov.email}
                    </p>
                    <p>
                      <strong>Razón Social:</strong> {prov.razonSocial}
                    </p>
                    <p>
                      <strong>Teléfono:</strong> {prov.telefono}
                    </p>
                  </div>
                  <div>
                    <strong>Artículos:</strong>
                    <ul className="list-disc pl-5">
                      {prov.articulos.map((art, i) => (
                        <li key={i}>
                          {art.nombre} (Costo: {art.datosArticulo.costoCompra},
                          Pedido: {art.datosArticulo.costoPedido}, Demora:{" "}
                          {art.datosArticulo.demoraEntrega}, Precio:{" "}
                          {art.datosArticulo.precioUnitario})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="ml-2 text-blue-600 hover:underline"
                    onClick={() => setProveedorEditado(idx)}
                  >
                    Editar
                  </button>
                  <button
                    className="ml-2 text-red-600 hover:underline"
                    onClick={() => handleBorrarProveedor(idx)}
                  >
                    Borrar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </div>
  );
};

export default Proveedores;
