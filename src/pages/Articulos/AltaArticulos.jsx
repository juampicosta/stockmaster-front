import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarArticulo } from '../../services/apiArticulos';
import { obtenerProveedores } from '../../services/apiProveedores';
import { toast } from 'sonner';

const AltaArticulos = () => {
  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate();

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
      const { errorMsg } = await registrarArticulo(payload);

      if (errorMsg) throw new Error(errorMsg);

      toast.success('Artículo creado correctamente');
      e.target.reset();
      document.querySelector('.proveedor-fields').style.display = 'none';
      navigate('/articulos'); // Redirige a la lista
    } catch (error) {
      toast.error(error.message || 'Error al crear el artículo');
    }
  };

  useEffect(() => {
    const fetchProveedores = async () => {
      const { data, errorMsg } = await obtenerProveedores();

      if (errorMsg) {
        return toast.error(errorMsg);
      }

      setProveedores(data); // Directamente el array de proveedores
    };

    fetchProveedores();
  }, []);

  return (
    <section className='min-h-screen p-8'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center gap-4 max-w-2xl mx-auto bg-beige p-8 rounded-lg shadow-md'
      >
        <h1 className='text-2xl font-bold text-orange-800 mb-4 text-center'>
          Alta de Artículos
        </h1>

        {/* Campos del formulario */}
        <label className='block text-sm font-medium text-orange-800 w-full'>
          Descripción
          <input
            type='text'
            name='descripcion'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Demanda del Artículo
          <input
            type='number'
            name='demandaArticulo'
            step='any'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Costo de Almacenamiento
          <input
            type='number'
            name='costoAlmacenamiento'
            step='any'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Stock
          <input
            type='number'
            name='stock'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Proveedor (Opcional)
          <select
            name='proveedorId'
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-200'
            onChange={(e) => {
              document.querySelector('.proveedor-fields').style.display =
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

        <div className='proveedor-fields' style={{ display: 'none' }}>
          <label className='block text-sm font-medium text-orange-800 w-full'>
            Precio Unitario
            <input
              type='number'
              name='precioUnitario'
              step='any'
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </label>

          <label className='block text-sm font-medium text-orange-800 w-full'>
            Costo de Compra
            <input
              type='number'
              name='costoCompra'
              step='any'
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </label>

          <label className='block text-sm font-medium text-orange-800 w-full'>
            Demora de Entrega
            <input
              type='number'
              name='demoraEntrega'
              step='any'
              className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
            />
          </label>
        </div>

        <label className='block text-sm font-medium text-orange-800 w-full'>
          Tipo de Modelo
          <select
            name='tipoModelo'
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
          Crear Artículo
        </button>
      </form>
    </section>
  );
};

export default AltaArticulos;