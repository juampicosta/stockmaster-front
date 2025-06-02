import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  obtenerArticuloPorId,
  obtenerProveedores,
  actualizarArticulo,
} from '../../services/apiArticulos';
import { toast } from 'sonner';

const EditarArticulo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [articulo, setArticulo] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar artículo y proveedores al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      const [{ data: articuloData }, { data: proveedoresData }] = await Promise.all([
        obtenerArticuloPorId(id),
        obtenerProveedores(),
      ]);

      if (articuloData) {
        setArticulo({
          descripcion: articuloData.descripcion,
          demandaArticulo: articuloData.demandaArticulo,
          costoAlmacenamiento: articuloData.costoAlmacenamiento,
          stock: articuloData.stock,
          tipoModelo: articuloData.tipoModelo,
          proveedorId: articuloData.provPredeterminado?.id || '',
          precioUnitario: articuloData.articuloProveedores?.[0]?.precioUnitario || '',
          costoCompra: articuloData.articuloProveedores?.[0]?.costoCompra || '',
          demoraEntrega: articuloData.articuloProveedores?.[0]?.demoraEntrega || '',
        });
      }

      if (proveedoresData) {
        setProveedores(proveedoresData);
      }

      setLoading(false);
    };

    cargarDatos();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Convertir tipos
    data.demandaArticulo = parseFloat(data.demandaArticulo);
    data.costoAlmacenamiento = parseFloat(data.costoAlmacenamiento);
    data.stock = parseInt(data.stock, 10);

    // Validaciones básicas
    if (
      !data.descripcion ||
      isNaN(data.demandaArticulo) ||
      isNaN(data.costoAlmacenamiento) ||
      isNaN(data.stock) ||
      !data.tipoModelo
    ) {
      return toast.error('Los campos obligatorios no pueden estar vacíos o deben ser números válidos');
    }

    if (data.demandaArticulo <= 0 || data.costoAlmacenamiento <= 0 || data.stock < 0) {
      return toast.error('Los valores numéricos deben ser mayores a cero.');
    }

    // Construir payload
    const payload = {
      articuloDTO: {
        descripcion: data.descripcion,
        demandaArticulo: data.demandaArticulo,
        costoAlmacenamiento: data.costoAlmacenamiento,
        stock: data.stock,
      },
      tipoModelo: data.tipoModelo,
    };

    if (data.proveedorId) {
      payload.idProveedor = parseInt(data.proveedorId, 10);

      if (!data.precioUnitario || !data.costoCompra || !data.demoraEntrega) {
        return toast.error('Cuando seleccionas un proveedor, debes completar todos sus campos.');
      }

      payload.articuloProveedorDTO = {
        precioUnitario: parseFloat(data.precioUnitario),
        costoCompra: parseFloat(data.costoCompra),
        demoraEntrega: parseFloat(data.demoraEntrega),
      };
    }

    try {
      const { errorMsg } = await actualizarArticulo(id, payload);

      if (errorMsg) throw new Error(errorMsg);

      toast.success('Artículo actualizado correctamente');
      navigate('/articulos'); // Redirige al listado
    } catch (error) {
      toast.error(error.message || 'Error al actualizar el artículo');
    }
  };

  if (loading || !articulo) return <p>Cargando datos...</p>;

  return (
    <section className='min-h-screen p-8'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center gap-4 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md'
      >
        <h1 className='text-2xl font-bold text-orange-800 mb-4 text-center'>
          Editar Artículo
        </h1>

        {/* Campos del formulario */}
        <label className='block text-sm font-medium text-orange-800 w-full'>
          Descripción
          <input
            type='text'
            name='descripcion'
            defaultValue={articulo.descripcion}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Demanda del Artículo
          <input
            type='number'
            name='demandaArticulo'
            step='any'
            defaultValue={articulo.demandaArticulo}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Costo de Almacenamiento
          <input
            type='number'
            name='costoAlmacenamiento'
            step='any'
            defaultValue={articulo.costoAlmacenamiento}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Stock
          <input
            type='number'
            name='stock'
            defaultValue={articulo.stock}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Proveedor (Opcional)
          <select
            name='proveedorId'
            defaultValue={articulo.proveedorId}
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-200'
            onChange={(e) => {
              document.querySelector('.proveedor-fields-edit').style.display =
                e.target.value ? 'block' : 'none';
            }}
          >
            <option value=''>Seleccionar proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.razonSocial}
              </option>
            ))}
          </select>
        </label>

        <div
          className='proveedor-fields-edit'
          style={{ display: articulo.proveedorId ? 'block' : 'none' }}
        >
          <label className='block text-sm font-medium text-orange-800 w-full'>
            Precio Unitario
            <input
              type='number'
              name='precioUnitario'
              step='any'
              defaultValue={articulo.precioUnitario}
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </label>

          <label className='block text-sm font-medium text-orange-800 w-full'>
            Costo de Compra
            <input
              type='number'
              name='costoCompra'
              step='any'
              defaultValue={articulo.costoCompra}
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </label>

          <label className='block text-sm font-medium text-orange-800 w-full'>
            Demora de Entrega
            <input
              type='number'
              name='demoraEntrega'
              step='any'
              defaultValue={articulo.demoraEntrega}
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </label>
        </div>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Tipo de Modelo
          <select
            name='tipoModelo'
            defaultValue={articulo.tipoModelo}
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-200'
          >
            <option value=''>Seleccionar tipo de modelo</option>
            <option value='Intervalo Lote Fijo'>Intervalo Lote Fijo</option>
            <option value='Otro'>Otro</option>
          </select>
        </label>

        <button
          type='submit'
          className='w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200'
        >
          Guardar Cambios
        </button>
      </form>
    </section>
  );
};

export default EditarArticulo;
//NO se Guardan los cambios