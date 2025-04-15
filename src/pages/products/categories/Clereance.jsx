import { Link } from "react-router-dom";
import Stars from "../../../common/Stars";

const productosEnLiquidacion = [
  {
    id: 1,
    nombre: "Aire Acondicionado LG Portatil",
    precio: 14995,
    coleccion: "portatil",
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/fca327231c9fff6026089196874402d0-500x500.webp",
    rating: 4.5,
    descripcion: "Los aires acondicionados portátiles de LG con DUAL Inverter Compressor™ brindan temperaturas frías con hasta un 40% más de ahorro de energía. Disfruta de la revolucionaria tecnología Inverter que es tan potente como silenciosa.",
    titulo: "Portatil",
    precioOriginal: 19995, precioDescuento: 14995
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
    precioOriginal: 110995, precioDescuento: 95995
  }
];

export default function Clearance() {
  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        ¡Liquidación!
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productosEnLiquidacion.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col relative"
          >
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
              -{Math.round(
                ((producto.precioOriginal - producto.precioDescuento) /
                  producto.precioOriginal) *
                100
              )}
              %
            </span>

            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {producto.nombre}
              </h3>

              <div className="mt-2 mb-1">
                <Stars valor={producto.rating} />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <p className="text-gray-400 line-through text-sm">
                  ${producto.precioOriginal}
                </p>
                <p className="text-red-600 text-lg font-bold">
                  ${producto.precioDescuento}
                </p>
              </div>

              <Link
                to={`/producto/${producto.id}`}
                className="mt-auto inline-block text-sm text-white bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded mt-4 text-center"
              >
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
