import { useState } from "react";
import { MapPin, Trash2, Plus } from "lucide-react";

export default function SavedAddresses() {
  const [direcciones, setDirecciones] = useState([
    {
      id: "1",
      nombre: "Casa",
      direccion: "Calle Falsa 123, Ciudad Inventada",
      ciudad: "Ciudad",
      codigoPostal: "12345",
      pais: "País",
    },
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevaDireccion, setNuevaDireccion] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    pais: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaDireccion((prev) => ({ ...prev, [name]: value }));
  };

  const agregarDireccion = (e) => {
    e.preventDefault();

    const nueva = {
      ...nuevaDireccion,
      id: crypto.randomUUID(),
    };

    setDirecciones((prev) => [...prev, nueva]);
    setNuevaDireccion({
      nombre: "",
      direccion: "",
      ciudad: "",
      codigoPostal: "",
      pais: "",
    });
    setModalAbierto(false);
  };

  const eliminarDireccion = (id) => {
    setDirecciones((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 relative">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Direcciones de facturación
      </h2>

      <div className="space-y-4">
        {direcciones.map((d) => (
          <div
            key={d.id}
            className="border rounded-lg p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{d.nombre}</p>
                <p className="text-sm text-gray-600">{d.direccion}</p>
                <p className="text-sm text-gray-600">
                  {d.ciudad}, {d.codigoPostal}, {d.pais}
                </p>
              </div>
            </div>
            <button
              onClick={() => eliminarDireccion(d.id)}
              className="text-red-600 hover:text-red-800 transition"
              title="Eliminar"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {direcciones.length === 0 && (
          <p className="text-gray-500 text-center">No tienes direcciones guardadas.</p>
        )}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setModalAbierto(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md font-medium transition"
        >
          <Plus className="w-5 h-5" />
          Añadir nueva dirección
        </button>
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Nueva dirección de facturación
            </h3>
            <form onSubmit={agregarDireccion} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={nuevaDireccion.nombre}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={nuevaDireccion.direccion}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={nuevaDireccion.ciudad}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Código Postal</label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={nuevaDireccion.codigoPostal}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">País</label>
                <input
                  type="text"
                  name="pais"
                  value={nuevaDireccion.pais}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="text-gray-500 hover:underline"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
