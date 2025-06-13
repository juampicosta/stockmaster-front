import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  editProveedor,
  obtenerProveedorPorId,
} from "../../services/apiProveedores";


const EditarProveedor = () => {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState(null);
  const navigate = useNavigate();

  //Dar de alta el nuevo Proveedor
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Llamar al servicio
    const { errorMsg, data } = await editProveedor(id, proveedor);
    if (errorMsg) {
      return toast.error(errorMsg);
    }

    toast.success("Proveedor editado correctamente");
    e.target.reset(); // Reiniciar el formulario
    setProveedor([]); // Reiniciar los articulos seleccionados
    navigate("/proveedores"); // Redirigir a la lista de proveedores
  };

  // Actualizar campos del proveedor
  const handleChangeProveedor = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProveedor((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // Llamar al servicio para obtener el proveedor por ID
  useEffect(() => {
    const fetchProveedor = async () => {
      const { errorMsg, data } = await obtenerProveedorPorId(id);
      if (errorMsg) {
        return toast.error(errorMsg);
      }

      setProveedor({ ...data });
    };
    fetchProveedor();
  }, [id]);

  if (!proveedor) {
    return (
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-orange-900 mb-8 tracking-tight">
          Editar Proveedor
        </h1>
        <p className="text-orange-600">Cargando proveedor...</p>
      </section>
    );
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-orange-900 mb-8 tracking-tight">
        Editar Proveedor
      </h1>

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
            onChange={handleChangeProveedor}
            value={proveedor.email}
            type="email"
            name="email"
            className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-orange-800">
            Razón Social
          </label>
          <input
            onChange={handleChangeProveedor}
            value={proveedor.razonSocial}
            required
            type="text"
            name="razonSocial"
            className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-orange-800">
            Teléfono
          </label>
          <input
            onChange={handleChangeProveedor}
            value={proveedor.telefono}
            required
            type="number"
            name="telefono"
            className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400"
          />
        </div>

        <div className="flex items-end justify-start">
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
          >
            Editar Proveedor
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditarProveedor;
