import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Pencil, Trash2, Plus, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ordenesMock = [
  { id: 1, cliente: "Juan Pérez", producto: "Laptop", cantidad: 1, fecha: "2025-04-10", estado: "Pendiente" },
  { id: 2, cliente: "María García", producto: "Smartphone", cantidad: 2, fecha: "2025-04-11", estado: "Completada" },
];

export default function Orders() {
  const [ordenes, setOrdenes] = useState(ordenesMock);
  const [filtro, setFiltro] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ cliente: "", producto: "", cantidad: 1, fecha: "", estado: "Pendiente" });
  const [editando, setEditando] = useState(null);

  const abrirModal = (orden = null) => {
    if (orden) {
      setForm(orden);
      setEditando(orden.id);
    } else {
      setForm({ cliente: "", producto: "", cantidad: 1, fecha: "", estado: "Pendiente" });
      setEditando(null);
    }
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setForm({ cliente: "", producto: "", cantidad: 1, fecha: "", estado: "Pendiente" });
    setIsModalOpen(false);
    setEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      setOrdenes(ordenes.map(o => (o.id === editando ? { ...form, id: editando } : o)));
    } else {
      const nuevaOrden = { ...form, id: Date.now() };
      setOrdenes([...ordenes, nuevaOrden]);
    }
    cerrarModal();
  };

  const eliminarOrden = (id) => {
    if (confirm("¿Deseas eliminar esta orden de compra?")) {
      setOrdenes(ordenes.filter(o => o.id !== id));
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Órdenes de Compra", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Cliente", "Producto", "Cantidad", "Fecha", "Estado"]],
      body: ordenesFiltradas.map(o => [o.cliente, o.producto, o.cantidad, o.fecha, o.estado]),
    });
    doc.save("ordenes_de_compra.pdf");
  };

  const ordenesFiltradas = ordenes.filter(
    o =>
      o.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
      o.producto.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Órdenes de Compra</h1>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar orden..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
          />
          <button
            onClick={exportarPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={() => abrirModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Añadir
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">Producto</th>
              <th className="px-4 py-3 text-left">Cantidad</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenesFiltradas.map((orden) => (
              <tr key={orden.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{orden.cliente}</td>
                <td className="px-4 py-3">{orden.producto}</td>
                <td className="px-4 py-3">{orden.cantidad}</td>
                <td className="px-4 py-3">{orden.fecha}</td>
                <td className="px-4 py-3">{orden.estado}</td>
                <td className="px-4 py-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => abrirModal(orden)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => eliminarOrden(orden.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {ordenesFiltradas.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={cerrarModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4">
            <Dialog.Title className="text-lg font-bold">
              {editando ? "Editar Orden de Compra" : "Nueva Orden de Compra"}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Cliente</label>
                <input
                  type="text"
                  value={form.cliente}
                  onChange={(e) => setForm({ ...form, cliente: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Producto</label>
                <input
                  type="text"
                  value={form.producto}
                  onChange={(e) => setForm({ ...form, producto: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Cantidad</label>
                <input
                  type="number"
                  value={form.cantidad}
                  onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fecha</label>
                <input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Estado</label>
                <select
                  value={form.estado}
                  onChange={(e) => setForm({ ...form, estado: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="px-4 py-2 rounded border border-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editando ? "Guardar Cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
