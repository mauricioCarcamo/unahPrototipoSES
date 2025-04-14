import { Link } from "react-router-dom";
import Stars from "../../../common/Stars";

const productosPopulares = [
  {
    id: "6",
    nombre: "Smartphone Samsung Galaxy S21",
    precio: 899,
    imagen: "https://i.ebayimg.com/images/g/bnIAAOSwXJpgAZ8c/s-l640.jpg",
    rating: 4.5,
  },
  {
    id: "7",
    nombre: "Audífonos inalámbricos JBL",
    precio: 129,
    imagen: "https://kh.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw3b9796ab/450BT_black_angle_01-1606x1606px.png?sw=537&sfrm=png",
    rating: 4.0,
  },
  {
    id: "8",
    nombre: "Consola PlayStation 5",
    precio: 499,
    imagen: "https://files.refurbed.com/ii/playstation-5-digital-edition-1681811991.jpg?t=fitdesign&h=600&w=800",
    rating: 5,
  },
  {
    id: "9",
    nombre: "Cámara Canon EOS",
    precio: 649,
    imagen: "https://www.canon.com.mx/datacenter/image/resize-center/328x328/imagenesproducto/fichero/4776_EOS_Rebel_T8i_01.jpg/",
    rating: 3.5,
  },
  {
    id: "10",
    nombre: "Silla gamer ergonómica",
    precio: 199,
    imagen: "https://audiotek.com.mx/cdn/shop/products/860097-MLA46389624674_062021-F.jpg?v=1741718543",
    rating: 4.2,
  },
];

export default function Featured() {
  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Productos Populares
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productosPopulares.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {producto.nombre}
              </h3>

              {/* Estrellas de calificación */}
              <div className="mt-2 mb-1">
                <Stars valor={producto.rating} />
              </div>

              <p className="text-blue-600 text-lg font-bold mt-2">
                ${producto.precio}
              </p>

              <Link
                to={`/products/productDetail/${producto.id}`}
                className="mt-auto inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded mt-4 text-center"
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
