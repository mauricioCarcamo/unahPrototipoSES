import { Link } from "react-router-dom";

const colecciones = [
    {
        id: "portatil",
        nombre: "Portátil   ",
        descripcion: "Leva tu aire acondicionado a donde quieras y disfruta no solo de la frescura y enfriamiento rápido, sino también de un espacio sin ruido",
        imagen: "https://www.muyinteresante.com/wp-content/uploads/sites/5/2024/07/20/669be17ac71f7.png",
    },
    {
        id: "cassette",
        nombre: "Cassette",
        descripcion: "Este sistema se instala en el techo y distribuye el aire de manera uniforme en la estancia",
        imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/d0402f050f26e01aedb80e52771ba4f8-500x500.webp",
    },
    {
        id: "inverter",
        nombre: "Inverter",
        descripcion: "Es uno de los más comunes en los hogares. Este tipo de sistema se compone de dos unidades: una interior y otra exterior. La unidad interior se encarga de distribuir el aire frío a la habitación y la exterior se encarga de expulsar el aire caliente al exterior",
        imagen: "https://haierla.com/medias/1200Wx1200H-Haier-Aire-Acondicionado-2-toneladas-Blanco-HS24HFW13MI-Frente-V1-OPT.jpg?context=bWFzdGVyfGltYWdlc3wyMzM0NHxpbWFnZS9qcGVnfGFEVXpMMmhoTkM4eE1EWXdORFEyTmpjd01ETXhPQzh4TWpBd1YzZ3hNakF3U0Y5SVlXbGxjaTFCYVhKbExVRmpiMjVrYVdOcGIyNWhaRzh0TWkxMGIyNWxiR0ZrWVhNdFFteGhibU52TFVoVE1qUklSbGN4TTAxSkxVWnlaVzUwWlMxV01TMVBVRlF1YW5CbnwzOTE2Y2IxMjc2NjVjNGIyOGVhZWZhZDc1MzE1MjNjMjFlYTkzMjZiYzRiNDI5Mjc4NGY2OTdiMGVkZmMxMTg4",
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
