import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";

const productosPopulares = [
  { id: 1, nombre: "Zapatillas Urbanas", imagen: "https://acdn-us.mitiendanube.com/stores/001/749/890/products/img-20240429-wa0084-91c85161426187191417144443144787-1024-1024.jpg", precio: 69.99, rating: 4 },
  { id: 2, nombre: "Reloj Deportivo", imagen: "https://m.media-amazon.com/images/I/619xstmMPCL._AC_SL1100_.jpg", precio: 129.99, rating: 5 },
];

const colecciones = [
  { id: 1, titulo: "Primavera-Verano", imagen: "https://m.media-amazon.com/images/I/619xstmMPCL._AC_SL1100_.jpg" },
  { id: 2, titulo: "Oficina", imagen: "https://img.freepik.com/foto-gratis/habitacion-vacia-sillas-escritorios_23-2149008873.jpg?semt=ais_hybrid&w=740" },
  { id: 3, titulo: "Deportes", imagen: "https://www.udep.edu.pe/hoy/wp-content/uploads/sites/49/2023/01/CUERPO-DE-TEXTO-1920X1080-3-min-1.png" },
];

const productosRebaja = [
  { id: 1, nombre: "Chaqueta Invierno", imagen: "https://m.media-amazon.com/images/I/71IXGS39A-L._AC_SL1500_.jpg", precioOriginal: 89.99, precioRebajado: 59.99 },
  { id: 2, nombre: "Gorra Casual", imagen: "https://static.vecteezy.com/system/resources/previews/008/644/450/non_2x/stylish-brunette-girl-in-gray-cap-casual-street-style-on-winter-day-photo.jpg", precioOriginal: 19.99, precioRebajado: 12.99 },
];

function StarRating({ rating }) {
  const estrellas = Array(5).fill(0);
  return (
    <div className="flex gap-1">
      {estrellas.map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
      ))}
    </div>
  );
}

export default function UserHome() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 1 },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* 🔥 Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6 text-center shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">¡Bienvenido a tu tienda favorita!</h1>
        <p className="text-lg">Descubre ofertas exclusivas y nuevos lanzamientos hoy mismo.</p>
      </div>

      {/* 🎠 Carrusel */}
      <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden shadow-md">
        <div className="keen-slider__slide number-slide1">
          <img src="/img/banner1.jpg" alt="Promo 1" className="w-full h-64 object-cover" />
        </div>
        <div className="keen-slider__slide number-slide2">
          <img src="/img/banner2.jpg" alt="Promo 2" className="w-full h-64 object-cover" />
        </div>
        <div className="keen-slider__slide number-slide3">
          <img src="/img/banner3.jpg" alt="Promo 3" className="w-full h-64 object-cover" />
        </div>
      </div>

      {/* 🏆 Productos Populares */}
      <section>
        <h2 className="text-2xl font-bold mb-6">🔥 Productos Populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosPopulares.map((producto) => (
            <div key={producto.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-40 object-cover rounded-md mb-3" />
              <h3 className="text-lg font-semibold">{producto.nombre}</h3>
              <StarRating rating={producto.rating} />
              <p className="text-blue-600 font-bold mt-2">${producto.precio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🛍️ Colecciones */}
      <section>
        <h2 className="text-2xl font-bold mb-6">🛍️ Colecciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {colecciones.map((col) => (
            <Link
              to={`/colecciones/${col.id}`}
              key={col.id}
              className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img src={col.imagen} alt={col.titulo} className="w-full h-48 object-cover" />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{col.titulo}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 💸 Rebajas */}
      <section>
        <h2 className="text-2xl font-bold mb-6">💸 Productos en Rebaja</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosRebaja.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
              <img src={p.imagen} alt={p.nombre} className="w-full h-40 object-cover rounded-md mb-3" />
              <h3 className="text-lg font-semibold">{p.nombre}</h3>
              <div className="mt-2">
                <p className="text-red-600 font-bold text-lg">${p.precioRebajado}</p>
                <p className="text-sm line-through text-gray-500">${p.precioOriginal}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
