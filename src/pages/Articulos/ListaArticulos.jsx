import { useEffect, useState } from 'react';
import { obtenerArticulos } from '../../services/apiArticulos';
import { toast } from 'sonner';

const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      setArticulos(articulos.filter((a) => a.codigo !== id));
    }
  };

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fetchArticulos = async () => {
      setLoading(true);

      let filtroProveedor;
      switch (filter) {
        case 'con-proveedor':
          filtroProveedor = true;
          break;
        case 'sin-proveedor':
          filtroProveedor = false;
          break;
        default:
          filtroProveedor = undefined;
      }

      const { data, errorMsg } = await obtenerArticulos(filtroProveedor);

      if (errorMsg) {
        toast.error(errorMsg);
      } else {
        setArticulos(data);
      }

      setLoading(false);
    };

    fetchArticulos();
  }, [filter]);

  if (loading) return <p>Cargando artículos...</p>;

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-3xl font-bold text-orange-900 mb-6'>Lista de Artículos</h1>

      <a
        href='/articulos/alta'
        className='bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition duration-200'
      >
        Crear Artículo
      </a>

      {/* Filtros */}
      <section className='mt-6'>
        <label htmlFor='filtro' className='block text-sm font-medium text-orange-800 mb-2'>
          Filtrar por proveedor
        </label>
        <select
          id='filtro'
          value={filter}
          onChange={handleChangeFilter}
          className='border-orange-300 bg-white text-orange-800 rounded-md px-4 py-2 mb-4 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-400'
        >
          <option value=''>Todos</option>
          <option value='con-proveedor'>Con Proveedor</option>
          <option value='sin-proveedor'>Sin Proveedor</option>
        </select>

        {/* Listado */}
        <ul className='space-y-4 mt-6'>
          {articulos.length > 0 ? (
            articulos.map((a) => (
              <li
                key={a.codigo}
                className='bg-white border-l-4 border-orange-300 text-orange-800 p-4 rounded shadow-sm flex justify-between items-center'
              >
                <span>
                  <strong>{a.descripcion}</strong> | Stock: {a.stock} | Tipo modelo: {a.tipoModelo}
                </span>
                <div className='space-x-2'>
                  <a
                    href={`/articulos/detalle/${a.codigo}`}
                    className='text-green-600 hover:text-green-800'
                  >
                    Ver detalle
                  </a>
                  <a
                    href={`/articulos/editar/${a.codigo}`}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    Editar
                  </a>
                  <button
                    onClick={() => handleEliminar(a.codigo)}
                    className='text-red-600 hover:text-red-800'
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No hay artículos disponibles.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Articulos;