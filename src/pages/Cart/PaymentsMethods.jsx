import { useState } from "react";
import { CreditCard, Wallet, Landmark } from "lucide-react";

const metodos = [
  {
    id: "tarjeta",
    titulo: "Tarjeta de Crédito/Débito",
    icono: <CreditCard className="w-6 h-6 text-blue-600" />,
  },
  {
    id: "paypal",
    titulo: "PayPal",
    icono: <Wallet className="w-6 h-6 text-blue-600" />,
  },
  {
    id: "transferencia",
    titulo: "Transferencia Bancaria",
    icono: <Landmark className="w-6 h-6 text-blue-600" />,
  },
];

export default function PaymentMethods() {
  const [seleccionado, setSeleccionado] = useState("tarjeta");
  const [datosTarjeta, setDatosTarjeta] = useState({
    nombre: "",
    numero: "",
    expiracion: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setDatosTarjeta({ ...datosTarjeta, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar validaciones y enviar los datos
    alert(`Pago con ${seleccionado} procesado.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Selecciona tu método de pago
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          {metodos.map((m) => (
            <label
              key={m.id}
              className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition hover:shadow-sm ${
                seleccionado === m.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSeleccionado(m.id)}
            >
              <input
                type="radio"
                name="metodo"
                value={m.id}
                checked={seleccionado === m.id}
                onChange={() => setSeleccionado(m.id)}
              />
              {m.icono}
              <span className="font-medium text-gray-700">{m.titulo}</span>
            </label>
          ))}
        </div>

        {seleccionado === "tarjeta" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre en la tarjeta"
              value={datosTarjeta.nombre}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="numero"
              placeholder="Número de tarjeta"
              value={datosTarjeta.numero}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="expiracion"
              placeholder="MM/AA"
              value={datosTarjeta.expiracion}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={datosTarjeta.cvv}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>
        )}

        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition">
            Confirmar Pago
          </button>
        </div>
      </form>
    </div>
  );
}
