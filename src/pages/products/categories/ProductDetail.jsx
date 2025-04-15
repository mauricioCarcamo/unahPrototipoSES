import { useParams } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2'


// Simulación de datos
const productos = [
    { id: "1", nombre: "Aire Acondicionado LG Portatil", precio: 14995, coleccion: "portatil", 
        imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/fca327231c9fff6026089196874402d0-500x500.webp",
        descripcion: "Los aires acondicionados portátiles de LG con DUAL Inverter Compressor™ brindan temperaturas frías con hasta un 40% más de ahorro de energía. Disfruta de la revolucionaria tecnología Inverter que es tan potente como silenciosa."},
      { id: "2", nombre: "Aire Acondicionado LG Cassette de 4 Vias", precio: 95995, coleccion: "cassette", 
        imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/d0402f050f26e01aedb80e52771ba4f8-500x500.webp",
        descripcion: "LG Casete montado en el techo proporciona un ambiente de gran confort y estética, lo que lo convierte en el activo perfecto para su negocio. Las unidades de tipo cassette interiores LG también purifican el aire para ofrecer un ambiente más fresco y saludable."},
      { id: "3", nombre: "Aire Acondicionado LG Dual Inverter", precio: 18995, coleccion: "inverter", 
        imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/2837e8cd91dc294d874d42942095e684-500x500.webp",
        descripcion: "Reduce tu consumo de energía y tu factura de electricidad con un enfriamiento más eficiente. Obtén la comodidad de un rápido enfriamiento con el LG DUAL Inverter Compressor™."}
];

const cartAdd = (params) => {
          // ? ADD
          Swal.fire({
            title: params,
            icon: "success"
          });
}

export default function ProductDetail() {
    const { id } = useParams();
    console.log(id)
    const producto = productos.find(p => p.id === id);

    const [cantidad, setCantidad] = useState(1);


    const agregarAlCarrito = () => {
        Swal.fire({
            title: `Agregado ${cantidad} x ${producto?.nombre} al carrito`,
            icon: "success"
          });
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
