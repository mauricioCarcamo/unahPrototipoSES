import { useState } from "react";
import { CreditCard, Trash2, Plus, FileDown } from "lucide-react";
import Swal from 'sweetalert2'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function UserPaymentMehods() {
  const [tarjetas, setTarjetas] = useState([
    {
      id: "1",
      titular: "Juan Pérez",
      numero: "**** **** **** 1234",
      vencimiento: "08/26",
    },
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    titular: "",
    numero: "",
    vencimiento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarjeta((prev) => ({ ...prev, [name]: value }));
  };

  const agregarTarjeta = (e) => {
    e.preventDefault();

    const ultimos4 = nuevaTarjeta.numero.slice(-4);
    const tarjetaFormateada = {
      id: crypto.randomUUID(),
      titular: nuevaTarjeta.titular,
      numero: `**** **** **** ${ultimos4}`,
      vencimiento: nuevaTarjeta.vencimiento,
    };

    setTarjetas((prev) => [...prev, tarjetaFormateada]);
    setNuevaTarjeta({ titular: "", numero: "", vencimiento: "" });
    // ? ADD
    Swal.fire({
      title: "Registro agregado con exito",
      icon: "success"
    });
    setModalAbierto(false);
  };

  const eliminarTarjeta = (id) => {
    // ! DELETE
    Swal.fire({
      title: "Estas seguro que desea eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        setTarjetas((prev) => prev.filter((t) => t.id !== id));
        Swal.fire({
          title: "Registro eliminado con exito",
          icon: "success"
        });
      }
    });
  };

  const imprimirTarjetasPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Listado de Metodos de Pago", 14, 16);

    autoTable(doc, {
      startY: 20,
      head: [["Titular", "Número", "Vencimiento"]],
      body: tarjetas.map(t => [
        t.titular,
        t.numero,
        t.vencimiento,
      ]),
      styles: { fontSize: 12 },
      headStyles: { fillColor: [52, 152, 219] }, // azul claro
      theme: "striped",
      margin: { left: 14, right: 14 },
    });

    doc.save("tarjetas.pdf");
  };


  return (
    <div className="max-w-3xl mx-auto px-6 py-10 relative">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Métodos de pago guardados
      </h2>
      {/* 
      //#region Exportar pdf 
      // */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end mb-6 ">
        <button
          onClick={imprimirTarjetasPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2"
        >
          <FileDown className="w-4 h-4" />
          PDF
        </button>
      </div>

      <div className="space-y-4">
        {tarjetas.map((t) => (
          <div
            key={t.id}
            className="border rounded-lg p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{t.numero}</p>
                <p className="text-sm text-gray-600">{t.titular}</p>
                <p className="text-xs text-gray-500">Vence: {t.vencimiento}</p>
              </div>
            </div>
            <button
              onClick={() => eliminarTarjeta(t.id)}
              className="text-red-600 hover:text-red-800 transition"
              title="Eliminar"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {tarjetas.length === 0 && (
          <p className="text-gray-500 text-center">No hay métodos de pago guardados.</p>
        )}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setModalAbierto(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md font-medium transition"
        >
          <Plus className="w-5 h-5" />
          Añadir nueva tarjeta
        </button>
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Añadir nuevo método de pago
            </h3>
            <form onSubmit={agregarTarjeta} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Nombre del titular</label>
                <input
                  type="text"
                  name="titular"
                  value={nuevaTarjeta.titular}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Número de tarjeta</label>
                <input
                  type="text"
                  name="numero"
                  value={nuevaTarjeta.numero}
                  onChange={handleChange}
                  required
                  maxLength={16}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Fecha de vencimiento</label>
                <input
                  type="text"
                  name="vencimiento"
                  value={nuevaTarjeta.vencimiento}
                  onChange={handleChange}
                  placeholder="MM/AA"
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="text-gray-500 hover:underline"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
