import { Link } from "react-router-dom";

const colecciones = [
    {
        id: "tecnologia",
        nombre: "Portátil   ",
        descripcion: "Es ideal para quienes buscan confort sin una instalación fija",
        imagen: "https://www.jetstereo.com/_next/image?url=https%3A%2F%2Fjet-web.s3.us-west-1.amazonaws.com%2Fimages%2Fcache%2Fcatalog%2Fpublic%2F40b54f5d589904d368bde209ce979409-350x350.webp&w=640&q=75",
    },
    {
        id: "moda",
        nombre: "Moda",
        descripcion: "Ropa y accesorios con estilo.",
        imagen: "https://audaces.com/wp-content/uploads/2022/11/piramide-mix-productos-moda.jpg",
    },
    {
        id: "hogar",
        nombre: "Hogar",
        descripcion: "Decoración y muebles para tu hogar.",
        imagen: "https://media.istockphoto.com/id/1251694108/es/foto/concepto-escandinavo-de-sal%C3%B3n-interior-con-sof%C3%A1-de-dise%C3%B1o-mesa-de-centro-planta-en-olla-flores.jpg?s=612x612&w=0&k=20&c=EQnea-GhajPiwuWpRDL9eGEDEiWMwVBnpNGmUsbw0CI=",
    },
    {
        id: "deportes",
        nombre: "Deportes",
        descripcion: "Equipamiento y ropa deportiva.",
        imagen: "https://www.lavanguardia.com/files/image_449_220/files/fp/uploads/2021/03/26/605ddc0ee10cf.r_d.1324-546-2339.png",
    },
    {
        id: "belleza",
        nombre: "Belleza",
        descripcion: "Cosméticos, cuidado personal y más.",
        imagen: "https://plus.unsplash.com/premium_photo-1661726457110-c43a88d74567?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdG9zJTIwZGUlMjBiZWxsZXphfGVufDB8fDB8fHww",
    },
];

export default function Collections() {
    return (
        <div className="px-6 py-10">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
                Colecciones destacadas
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {colecciones.map((col) => (
                    <div
                        key={col.id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                    >
                        <img
                            src={col.imagen}
                            alt={col.nombre}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {col.nombre}
                            </h3>
                            <p className="text-gray-600 mb-4 flex-1">{col.descripcion}</p>
                            <Link
                                to={`/products/collection/${col.id}`}
                                className="inline-block mt-auto bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition text-center"
                            >
                                Ver productos
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
