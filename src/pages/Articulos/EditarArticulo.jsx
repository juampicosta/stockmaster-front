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
      try {
        const [{ data: articuloData, errorMsg: errorArticulo }, { data: proveedoresData, errorMsg: errorProveedores }] = await Promise.all([
          obtenerArticuloPorId(id),
          obtenerProveedores(),
        ]);

        if (errorArticulo) {
          toast.error(errorArticulo);
          return;
        }

        if (errorProveedores) {
          toast.error(errorProveedores);
          return;
        }

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
      } catch (error) {
        toast.error(`Error al cargar los datos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticulo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !articulo.descripcion ||
      isNaN(parseFloat(articulo.demandaArticulo)) ||
      isNaN(parseFloat(articulo.costoAlmacenamiento)) ||
      isNaN(parseInt(articulo.stock)) ||
      !articulo.tipoModelo
    ) {
      return toast.error('Los campos obligatorios no pueden estar vacíos o deben ser números válidos');
    }

    const demanda = parseFloat(articulo.demandaArticulo);
    const costo = parseFloat(articulo.costoAlmacenamiento);
    const stock = parseInt(articulo.stock);

    if (demanda <= 0 || costo <= 0 || stock < 0) {
      return toast.error('Los valores numéricos deben ser mayores a cero.');
    }

    // Construir payload
    const payload = {
      articuloDTO: {
        descripcion: articulo.descripcion,
        demandaArticulo: demanda,
        costoAlmacenamiento: costo,
        stock: stock,
      },
      tipoModelo: articulo.tipoModelo,
    };

    if (articulo.proveedorId) {
      payload.idProveedor = parseInt(articulo.proveedorId, 10);

      if (!articulo.precioUnitario || !articulo.costoCompra || !articulo.demoraEntrega) {
        return toast.error('Cuando seleccionas un proveedor, debes completar todos sus campos.');
      }

      payload.articuloProveedorDTO = {
        precioUnitario: parseFloat(articulo.precioUnitario),
        costoCompra: parseFloat(articulo.costoCompra),
        demoraEntrega: parseFloat(articulo.demoraEntrega),
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
            value={articulo.descripcion}
            onChange={handleInputChange}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Demanda del Artículo
          <input
            type='number'
            name='demandaArticulo'
            step='any'
            value={articulo.demandaArticulo}
            onChange={handleInputChange}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Costo de Almacenamiento
          <input
            type='number'
            name='costoAlmacenamiento'
            step='any'
            value={articulo.costoAlmacenamiento}
            onChange={handleInputChange}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Stock
          <input
            type='number'
            name='stock'
            value={articulo.stock}
            onChange={handleInputChange}
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Proveedor (Opcional)
          <select
            name='proveedorId'
            value={articulo.proveedorId}
            onChange={(e) => {
              handleInputChange(e);
              const proveedorFields = document.querySelector('.proveedor-fields-edit');
              if (proveedorFields) {
                proveedorFields.style.display = e.target.value ? 'block' : 'none';
              }
            }}
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-200'
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
          className='proveedor-fields-edit w-full'
          style={{ display: articulo.proveedorId ? 'block' : 'none' }}
        >
          <label className='block text-sm font-medium text-orange-800 w-full mb-2'>
            Precio Unitario
            <input
              type='number'
              name='precioUnitario'
              step='any'
              value={articulo.precioUnitario}
              onChange={handleInputChange}
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </label>

          <label className='block text-sm font-medium text-orange-800 w-full mb-2'>
            Costo de Compra
            <input
              type='number'
              name='costoCompra'
              step='any'
              value={articulo.costoCompra}
              onChange={handleInputChange}
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </label>

          <label className='block text-sm font-medium text-orange-800 w-full mb-2'>
            Demora de Entrega
            <input
              type='number'
              name='demoraEntrega'
              step='any'
              value={articulo.demoraEntrega}
              onChange={handleInputChange}
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </label>
        </div>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Tipo de Modelo
          <select
            name='tipoModelo'
            value={articulo.tipoModelo}
            onChange={handleInputChange}
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