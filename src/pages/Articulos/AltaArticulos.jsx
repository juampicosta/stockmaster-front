import { useEffect, useState } from 'react';
import { registrarArticulo } from '../../services/apiArticulos';
import { toast } from 'sonner';
import { obtenerProveedores } from '../../services/apiProveedores';


const AltaArticulos = () => {
  const [proveedores, setProveedores] = useState([]);
  const [articulos, setArticulos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Convertir tipos numéricos
    data.demandaArticulo = parseFloat(data.demandaArticulo);
    data.costoAlmacenamiento = parseFloat(data.costoAlmacenamiento);
    data.stock = parseInt(data.stock, 10);

    console.log('Datos del formulario:', data); // Para depuración

    // Validar campos obligatorios
    if (
      !data.descripcion ||
      isNaN(data.demandaArticulo) ||
      isNaN(data.costoAlmacenamiento) ||
      isNaN(data.stock) ||
      !data.tipoModelo
    ) {
      return toast.error(
        'Los campos obligatorios no pueden estar vacíos o deben ser números válidos'
      );
    }

    // Construir articuloDTO
    const articuloDTO = {
      descripcion: data.descripcion,
      demandaArticulo: data.demandaArticulo,
      costoAlmacenamiento: data.costoAlmacenamiento,
      stock: data.stock,
    };

    // Preparar payload final
    const payload = {
      articuloDTO,
      tipoModelo: data.tipoModelo,
    };

    // Verificar si se seleccionó un proveedor
    if (data.proveedorId) {
      payload.idProveedor = parseInt(data.proveedorId, 10);

      // Validar campos relacionados con el proveedor
      if (
        !data.precioUnitario ||
        !data.costoCompra ||
        !data.demoraEntrega
      ) {
        return toast.error(
          'Cuando se selecciona un proveedor, es necesario completar los campos de precio unitario, costo de compra y demora de entrega.'
        );
      }

      // Agregar articuloProveedorDTO
      payload.articuloProveedorDTO = {
        precioUnitario: parseFloat(data.precioUnitario),
        costoCompra: parseFloat(data.costoCompra),
        demoraEntrega: parseFloat(data.demoraEntrega),
      };
    }

    console.log('Payload enviado al backend:', payload); // Confirmar estructura

    const { errorMsg, data: articuloCreado } = await registrarArticulo(payload);
    if (errorMsg) {
      return toast.error(errorMsg);
    }

    // Actualizar estado local
    setArticulos([...articulos, articuloCreado]);
    toast.success('Artículo creado correctamente');
  };

  useEffect(() => {
    const fetchProveedores = async () => {
      const { data, errorMsg } = await obtenerProveedores();
      if (errorMsg) {
        return toast.error(errorMsg);
      }
      setProveedores(data.content);
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

        {/* Campo: Descripción */}
        <label className='block text-sm font-medium text-orange-800 w-full'>
          Descripción
          <input
            type='text'
            name='descripcion'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        {/* Campo: Demanda del Artículo */}
        <label className='block text-sm font-medium text-orange-800 w-full'>
          Demanda del Artículo
          <input
            type='number'
            name='demandaArticulo'
            step='any'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        {/* Campo: Costo de Almacenamiento */}
        <label className='block text-sm font-medium text-orange-800 w-full'>
          Costo de Almacenamiento
          <input
            type='number'
            name='costoAlmacenamiento'
            step='any'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        {/* Campo: Stock */}
        <label className='block text-sm font-medium text-orange-800 w-full'>
          Stock
          <input
            type='number'
            name='stock'
            className='w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-orange-400'
          />
        </label>

        {/* Campo: Proveedor (Opcional) */}
        <label className='block text-sm font-medium text-orange-800 w-full'>
          Proveedor (Opcional)
          <select
            name='proveedorId'
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200'
            onChange={(e) => {
              // Mostrar/ocultar campos relacionados con el proveedor
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

        {/* Campos relacionados con el proveedor */}
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

        {/* Campo: Tipo de Modelo */}
        <label className='block text-sm font-medium text-orange-800 w-full'>
          Tipo de Modelo
          <select
            name='tipoModelo'
            className='w-full px-3 py-2 bg-beige text-black border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200'
          >
            <option value=''>Seleccionar tipo de modelo</option>
            <option value='Intervalo Lote Fijo'>Intervalo Lote Fijo</option>
            <option value='Otro'>Otro</option>
          </select>
        </label>

        {/* Botón de envío */}
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