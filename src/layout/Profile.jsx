import { useState } from "react";

export default function Profile() {
  const [form, setForm] = useState({
    nombre: "B Hill",
    email: "bhill@email.com",
    avatar: "bhill.png",
  });

  const [mensaje, setMensaje] = useState("");
  const [imagenPrevia, setImagenPrevia] = useState(form.avatar);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const urlTemporal = URL.createObjectURL(archivo);
      setImagenPrevia(urlTemporal);
      // Aquí normalmente subirías la imagen a un backend o servicio y guardarías la URL
      // Pero para esta demo, lo guardamos localmente
      setForm({ ...form, avatar: urlTemporal });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("✅ Información actualizada correctamente");
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Mi perfil</h2>

      {mensaje && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Imagen de perfil */}
        <div className="flex items-center gap-6">
          <img
            src={imagenPrevia}
            alt="Avatar"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Cambiar imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagen}
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
