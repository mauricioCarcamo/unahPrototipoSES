import { useState } from "react";
import Swal from 'sweetalert2'


export default function PasswordChange() {
  const [formulario, setFormulario] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });

  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formulario.nueva !== formulario.confirmar) {
      setMensaje({ tipo: "error", texto: "Las contraseñas no coinciden." });
      return;
    }

    // Aquí enviarías el cambio al backend
    setMensaje({ tipo: "success", texto: "Contraseña actualizada correctamente." });
    setFormulario({ actual: "", nueva: "", confirmar: "" });
    // ? ADD
    // ? EDIT
    Swal.fire({
      title: "Contraseña cambiada con exito",
      icon: "success"
    });

  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Cambiar contraseña
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña actual
          </label>
          <input
            type="password"
            name="actual"
            value={formulario.actual}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nueva contraseña
          </label>
          <input
            type="password"
            name="nueva"
            value={formulario.nueva}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full border rounded-md p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar nueva contraseña
          </label>
          <input
            type="password"
            name="confirmar"
            value={formulario.confirmar}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-3"
          />
        </div>

        {mensaje && (
          <div
            className={`text-sm font-medium p-3 rounded-md ${mensaje.tipo === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
              }`}
          >
            {mensaje.texto}
          </div>
        )}

        <div className="text-center pt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}
