import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const data = [
    { name: "Lun", visitas: 400 },
    { name: "Mar", visitas: 300 },
    { name: "Mié", visitas: 500 },
    { name: "Jue", visitas: 250 },
    { name: "Vie", visitas: 600 },
    { name: "Sáb", visitas: 700 },
    { name: "Dom", visitas: 450 },
  ];
  
  export default function Home() {
    return (
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Bienvenido de nuevo </h2>
  
        {/* Cards resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card title="Usuarios" value="1,235" />
          <Card title="Ventas" value="$9,820" />
          <Card title="Ganancias" value="$2,450" />
          <Card title="Visitas" value="12,340" />
        </div>
  
        {/* Gráfico */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Visitas semanales</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
  
  // Componente de tarjeta resumen
  function Card({ title, value }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
      </div>
    );
  }
  