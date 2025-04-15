import React from "react";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Acerca de Nosotros</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Nuestra Historia</h2>
          <p className="text-gray-700">
            <strong> OSA (OrderSmart Assist) </strong> es un sistema de pedidos automatizado con atención a través de un programa personalizado para una tienda de servicios de aire acondicionado. Este sistema busca mejorar la atención al cliente, proporcionar información detallada sobre productos y servicios que la empresa ofrece al público, además de agilizar el proceso de selección de servicios. Plataforma digital diseñada para facilitar la interacción de los clientes de manera rápida y eficiente.
          Con nuestro programa le ofrece ayuda y guiar al cliente desde la exploración de productos hasta la confirmación del pedido. Visualización de un catálogo interactivo con filtros por categoría, precio y disponibilidad. Recomendaciones automatizadas de productos basadas en las selecciones del cliente. Uso de bases de datos SQL para almacenar información de productos, pedidos y clientes. Diseño intuitivo y accesible para usuarios.
          </p>
        </section>


      </div>
    </div>
  );
}
