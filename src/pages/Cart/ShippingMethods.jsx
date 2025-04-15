import { useState } from "react";
import { Truck, Store, Clock } from "lucide-react";
import Swal from 'sweetalert2'


const opcionesEnvio = [
  {
    id: "estandar",
    titulo: "Envío estándar",
    descripcion: "Recibe tu pedido en 3 a 5 días hábiles.",
    costo: 5,
    icono: <Truck className="w-6 h-6 text-blue-600" />,
  },
  {
    id: "express",
    titulo: "Envío exprés",
    descripcion: "Entrega rápida en 24 a 48 horas.",
    costo: 10,
    icono: <Clock className="w-6 h-6 text-blue-600" />,
  },
  {
    id: "retiro",
    titulo: "Retiro en tienda",
    descripcion: "Recoge tu pedido en una sucursal cercana.",
    costo: 0,
    icono: <Store className="w-6 h-6 text-blue-600" />,
  },
];

const handleSave = (params) => {
        // ? ADD
        Swal.fire({
          title: "Pago seleccionado con exito",
          icon: "success"
        });
}

export default function ShippingMethods() {
  const [seleccionado, setSeleccionado] = useState("estandar");

  const handleSeleccion = (id) => {
    setSeleccionado(id);
  };

  const envio = opcionesEnvio.find((op) => op.id === seleccionado);



  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Selecciona tu método de envío
      </h2>

      <div className="space-y-4">
        {opcionesEnvio.map((opcion) => (
          <label
            key={opcion.id}
            className={`flex items-start gap-4 border rounded-lg p-4 cursor-pointer transition hover:shadow-sm ${
              seleccionado === opcion.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
            onClick={() => handleSeleccion(opcion.id)}
          >
            <input
              type="radio"
              name="metodoEnvio"
              value={opcion.id}
              checked={seleccionado === opcion.id}
              onChange={() => handleSeleccion(opcion.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                {opcion.icono}
                {opcion.titulo}
              </div>
              <p className="text-sm text-gray-500 mt-1">{opcion.descripcion}</p>
            </div>
            <span className="font-bold text-blue-600">
              ${opcion.costo.toFixed(2)}
            </span>
          </label>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Método seleccionado:{" "}
          <span className="font-semibold text-blue-600">
            {envio.titulo} (${envio.costo.toFixed(2)})
          </span>
        </p>
        <button onClick={ handleSave } className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition">
          Continuar con el pago
        </button>
      </div>
    </div>
  );
}
