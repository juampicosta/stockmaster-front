import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerArticuloPorId } from '../../services/apiArticulos';
import { toast } from 'sonner';

const DetalleArticulo = () => {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticulo = async () => {
      setLoading(true);
      try {
        const { data, errorMsg } = await obtenerArticuloPorId(id);

        if (errorMsg) {
          throw new Error(errorMsg);
        }

        setArticulo(data);
      } catch (error) {
        toast.error(`Error al cargar el artículo: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticulo();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del artículo...</p>;
  }

  if (!articulo) {
    return <p>No se encontró el artículo.</p>;
  }

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-3xl font-bold text-orange-900 mb-6'>Detalle del Artículo</h1>

      <div className='bg-beige p-6 rounded-lg shadow-md max-w-3xl mx-auto'>
        <div className='mb-4'>
          <strong>Código:</strong> {articulo.codigo}
        </div>
        <div className='mb-4'>
          <strong>Descripción:</strong> {articulo.descripcion}
        </div>
        <div className='mb-4'>
          <strong>Demanda del Artículo:</strong> {articulo.demandaArticulo}
        </div>
        <div className='mb-4'>
          <strong>Costo de Almacenamiento:</strong> {articulo.costoAlmacenamiento}
        </div>
        <div className='mb-4'>
          <strong>Stock:</strong> {articulo.stock}
        </div>
        <div className='mb-4'>
          <strong>Tipo de Modelo:</strong> {articulo.tipoModelo}
        </div>

        {/* Proveedor Predeterminado */}
        {articulo.provPredeterminado && (
          <div className='mt-6 border-t pt-4'>
            <h2 className='text-xl font-semibold text-orange-800 mb-2'>Proveedor Asociado</h2>
            <div>
              <strong>Razón Social:</strong> {articulo.provPredeterminado.razonSocial}
            </div>
            <div>
              <strong>Dirección:</strong> {articulo.provPredeterminado.direccion}
            </div>
            <div>
              <strong>Teléfono:</strong> {articulo.provPredeterminado.telefono || 'No disponible'}
            </div>
          </div>
        )}

        {/* Datos adicionales del proveedor */}
        {articulo.articuloProveedores?.length > 0 && (
          <div className='mt-6 border-t pt-4'>
            <h2 className='text-xl font-semibold text-orange-800 mb-2'>Datos del Proveedor</h2>
            <div>
              <strong>Precio Unitario:</strong> {articulo.articuloProveedores[0].precioUnitario}
            </div>
            <div>
              <strong>Costo de Compra:</strong> {articulo.articuloProveedores[0].costoCompra}
            </div>
            <div>
              <strong>Demora de Entrega:</strong> {articulo.articuloProveedores[0].demoraEntrega} días
            </div>
          </div>
        )}
      </div>

      <div className='mt-6 text-center'>
        <a
          href={`/articulos/editar/${articulo.codigo}`}
          className='inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2'
        >
          Editar Artículo
        </a>
        <a
          href='/articulos'
          className='inline-block bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md'
        >
          Volver al Listado
        </a>
      </div>
    </div>
  );
};

export default DetalleArticulo;