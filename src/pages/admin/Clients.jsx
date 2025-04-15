import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Pencil, Trash2, Plus, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const clientesMock = [
  { id: 1, nombre: "Juan Pérez", email: "juan@example.com", telefono: "555-1234" },
  { id: 2, nombre: "María García", email: "maria@example.com", telefono: "555-5678" },
];

export default function Clients() {
  const [clientes, setClientes] = useState(clientesMock);
  const [filtro, setFiltro] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [editando, setEditando] = useState(null);

  const abrirModal = (cliente = null) => {
    if (cliente) {
      setForm(cliente);
      setEditando(cliente.id);
    } else {
      setForm({ nombre: "", email: "", telefono: "" });
      setEditando(null);
    }
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setForm({ nombre: "", email: "", telefono: "" });
    setIsModalOpen(false);
    setEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      setClientes(clientes.map(c => (c.id === editando ? { ...form, id: editando } : c)));
    } else {
      const nuevoCliente = { ...form, id: Date.now() };
      setClientes([...clientes, nuevoCliente]);
    }
    cerrarModal();
  };

  const eliminarCliente = (id) => {
    if (confirm("¿Deseas eliminar este cliente?")) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Clientes", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Nombre", "Email", "Teléfono"]],
      body: clientesFiltrados.map(c => [c.nombre, c.email, c.telefono]),
    });
    doc.save("clientes.pdf");
  };

  const clientesFiltrados = clientes.filter(
    c =>
      c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      c.email.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">👥 Clientes</h1>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar cliente..."
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
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{cliente.nombre}</td>
                <td className="px-4 py-3">{cliente.email}</td>
                <td className="px-4 py-3">{cliente.telefono}</td>
                <td className="px-4 py-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => abrirModal(cliente)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => eliminarCliente(cliente.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {clientesFiltrados.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
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
              {editando ? "Editar Cliente" : "Nuevo Cliente"}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Teléfono</label>
                <input
                  type="text"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
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
