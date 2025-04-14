import { Link } from "react-router-dom";

const carrito = [
  {
    id: "6",
    nombre: "Smartphone Samsung Galaxy S21",
    precio: 899,
    imagen: "https://i.ebayimg.com/images/g/bnIAAOSwXJpgAZ8c/s-l640.jpg",
    rating: 4.5,
    cantidad: 1,
  },
  {
    id: "7",
    nombre: "Audífonos inalámbricos JBL",
    precio: 129,
    imagen: "https://kh.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw3b9796ab/450BT_black_angle_01-1606x1606px.png?sw=537&sfrm=png",
    rating: 4.0,
    cantidad: 1,
  },
];

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
