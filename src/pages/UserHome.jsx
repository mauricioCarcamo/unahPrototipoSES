import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";

const productosPopulares = [
  { 
    id: 1, 
    nombre: "Aire Acondicionado LG Portatil", 
    precio: 14995, 
    coleccion: "portatil", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/fca327231c9fff6026089196874402d0-500x500.webp",
    rating: 4.5,
    descripcion: "Los aires acondicionados portátiles de LG con DUAL Inverter Compressor™ brindan temperaturas frías con hasta un 40% más de ahorro de energía. Disfruta de la revolucionaria tecnología Inverter que es tan potente como silenciosa.",
  },
  { 
    id: 2, 
    nombre: "Aire Acondicionado LG Cassette de 4 Vias", 
    precio: 95995, 
    coleccion: "cassette", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/d0402f050f26e01aedb80e52771ba4f8-500x500.webp",
    rating: 4.5,
    descripcion: "LG Casete montado en el techo proporciona un ambiente de gran confort y estética, lo que lo convierte en el activo perfecto para su negocio. Las unidades de tipo cassette interiores LG también purifican el aire para ofrecer un ambiente más fresco y saludable.",
  },
  { 
    id: 3, 
    nombre: "Aire Acondicionado LG Dual Inverter", 
    precio: 18995, 
    coleccion: "inverter", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/2837e8cd91dc294d874d42942095e684-500x500.webp",
    rating: 4.5,
    descripcion: "Reduce tu consumo de energía y tu factura de electricidad con un enfriamiento más eficiente. Obtén la comodidad de un rápido enfriamiento con el LG DUAL Inverter Compressor™.",
  },
];

const colecciones = [
  { 
    id: 1, 
    nombre: "Aire Acondicionado LG Portatil", 
    precio: 14995, 
    coleccion: "portatil", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/fca327231c9fff6026089196874402d0-500x500.webp",
    rating: 4.5,
    descripcion: "Los aires acondicionados portátiles de LG con DUAL Inverter Compressor™ brindan temperaturas frías con hasta un 40% más de ahorro de energía. Disfruta de la revolucionaria tecnología Inverter que es tan potente como silenciosa.",
    titulo: "Portatil", 
  },
  { 
    id: 2, 
    nombre: "Aire Acondicionado LG Cassette de 4 Vias", 
    precio: 95995, 
    coleccion: "cassette", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/d0402f050f26e01aedb80e52771ba4f8-500x500.webp",
    rating: 4.5,
    descripcion: "LG Casete montado en el techo proporciona un ambiente de gran confort y estética, lo que lo convierte en el activo perfecto para su negocio. Las unidades de tipo cassette interiores LG también purifican el aire para ofrecer un ambiente más fresco y saludable.",
    titulo: "Cassette", 
  },
  { 
    id: 3, 
    nombre: "Aire Acondicionado LG Dual Inverter", 
    precio: 18995, 
    coleccion: "inverter", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/2837e8cd91dc294d874d42942095e684-500x500.webp",
    rating: 4.5,
    descripcion: "Reduce tu consumo de energía y tu factura de electricidad con un enfriamiento más eficiente. Obtén la comodidad de un rápido enfriamiento con el LG DUAL Inverter Compressor™.",
    titulo: "Inverter", 
  },
];

const productosRebaja = [
  { 
    id: 1, 
    nombre: "Aire Acondicionado LG Portatil", 
    precio: 14995, 
    coleccion: "portatil", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/fca327231c9fff6026089196874402d0-500x500.webp",
    rating: 4.5,
    descripcion: "Los aires acondicionados portátiles de LG con DUAL Inverter Compressor™ brindan temperaturas frías con hasta un 40% más de ahorro de energía. Disfruta de la revolucionaria tecnología Inverter que es tan potente como silenciosa.",
    titulo: "Portatil",
    precioOriginal: 19995, precioRebajado: 14995 
  },
  { 
    id: 2, 
    nombre: "Aire Acondicionado LG Cassette de 4 Vias", 
    precio: 95995, 
    coleccion: "cassette", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/d0402f050f26e01aedb80e52771ba4f8-500x500.webp",
    rating: 4.5,
    descripcion: "LG Casete montado en el techo proporciona un ambiente de gran confort y estética, lo que lo convierte en el activo perfecto para su negocio. Las unidades de tipo cassette interiores LG también purifican el aire para ofrecer un ambiente más fresco y saludable.",
    titulo: "Cassette",
    precioOriginal: 110995, precioRebajado: 95995 
  },
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
