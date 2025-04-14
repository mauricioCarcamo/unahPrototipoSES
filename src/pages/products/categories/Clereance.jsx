import { Link } from "react-router-dom";
import Stars from "../../../common/Stars";

const productosEnLiquidacion = [
  {
    id: "6",
    nombre: "Monitor LG Ultrawide",
    precioOriginal: 299,
    precioDescuento: 199,
    imagen: "https://www.officedepot.com.hn/medias/28654.jpg-1200ftw?context=bWFzdGVyfHJvb3R8NjQ4MTgzfGltYWdlL2pwZWd8YUdGbEwyZzJZaTh4TURjd01UZzJPVGd3T1RZNU5DOHlPRFkxTkM1cWNHZGZNVEl3TUdaMGR3fDY2YTViY2NlOTU2YTNhMWI4OTc3MmZhODBlOTdmMTY2OTI5OWIzODE4NjMyN2MwNWMyZmVlZDZlMDZlMjM5ZTk",
    rating: 4.3,
  },
  {
    id: "7",
    nombre: "Teclado mecánico RGB",
    precioOriginal: 89,
    precioDescuento: 59,
    imagen: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/126336855_01/w=1500,h=1500,fit=pad",
    rating: 4.0,
  },
  {
    id: "8",
    nombre: "Mouse inalámbrico Logitech",
    precioOriginal: 49,
    precioDescuento: 29,
    imagen: "https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/non-braid/hyjal-g502-hero/g502-hero-gallery-2-nb.png?v=1",
    rating: 3.8,
  },
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
