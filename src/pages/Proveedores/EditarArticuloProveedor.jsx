import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  editArticuloProveedor,
  obtenerArticulosProveedor,
} from "../../services/apiProveedores";
import { toast } from "sonner";

const EditarArticuloProveedor = () => {
  const { id, codigo } = useParams();
  const navigate = useNavigate();
  //Dar de alta el nuevo articulo del proveedor
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Llamar al servicio con los datos de la relación
    const { errorMsg } = await editArticuloProveedor(id, codigo, relacion);
    if (errorMsg) {
      return toast.error(errorMsg);
    }

    toast.success("Artículo del proveedor editado correctamente");
    navigate(`/proveedores/detalle/${id}`);
  };



  //Actualizar el articulo del proveedor
  const [relacion, setRelacion] = useState(null);
  useEffect(() => {
    const fetchRelacion = async () => {
      const { data, errorMsg } = await obtenerArticulosProveedor(id);
      if (errorMsg) {
        toast.error(errorMsg);
        return;
      }
      // Buscar el artículo correcto por código
      const articulo = data.find((a) => String(a.codigo) === String(codigo));
      if (!articulo) {
        toast.error("No se encontró el artículo para este proveedor");
        return;
      }
      // Extraer los datos de la relación (puede variar según tu backend)
      const datosRelacion = Array.isArray(articulo.articuloProveedores)
        ? articulo.articuloProveedores.find(rel => String(rel.proveedor.id) === String(id))
        : articulo.articuloProveedores;

      setRelacion({
        costoCompra: datosRelacion?.costoCompra ?? "",
        costoPedido: datosRelacion?.costoPedido ?? "",
        demoraEntrega: datosRelacion?.demoraEntrega ?? "",
        precioUnitario: datosRelacion?.preciounitario ?? "",
      });
    };
    fetchRelacion();
  }, [id, codigo]);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-orange-900 mb-8 tracking-tight">
        Editar Articulo del Proveedor
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-beige p-6 rounded-lg shadow-md"
      >
        {relacion ? (
          <>
            <label className="block text-sm font-medium text-orange-800">
              Costo de compra
              <input
                required
                type="number"
                name="costoCompra"
                value={relacion.costoCompra}
                onChange={(e) =>
                  setRelacion({ ...relacion, costoCompra: e.target.value })
                }
                className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
              />
            </label>
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
              Demora de Entrega
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
          </>
        ) : (
          <p className="col-span-full text-orange-500">
            No se encontró la relación con el artículo seleccionado.
          </p>
        )}

        <div className="flex items-end justify-start">
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
          >
            Editar Articulo
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditarArticuloProveedor;
