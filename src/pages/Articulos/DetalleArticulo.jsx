import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerArticuloPorId } from '../../services/apiArticulos';
import { toast } from 'sonner';
import { BsFillBoxSeamFill, BsGraphUpArrow } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import { MdOutlineInventory, MdPerson, MdAddCircle } from "react-icons/md";

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
    <div className='bg-gradient-to-br from-orange-50 to-white min-h-screen p-8'>
      <h1 className='text-4xl font-extrabold text-orange-900 mb-8 tracking-tight'>
        Detalle de Artículo
      </h1>
      <li
        key={articulo.codigo}
        className='bg-white border-1 border-l-4 border-yellow-200 rounded-xl text-orange-800 p-4 shadow-sm flex justify-between items-center mb-4'
      >
        <div>
          <p className='flex items-center text-2xl font-semibold text-orange-800 gap-2 mb-3'>
            <span className='flex items-center justify-center size-10 bg-orange-200 rounded-full'>
              <BsFillBoxSeamFill className='' />
            </span>
            {articulo.descripcion}
          </p>
          <div className='ml-3 text-md'>
            <p className='flex gap-1.5 items-center'>
              <FaBoxes />
              Stock: {articulo.stock}
            </p>

            <p className='flex gap-1.5 items-center'>
              <BsGraphUpArrow />
              Demanda: {articulo.demandaArticulo}
            </p>

            <p className='flex gap-1.5 items-center'>
              <FaMoneyBill />
              Costo de almacenamiento: {articulo.costoAlmacenamiento}
            </p>

            <p className='flex gap-1.5 items-center'>
              <MdOutlineInventory />
              Modelo Inventario: {articulo.tipoModelo}
            </p>

            <p className='flex gap-1.5 items-center'>
              <MdPerson />
              Proveedor predeterminado: {articulo.provPredeterminado.razonSocial}
            </p>
          </div>
        </div>
      </li>

      <div className='flex gap-8 items-center mb-4'>
        <h2 className='text-2xl font-bold text-orange-800 '>Proveedores</h2>
        <a className='bg-green-500 text-white px-4 py-1.5 rounded-md shadow-md hover:bg-green-700 transition duration-200 flex items-center w-fit gap-2'>
          <MdAddCircle className='text-lg' /> 
          Agregar Proveedor
        </a>
      </div>
    </div>
  );
};

export default DetalleArticulo;