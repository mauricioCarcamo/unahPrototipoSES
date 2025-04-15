import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Plus, FileDown } from "lucide-react";

const productosMock = [
  { id: 1, marca: "LG", modelo: "Art Cool", capacidad: "12,000 BTU", tipo: "Split", eficiencia: "A+", precio: "$500", descripcion: "Aire acondicionado de pared, eficiente y silencioso." },
  { id: 2, marca: "Samsung", modelo: "WindFree", capacidad: "18,000 BTU", tipo: "Split", eficiencia: "A++", precio: "$700", descripcion: "Aire acondicionado con tecnología WindFree." },
  { id: 3, marca: "Daikin", modelo: "FTKF", capacidad: "24,000 BTU", tipo: "Split", eficiencia: "A++", precio: "$850", descripcion: "Aire acondicionado con control inteligente." },
];

export default function CompareProducts() {
  const [productos, setProductos] = useState(productosMock);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSeleccion = (producto) => {
    if (productosSeleccionados.some(p => p.id === producto.id)) {
      setProductosSeleccionados(productosSeleccionados.filter(p => p.id !== producto.id));
    } else {
      setProductosSeleccionados([...productosSeleccionados, producto]);
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Comparación de Aires Acondicionados", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Marca", "Modelo", "Capacidad", "Tipo", "Eficiencia", "Precio"]],
      body: productosSeleccionados.map(p => [p.marca, p.modelo, p.capacidad, p.tipo, p.eficiencia, p.precio]),
    });
    doc.save("comparacion_aires.pdf");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Comparación de Aires Acondicionados</h1>

        <div className="flex items-center gap-2 w-full sm:w-auto hidden">
          <button
            onClick={exportarPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Seleccionar</th>
              <th className="px-4 py-3 text-left">Marca</th>
              <th className="px-4 py-3 text-left">Modelo</th>
              <th className="px-4 py-3 text-left">Capacidad</th>
              <th className="px-4 py-3 text-left">Tipo</th>
              <th className="px-4 py-3 text-left">Eficiencia</th>
              <th className="px-4 py-3 text-left">Precio</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={productosSeleccionados.some(p => p.id === producto.id)}
                    onChange={() => toggleSeleccion(producto)}
                    className="h-5 w-5"
                  />
                </td>
                <td className="px-4 py-3">{producto.marca}</td>
                <td className="px-4 py-3">{producto.modelo}</td>
                <td className="px-4 py-3">{producto.capacidad}</td>
                <td className="px-4 py-3">{producto.tipo}</td>
                <td className="px-4 py-3">{producto.eficiencia}</td>
                <td className="px-4 py-3">{producto.precio}</td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {productosSeleccionados.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Productos Seleccionados</h2>
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-600 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Marca</th>
                <th className="px-4 py-3 text-left">Modelo</th>
                <th className="px-4 py-3 text-left">Capacidad</th>
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-left">Eficiencia</th>
                <th className="px-4 py-3 text-left">Precio</th>
              </tr>
            </thead>
            <tbody>
              {productosSeleccionados.map((producto) => (
                <tr key={producto.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{producto.marca}</td>
                  <td className="px-4 py-3">{producto.modelo}</td>
                  <td className="px-4 py-3">{producto.capacidad}</td>
                  <td className="px-4 py-3">{producto.tipo}</td>
                  <td className="px-4 py-3">{producto.eficiencia}</td>
                  <td className="px-4 py-3">{producto.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
