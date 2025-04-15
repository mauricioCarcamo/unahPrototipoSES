import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Plus, Pencil, Trash2, FileDown } from "lucide-react";
import Swal from 'sweetalert2'

const inventarioInicial = [
  {
    id: 1,
    nombre: "Camisa Azul",
    cantidad: 4,
    precio: 25,
    minimo: 5,
    maximo: 20,
    descripcion: "Camisa de algodón azul con cuello clásico",
  },
  {
    id: 2,
    nombre: "Zapatos Negros",
    cantidad: 15,
    precio: 50,
    minimo: 10,
    maximo: 50,
    descripcion: "Zapatos de cuero para vestir",
  },
];

export default function Inventary() {
  const [productos, setProductos] = useState(inventarioInicial);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    cantidad: "",
    precio: "",
    minimo: "",
    maximo: "",
    descripcion: "",
  });

  const abrirModal = (producto = null) => {
    if (producto) {
      setForm(producto);
      setEditando(producto.id);
    } else {
      setForm({
        nombre: "",
        cantidad: "",
        precio: "",
        minimo: "",
        maximo: "",
        descripcion: "",
      });
      setEditando(null);
    }
    setModal(true);
  };

  const cerrarModal = () => {
    setModal(false);
    setEditando(null);
    setForm({
      nombre: "",
      cantidad: "",
      precio: "",
      minimo: "",
      maximo: "",
      descripcion: "",
    });
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    if (editando) {
      setProductos(productos.map(p => p.id === editando ? { ...form, id: editando } : p));
            // ? EDIT
            Swal.fire({
              title: "Registro editado con exito",
              icon: "success"
            });

    } else {
      setProductos([...productos, { ...form, id: Date.now() }]);
            // ? ADD
            Swal.fire({
              title: "Registro agregado con exito",
              icon: "success"
            });
    }
    cerrarModal();
  };

  const eliminarProducto = (id) => {
    Swal.fire({
      title: "Estas seguro que desea eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        setProductos(productos.filter(p => p.id !== id));
        Swal.fire({
          title: "Registro eliminado con exito",
          icon: "success"
        });
      }
    });
    
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const getColorCantidad = (cantidad, minimo) => {
    return cantidad < minimo ? "text-red-600 font-bold" : "text-green-600 font-semibold";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
          />
          <button
            // onClick={exportarPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={() => abrirModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Añadir
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Producto</th>
              <th className="px-4 py-3 text-left">Cantidad</th>
              <th className="px-4 py-3 text-left">Mín</th>
              <th className="px-4 py-3 text-left">Máx</th>
              <th className="px-4 py-3 text-left">Precio</th>
              <th className="px-4 py-3 text-left">Descripción</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{p.nombre}</td>
                <td className={`px-4 py-3 ${getColorCantidad(p.cantidad, p.minimo)}`}>
                  {p.cantidad}
                </td>
                <td className="px-4 py-3">{p.minimo}</td>
                <td className="px-4 py-3">{p.maximo}</td>
                <td className="px-4 py-3">${p.precio}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{p.descripcion}</td>
                <td className="px-4 py-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => abrirModal(p)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => eliminarProducto(p.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No hay productos coincidentes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={modal} onClose={cerrarModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <Dialog.Title className="text-lg font-semibold">
              {editando ? "Editar producto" : "Nuevo producto"}
            </Dialog.Title>
            <form onSubmit={guardarProducto} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Nombre</label>
                  <input
                    type="text"
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Cantidad</label>
                  <input
                    type="number"
                    required
                    value={form.cantidad}
                    onChange={(e) => setForm({ ...form, cantidad: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Precio</label>
                  <input
                    type="number"
                    required
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Cantidad Mínima</label>
                  <input
                    type="number"
                    required
                    value={form.minimo}
                    onChange={(e) => setForm({ ...form, minimo: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Cantidad Máxima</label>
                  <input
                    type="number"
                    required
                    value={form.maximo}
                    onChange={(e) => setForm({ ...form, maximo: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2">
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
