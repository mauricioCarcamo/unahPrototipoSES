/* 

import Swal from 'sweetalert2'

      // ? EDIT
      Swal.fire({
        title: "Registro editado con exito",
        icon: "success"
      });

      // ? ADD
      Swal.fire({
        title: "Registro agregado con exito",
        icon: "success"
      });

  // ! DELETE
  Swal.fire({
      title: "Estas seguro que desea eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Registro eliminado con exito",
          icon: "success"
        });
      }
    });
*/

import { useState } from "react";
import { Pencil, Trash2, Plus, X, FileText, FilterX } from "lucide-react";
import { jsPDF } from "jspdf";
import Swal from 'sweetalert2'

export default function Productos() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Laptop", precio: 1200, stock: 5 },
    { id: 2, nombre: "Smartphone", precio: 850, stock: 10 },
  ]);

  const [form, setForm] = useState({ nombre: "", precio: "", stock: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtro, setFiltro] = useState("");

  const abrirModal = (producto = null) => {
    if (producto) {
      setForm(producto);
      setEditandoId(producto.id);
    } else {
      setForm({ nombre: "", precio: "", stock: "" });
      setEditandoId(null);
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setForm({ nombre: "", precio: "", stock: "" });
    setEditandoId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editandoId) {
      setProductos((prev) =>
        prev.map((p) => (p.id === editandoId ? { ...form, id: editandoId } : p))
      );

      Swal.fire({
        title: "Registro editado con exito",
        icon: "success"
      });

    } else {
      const nuevo = {
        ...form,
        id: Date.now(),
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
      };
      setProductos([...productos, nuevo]);

      Swal.fire({
        title: "Registro agregado con exito",
        icon: "success"
      });

    }
    cerrarModal();
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: "Estas seguro que desea eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        setProductos(productos.filter((p) => p.id !== id));
        Swal.fire({
          title: "Registro eliminado con exito",
          icon: "success"
        });
      }
    });
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Listado de productos", 15, 20);

    const headers = [["Nombre", "Precio", "Stock"]];
    const rows = productosFiltrados.map((p) => [p.nombre, `$${p.precio}`, p.stock.toString()]);

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 30,
    });

    doc.save("productos.pdf");
  };

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de productos</h2>
        <div className="flex gap-2">
          <button
            onClick={generarPDF}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            <FileText className="w-5 h-5" />
            PDF
          </button>
          <button
            onClick={() => abrirModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            Agregar producto
          </button>
        </div>
      </div>

      {/* Filtro */}
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        {filtro && (
          <button
            onClick={() => setFiltro("")}
            className="text-gray-500 hover:text-red-600 transition"
            title="Limpiar filtro"
          >
            <FilterX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tabla */}
      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Precio</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id} className="border-t">
                <td className="px-4 py-2">{producto.nombre}</td>
                <td className="px-4 py-2">${producto.precio}</td>
                <td className="px-4 py-2">{producto.stock}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => abrirModal(producto)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEliminar(producto.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No hay productos que coincidan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={cerrarModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {editandoId ? "Editar producto" : "Nuevo producto"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full border px-4 py-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Precio"
                name="precio"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
                className="w-full border px-4 py-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Stock"
                name="stock"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full border px-4 py-2 rounded"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  {editandoId ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
