import { useState } from "react";

export default function GiftCards() {
  const [giftCards, setGiftCards] = useState([
    {
      id: "GC-001",
      codigo: "ABCD-1234-EFGH-5678",
      saldo: 50.0,
      fechaExpiracion: "2025-12-31",
    },
    {
      id: "GC-002",
      codigo: "XYZ-9876-WXYZ-5432",
      saldo: 25.0,
      fechaExpiracion: "2025-06-30",
    },
  ]);

  const [nuevoCodigo, setNuevoCodigo] = useState("");
  const [nuevoSaldo, setNuevoSaldo] = useState(0);
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);

  const agregarGiftCard = () => {
    const nuevaGiftCard = {
      id: `GC-${giftCards.length + 1}`,
      codigo: nuevoCodigo,
      saldo: nuevoSaldo,
      fechaExpiracion,
    };
    setGiftCards([...giftCards, nuevaGiftCard]);
    cerrarModal(); // Cerrar el modal después de agregar
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Mis Gift Cards
      </h2>

      <div className="flex justify-between mb-6">
        <button
          onClick={abrirModal}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Añadir Gift Card
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Código</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Saldo</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Fecha de Expiración</th>
            </tr>
          </thead>
          <tbody>
            {giftCards.map((card) => (
              <tr key={card.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{card.codigo}</td>
                <td className="px-6 py-4 text-sm text-gray-700">${card.saldo.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{card.fechaExpiracion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar nueva Gift Card */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl relative">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Añadir Nueva Gift Card
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Código</label>
              <input
                type="text"
                value={nuevoCodigo}
                onChange={(e) => setNuevoCodigo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
                placeholder="Introduce el código de la tarjeta"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Saldo</label>
              <input
                type="number"
                value={nuevoSaldo}
                onChange={(e) => setNuevoSaldo(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
                placeholder="Introduce el saldo"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
              <input
                type="date"
                value={fechaExpiracion}
                onChange={(e) => setFechaExpiracion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={cerrarModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={agregarGiftCard}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
