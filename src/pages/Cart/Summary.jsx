import { Link } from "react-router-dom";

const carrito = [
  { 
    id: 1, 
    nombre: "Aire Acondicionado LG Portatil", 
    precio: 14995, 
    coleccion: "portatil", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/fca327231c9fff6026089196874402d0-500x500.webp",
    rating: 4.5,
    descripcion: "Los aires acondicionados portátiles de LG con DUAL Inverter Compressor™ brindan temperaturas frías con hasta un 40% más de ahorro de energía. Disfruta de la revolucionaria tecnología Inverter que es tan potente como silenciosa.",
    titulo: "Portatil", 
    cantidad: 1
  },
  { 
    id: 2, 
    nombre: "Aire Acondicionado LG Cassette de 4 Vias", 
    precio: 95995, 
    coleccion: "cassette", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/d0402f050f26e01aedb80e52771ba4f8-500x500.webp",
    rating: 4.5,
    descripcion: "LG Casete montado en el techo proporciona un ambiente de gran confort y estética, lo que lo convierte en el activo perfecto para su negocio. Las unidades de tipo cassette interiores LG también purifican el aire para ofrecer un ambiente más fresco y saludable.",
    titulo: "Cassette", 
    cantidad: 1
  },
]

const calcularSubtotal = () =>
  carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

const impuesto = 0.1; // 10%
const envio = 20; // fijo
const subtotal = calcularSubtotal();
const total = subtotal * (1 + impuesto) + envio;

export default function Summary() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Resumen de tu Orden
      </h2>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        {carrito.map((producto) => (
          <div
            key={producto.id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium text-gray-700">{producto.nombre}</p>
                <p className="text-sm text-gray-500">
                  Cantidad: {producto.cantidad}
                </p>
              </div>
            </div>
            <p className="text-blue-600 font-semibold">
              L.{(producto.precio * producto.cantidad).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>L.{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Impuestos (10%)</span>
          <span>L.{(subtotal * impuesto).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Envío</span>
          <span>L.{envio.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-4">
          <span>Total</span>
          <span>L.{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
          Confirmar Compra
        </button>
        <p className="mt-4 text-sm text-gray-500">
          ¿Quieres modificar tu carrito?{" "}
          <Link to="/carrito" className="text-blue-600 underline">
            Volver al carrito
          </Link>
        </p>
      </div>
    </div>
  );
}
