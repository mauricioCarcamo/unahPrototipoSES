import Stars from "../../common/Stars";

const productosComparados = [
  {
    id: "1",
    nombre: "Smartphone Samsung Galaxy S21",
    imagen: "https://cdn.smart-gsm.com/img/picture/big/samsung-galaxy-s21.jpg",
    precio: 899,
    rating: 4.5,
    specs: {
      pantalla: "6.2\" AMOLED",
      camara: "64MP",
      bateria: "4000mAh",
      almacenamiento: "128GB",
    },
  },
  {
    id: "2",
    nombre: "iPhone 13",
    imagen: "https://m.media-amazon.com/images/I/61O6NfkdS4L._AC_UF894,1000_QL80_.jpg",
    precio: 999,
    rating: 4.7,
    specs: {
      pantalla: "6.1\" OLED",
      camara: "12MP",
      bateria: "3240mAh",
      almacenamiento: "128GB",
    },
  },
  {
    id: "3",
    nombre: "Xiaomi Mi 11",
    imagen: "https://www.radioshackla.com/media/catalog/product/4/5/458320000017-2.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    precio: 749,
    rating: 4.3,
    specs: {
      pantalla: "6.81\" AMOLED",
      camara: "108MP",
      bateria: "4600mAh",
      almacenamiento: "256GB",
    },
  },
];

export default function CompareProducts() {
  const specsKeys = ["pantalla", "camara", "bateria", "almacenamiento"];

  return (
    <div className="px-6 py-10 overflow-x-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Comparar Productos
      </h2>

      <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {/* Encabezado vertical */}
        <div className="font-semibold text-gray-700 text-right pr-4 flex flex-col gap-6 items-end">
          <span>Producto</span>
          <span>Precio</span>
          <span>Calificación</span>
          {specsKeys.map((spec) => (
            <span key={spec} className="capitalize">
              {spec}
            </span>
          ))}
        </div>

        {/* Columnas por producto */}
        {productosComparados.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col gap-6 items-center text-center"
          >
            <div>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="h-32 object-contain mx-auto"
              />
              <h3 className="font-semibold mt-2">{producto.nombre}</h3>
            </div>
            <span className="text-blue-600 font-bold text-lg">
              ${producto.precio}
            </span>
            <Stars valor={producto.rating} />
            {specsKeys.map((spec) => (
              <span key={spec} className="text-sm text-gray-600">
                {producto.specs[spec]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
