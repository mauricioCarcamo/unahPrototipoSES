import { useParams } from "react-router-dom";
import { useState } from "react";

// Simulación de datos
const productos = [
    {
        id: "1", 
        nombre: "Laptop Lenovo",
        descripcion: "Potente laptop con procesador Ryzen 7 y 16GB RAM.",
        precio: 1100,
        imagen: "https://ss628.liverpool.com.mx/xl/1167156114.jpg"
    },
    {
        id: "2", 
        nombre: "Zapatillas Nike",
        descripcion: "Zapatillas cómodas y modernas para correr.",
        precio: 95,
        imagen: "https://acdn-us.mitiendanube.com/stores/001/749/890/products/img-20240429-wa0084-91c85161426187191417144443144787-1024-1024.jpg"
    },
    {
        id: "3", 
        nombre: "Sofá moderno", 
        precio: 499, 
        coleccion: "hogar",
        imagen: "https://medias.maisonsdumonde.com/image/upload/q_auto,f_auto/prismic-imgix/c09f0b7a-f339-4a14-a44d-d461cba21fd9_8-min.jpg",
        descripcion: "Potente laptop con procesador Ryzen 7 y 16GB RAM."
    },
    {
        id: "4", 
        nombre: "Paleta de maquillaje", 
        precio: 25, 
        coleccion: "belleza",
        imagen: "https://www.oboticario.com.co/cdn/shop/files/52831-4-MAKE-B-PALETA-DE-SOMBRAS-ROSE-5_4G_1500x.jpg?v=1706707592",
        descripcion: "Potente laptop con procesador Ryzen 7 y 16GB RAM."
    },
    {
        id: "5", 
        nombre: "Pelota de fútbol", 
        precio: 20, 
        coleccion: "deportes",
        imagen: "https://resize.sprintercdn.com/f/1440x1440/products/0392043/adidas-predator_0392043_00_4_2776566031.jpg?w=1440&q=75",
        descripcion: "Potente laptop con procesador Ryzen 7 y 16GB RAM."
    },
];

export default function ProductDetail() {
    const { id } = useParams();
    console.log(id)
    const producto = productos.find(p => p.id === id);

    const [cantidad, setCantidad] = useState(1);


    const agregarAlCarrito = () => {
        alert(`Agregado ${cantidad} x ${producto?.nombre} al carrito`);
        // Aquí podrías usar contexto o Redux para manejar el carrito real
    };

    if (!producto) return <p className="text-gray-600">Producto no encontrado.</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-start">
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-96 object-cover rounded-lg shadow"
            />
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{producto.nombre}</h2>
                <p className="text-gray-600 mb-4">{producto.descripcion}</p>
                <p className="text-2xl font-semibold text-blue-600 mb-6">L.{producto.precio}</p>

                <div className="mb-6 flex items-center gap-4">
                    <label className="text-gray-700 font-medium">Cantidad:</label>
                    <input
                        type="number"
                        value={cantidad}
                        min={1}
                        onChange={e => setCantidad(Number(e.target.value))}
                        className="w-20 border rounded px-2 py-1 text-center"
                    />
                </div>

                <button
                    onClick={agregarAlCarrito}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-semibold transition"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}
