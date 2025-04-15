import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

// Simulación de productos por colección
const todosLosProductos = [
  { 
    id: 1, 
    nombre: "Aire Acondicionado LG Portatil", 
    precio: 14995, 
    coleccion: "portatil", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/fca327231c9fff6026089196874402d0-500x500.webp",
    descripcion: "Los aires acondicionados portátiles de LG con DUAL Inverter Compressor™ brindan temperaturas frías con hasta un 40% más de ahorro de energía. Disfruta de la revolucionaria tecnología Inverter que es tan potente como silenciosa."},
  { 
    id: 2, 
    nombre: "Aire Acondicionado LG Cassette de 4 Vias", 
    precio: 95995, 
    coleccion: "cassette", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/d0402f050f26e01aedb80e52771ba4f8-500x500.webp",
    descripcion: "LG Casete montado en el techo proporciona un ambiente de gran confort y estética, lo que lo convierte en el activo perfecto para su negocio. Las unidades de tipo cassette interiores LG también purifican el aire para ofrecer un ambiente más fresco y saludable."},
  { 
    id: 3, 
    nombre: "Aire Acondicionado LG Dual Inverter", 
    precio: 18995, 
    coleccion: "inverter", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/2837e8cd91dc294d874d42942095e684-500x500.webp",
    descripcion: "Reduce tu consumo de energía y tu factura de electricidad con un enfriamiento más eficiente. Obtén la comodidad de un rápido enfriamiento con el LG DUAL Inverter Compressor™."},
];

const nombresColeccion = {
  tecnologia: "Tecnología",
  moda: "Moda",
  hogar: "Hogar",
  deportes: "Deportes",
  belleza: "Belleza",
};


export default function ProductsPerCollection() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const filtrados = todosLosProductos.filter(p => p.coleccion === id);
    setProductos(filtrados);
  }, [id]);

  const nombreColeccion = nombresColeccion[id] || id;

  const navigate = useNavigate();
    
  const verProducto = ( idProducto ) => {
    navigate(`/products/productDetail/${idProducto}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Productos en colección: <span className="text-blue-600">{nombreColeccion}</span>
      </h2>

      {productos.length === 0 ? (
        <p className="text-gray-500">No hay productos disponibles en esta colección.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productos.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className="h-40 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{prod.nombre}</h3>
                <p className="text-gray-600 mt-1">L.{prod.precio}</p>
                <button 
                id={ prod.id }
                onClick={ () => {
                    // console.log(prod.id)
                    verProducto(prod.id)
                } }
                className="mt-4 w-full bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
                  Ver detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
