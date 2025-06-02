import { useEffect, useState } from 'react';
import { obtenerArticulos, eliminarArticulo } from '../../services/apiArticulos';
import { toast } from 'sonner';

const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticulos = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, errorMsg } = await obtenerArticulos();

        if (errorMsg) throw new Error(errorMsg);

        setArticulos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticulos();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este artículo?')) return;

    const result = await eliminarArticulo(id);

    if (result.success) {
      setArticulos(articulos.filter((a) => a.id !== id));
      toast.success("Artículo eliminado correctamente");
    } else {
      toast.error(result.errorMsg || "No se pudo eliminar el artículo");
    }
  };

  if (loading) return <p>Cargando artículos...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (articulos.length === 0) return <p>No hay artículos disponibles.</p>;

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-3xl font-bold text-orange-900 mb-6'>Lista de Artículos</h1>

      <a
        href='/articulos/alta'
        className='bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition duration-200'
      >
        Crear Artículo
      </a>

      <section className='mt-6'>
        <ul className='space-y-4'>
          {articulos.map((a) => (
            <li
              key={a.id}
              className='bg-white border-l-4 border-orange-300 text-orange-800 p-4 rounded shadow-sm flex justify-between items-center'
            >
              <span>
                <strong>{a.descripcion}</strong> | Stock: {a.stock}
              </span>
              <div className='space-x-2'>
                <a
                  href={`/articulos/detalle/${a.id}`}
                  className='text-green-600 hover:text-green-800'
                >
                  Ver detalle
                </a>
                <a
                  href={`/articulos/editar/${a.id}`}
                  className='text-blue-600 hover:text-blue-800'
                >
                  Editar
                </a>
                <button
                  onClick={() => handleEliminar(a.id)}
                  className='text-red-600 hover:text-red-800'
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Articulos;