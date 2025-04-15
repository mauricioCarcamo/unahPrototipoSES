import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Pencil, Trash2, Plus, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from 'sweetalert2'


const consultasMock = [
  { id: 1, nombreCliente: "Juan Pérez", consulta: "¿Cómo puedo recuperar mi contraseña?", fecha: "2025-04-10" },
  { id: 2, nombreCliente: "María García", consulta: "¿Dónde puedo ver mis órdenes?", fecha: "2025-04-11" },
];

export default function Queries() {
  const [consultas, setConsultas] = useState(consultasMock);
  const [filtro, setFiltro] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ nombreCliente: "", consulta: "", fecha: "" });
  const [editando, setEditando] = useState(null);

  const abrirModal = (consulta = null) => {
    if (consulta) {
      setForm(consulta);
      setEditando(consulta.id);
    } else {
      setForm({ nombreCliente: "", consulta: "", fecha: "" });
      setEditando(null);
    }
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setForm({ nombreCliente: "", consulta: "", fecha: "" });
    setIsModalOpen(false);
    setEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      setConsultas(consultas.map(c => (c.id === editando ? { ...form, id: editando } : c)));
      Swal.fire({
        title: "Registro editado con exito",
        icon: "success"
      });
    } else {
      const nuevaConsulta = { ...form, id: Date.now() };
      setConsultas([...consultas, nuevaConsulta]);
      Swal.fire({
        title: "Registro agregado con exito",
        icon: "success"
      });
    }
    cerrarModal();
  };

  const eliminarConsulta = (id) => {
    Swal.fire({
      title: "Estas seguro que desea eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        setConsultas(consultas.filter(c => c.id !== id));
        Swal.fire({
          title: "Registro eliminado con exito",
          icon: "success"
        });
      }
    });



    if (confirm("¿Deseas eliminar esta consulta?")) {
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Consultas", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Nombre Cliente", "Consulta", "Fecha"]],
      body: consultasFiltradas.map(c => [c.nombreCliente, c.consulta, c.fecha]),
    });
    doc.save("consultas.pdf");
  };

  const consultasFiltradas = consultas.filter(
    c =>
      c.nombreCliente.toLowerCase().includes(filtro.toLowerCase()) ||
      c.consulta.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Consultas</h1>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar consulta..."
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
              <th className="px-4 py-3 text-left">Nombre Cliente</th>
              <th className="px-4 py-3 text-left">Consulta</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {consultasFiltradas.map((consulta) => (
              <tr key={consulta.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{consulta.nombreCliente}</td>
                <td className="px-4 py-3">{consulta.consulta}</td>
                <td className="px-4 py-3">{consulta.fecha}</td>
                <td className="px-4 py-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => abrirModal(consulta)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => eliminarConsulta(consulta.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {consultasFiltradas.length === 0 && (
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
              {editando ? "Editar Consulta" : "Nueva Consulta"}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nombre del Cliente</label>
                <input
                  type="text"
                  value={form.nombreCliente}
                  onChange={(e) => setForm({ ...form, nombreCliente: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Consulta</label>
                <textarea
                  value={form.consulta}
                  onChange={(e) => setForm({ ...form, consulta: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div className="hidden">
                <label className="block text-sm font-medium">Fecha</label>
                <input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
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
