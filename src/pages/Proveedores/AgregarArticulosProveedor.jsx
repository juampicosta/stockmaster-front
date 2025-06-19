import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  vincularArticuloProveedor,
  obtenerArticulosAjenos,
} from "../../services/apiProveedores";
import { obtenerTipoModeloInventarios } from "../../services/apiTipoModeloInventario";
import { toast } from "sonner";
import Button from "../../components/Button";

const AgregarArticuloProveedor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tipoModelos, setTipoModelos] = useState([]);
  const [selectedModelo, setSelectedModelo] = useState(null);

  const [articulosDisponibles, setArticulosDisponibles] = useState([]);
  const [codigoSeleccionado, setCodigoSeleccionado] = useState("");
  const [relacion, setRelacion] = useState({
    costoPedido: "",
    demoraEntrega: "",
    precioUnitario: "",
  });
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errorMsg } = await vincularArticuloProveedor(
      codigoSeleccionado, // idArticulo
      id, // idProveedor (desde useParams)
      relacion // datos de la relación
    );
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }
    toast.success("Artículo vinculado correctamente");
    navigate(`/proveedores/detalle/${id}`);
  };

  // Obtener todos los artículos ajenos
  useEffect(() => {
    const fetchArticulos = async () => {
      const { data, errorMsg } = await obtenerArticulosAjenos(id);
      if (errorMsg) {
        toast.error(errorMsg);
        return;
      }
      setArticulosDisponibles(data || []);
      setCodigoSeleccionado("");
      setArticuloSeleccionado(null);
      setRelacion({
        costoPedido: "",
        demoraEntrega: "",
        precioUnitario: "",
      });
    };
    fetchArticulos();
  }, [id]);

  // Cuando seleccionas un artículo, lo guardas y reseteas los inputs
  useEffect(() => {
    if (!codigoSeleccionado) {
      setArticuloSeleccionado(null);
      setRelacion({
        costoPedido: "",
        demoraEntrega: "",
        precioUnitario: "",
      });
      return;
    }
    const articulo = articulosDisponibles.find(
      (a) => String(a.codigo) === String(codigoSeleccionado)
    );
    setArticuloSeleccionado(articulo || null);
    setRelacion({
      costoPedido: "",
      demoraEntrega: "",
      precioUnitario: "",
    });
  }, [codigoSeleccionado, articulosDisponibles]);

  //Traer los tipos de modelo para editar el artículo del proveedor
  useEffect(() => {
    const fetchTipoModelos = async () => {
      const { data, errorMsg } = await obtenerTipoModeloInventarios();
      if (errorMsg) {
        return toast.error(errorMsg);
      }
      setTipoModelos(data);
    };
    fetchTipoModelos();
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-orange-900 mb-8 tracking-tight">
        Añadir Artículo al Proveedor
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-beige p-6 rounded-lg shadow-md"
      >
        {/* Lista desplegable de artículos */}
        <label className="block text-sm font-medium text-orange-800">
          Selecciona un artículo
          <select
            required
            className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400 mt-1"
            value={codigoSeleccionado}
            onChange={(e) => setCodigoSeleccionado(e.target.value)}
          >
            {articulosDisponibles.length === 0 && (
              <option value="">No hay artículos disponibles</option>
            )}
            {articulosDisponibles.length > 0 && (
              <option value="">Selecciona un artículo</option>
            )}
            {articulosDisponibles.map((articulo) => (
              <option key={articulo.codigo} value={articulo.codigo}>
                {articulo.descripcion}
              </option>
            ))}
          </select>
        </label>

        {/* Mostrar datos del artículo seleccionado */}
        {articuloSeleccionado && (
          <div className="mb-2 text-orange-700 font-semibold">
            {articuloSeleccionado.nombre}
          </div>
        )}

        {/* Inputs solo si hay artículo seleccionado */}
        {articuloSeleccionado && (
          <>
            <label className="block text-sm font-medium text-orange-800">
              Costo de pedido
              <input
                required
                type="number"
                name="costoPedido"
                value={relacion.costoPedido}
                onChange={(e) =>
                  setRelacion({ ...relacion, costoPedido: e.target.value })
                }
                className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
              />
            </label>
            <label className="block text-sm font-medium text-orange-800">
              Demora de Entrega (dias)
              <input
                required
                type="number"
                name="demoraEntrega"
                value={relacion.demoraEntrega}
                onChange={(e) =>
                  setRelacion({ ...relacion, demoraEntrega: e.target.value })
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
                value={relacion.precioUnitario}
                onChange={(e) =>
                  setRelacion({ ...relacion, precioUnitario: e.target.value })
                }
                className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
              />
            </label>
            <label className="block text-sm font-medium text-orange-800 w-full">
              Tipo de Modelo
              <select
                value={relacion.idTipoModelo} // <-- Esto selecciona el modelo previamente guardado
                onChange={(e) => {
                  setRelacion({ ...relacion, idTipoModelo: e.target.value });
                  setSelectedModelo(parseInt(e.target.value));
                }}
                required
                name="idTipoModelo"
                className="w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-200"
              >
                <option value="">Seleccionar tipo de modelo</option>
                {tipoModelos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        <div className="flex items-end justify-start">
          <Button type="submit" disabled={!articuloSeleccionado}>
            Guardar
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AgregarArticuloProveedor;
