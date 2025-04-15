import { useState } from "react";
import { Eye, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function OrderHistory() {
  const [ordenes] = useState([
    {
      id: "ORD-001",
      fecha: "2025-04-09",
      total: 89.99,
      estado: "Entregado",
      productos: [
        { nombre: "Camiseta Negra", cantidad: 1, precio: 25.0 },
        { nombre: "Pantalón Jeans", cantidad: 2, precio: 32.5 },
      ],
    },
    {
      id: "ORD-002",
      fecha: "2025-03-30",
      total: 54.99,
      estado: "En camino",
      productos: [
        { nombre: "Zapatos deportivos", cantidad: 1, precio: 54.99 },
      ],
    },
    {
      id: "ORD-003",
      fecha: "2025-03-25",
      total: 120.0,
      estado: "Cancelado",
      productos: [
        { nombre: "Gafas de sol", cantidad: 1, precio: 120.0 },
      ],
    },
  ]);

  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  const abrirModal = (orden) => setOrdenSeleccionada(orden);
  const cerrarModal = () => setOrdenSeleccionada(null);

  // Función para definir los colores de fondo y texto según el estado de la orden
  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case "Entregado":
        return "bg-green-100 text-green-800";
      case "En camino":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };



const imprimirOrdenesPDF = () => {
  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(16);
  doc.text("Historial de Órdenes de Compra", 14, y);
  y += 10;

  ordenes.forEach((orden, index) => {
    doc.setFontSize(12);
    doc.text(`Orden: ${orden.id}`, 14, y);
    doc.text(`Fecha: ${orden.fecha}`, 80, y);
    doc.text(`Estado: ${orden.estado}`, 140, y);
    y += 6;

    doc.text(`Total: $${orden.total.toFixed(2)}`, 14, y);
    y += 4;

    autoTable(doc, {
      startY: y + 2,
      head: [["Producto", "Cantidad", "Precio"]],
      body: orden.productos.map(p => [
        p.nombre,
        p.cantidad,
        `$${p.precio.toFixed(2)}`
      ]),
      styles: { fontSize: 10 },
      theme: "striped",
      margin: { left: 14 },
    });

    y = doc.lastAutoTable.finalY + 10;

    // Salto de página si se pasa del límite
    if (y > 270 && index < ordenes.length - 1) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("ordenes.pdf");
};


  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Historial de Órdenes
      </h2>
      {/* 
      //#region Exportar pdf 
      // */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button
          onClick={ imprimirOrdenesPDF }
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2"
        >
          <FileDown className="w-4 h-4" />
          PDF
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Orden</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Fecha</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Estado</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Total</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{orden.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{orden.fecha}</td>
                <td className={`px-6 py-4 text-sm font-semibold ${obtenerColorEstado(orden.estado)}`}>
                  {orden.estado}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">${orden.total.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => abrirModal(orden)}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-5 h-5" />
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {ordenSeleccionada && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl relative">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Detalles de la Orden {ordenSeleccionada.id}
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              Fecha: {ordenSeleccionada.fecha}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Estado: {ordenSeleccionada.estado}
            </p>

            <div className="space-y-2">
              {ordenSeleccionada.productos.map((producto, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b pb-1 text-sm"
                >
                  <span>{producto.nombre}</span>
                  <span>
                    {producto.cantidad} x ${producto.precio.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-right mt-4 font-semibold text-gray-800">
              Total: ${ordenSeleccionada.total.toFixed(2)}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={cerrarModal}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
