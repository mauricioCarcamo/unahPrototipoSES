import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

// Simulación de productos por colección
const todosLosProductos = [
  { id: 1, nombre: "Laptop Lenovo", precio: 1100, coleccion: "tecnologia", 
    imagen: "https://ss628.liverpool.com.mx/xl/1167156114.jpg",
    descripcion: "Potente laptop con procesador Ryzen 7 y 16GB RAM."},
  { id: 2, nombre: "Zapatillas Nike", precio: 95, coleccion: "moda", 
    imagen: "https://acdn-us.mitiendanube.com/stores/001/749/890/products/img-20240429-wa0084-91c85161426187191417144443144787-1024-1024.jpg",
    descripcion: "Zapatillas cómodas y modernas para correr."},
  { id: 3, nombre: "Sofá moderno", precio: 499, coleccion: "hogar", 
    imagen: "https://medias.maisonsdumonde.com/image/upload/q_auto,f_auto/prismic-imgix/c09f0b7a-f339-4a14-a44d-d461cba21fd9_8-min.jpg",
    descripcion: "Potente laptop con procesador Ryzen 7 y 16GB RAM."},
  { id: 4, nombre: "Paleta de maquillaje", precio: 25, coleccion: "belleza", 
    imagen: "https://www.oboticario.com.co/cdn/shop/files/52831-4-MAKE-B-PALETA-DE-SOMBRAS-ROSE-5_4G_1500x.jpg?v=1706707592",
    descripcion: "Potente laptop con procesador Ryzen 7 y 16GB RAM."},
  { id: 5, nombre: "Pelota de fútbol", precio: 20, coleccion: "deportes", 
    imagen: "https://resize.sprintercdn.com/f/1440x1440/products/0392043/adidas-predator_0392043_00_4_2776566031.jpg?w=1440&q=75",
    descripcion: "Potente laptop con procesador Ryzen 7 y 16GB RAM."},
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
