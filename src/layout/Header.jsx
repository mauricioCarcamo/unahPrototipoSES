import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react"; // usa lucide-react para iconos

import { ShoppingCart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const carrito = [
  { 
    id: 1,
    cantidad: 1, 
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
    cantidad: 1, 
    nombre: "Aire Acondicionado LG Cassette de 4 Vias", 
    precio: 95995, 
    coleccion: "cassette", 
    imagen: "https://jet-web.s3.us-west-1.amazonaws.com/images/cache/catalog/public/d0402f050f26e01aedb80e52771ba4f8-500x500.webp",
    rating: 4.5,
    descripcion: "LG Casete montado en el techo proporciona un ambiente de gran confort y estética, lo que lo convierte en el activo perfecto para su negocio. Las unidades de tipo cassette interiores LG también purifican el aire para ofrecer un ambiente más fresco y saludable.",
    titulo: "Cassette", 
  },
]

const calcularTotal = () =>
  carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);  

  const user = {
    name: "B Hill",
    avatar: "bhill.png",
  };

  // Cerrar menú si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center border-b">
      <div>
        {/* Aquí podrías poner el logo o título */}
        {/* <h1 className="text-lg font-bold text-gray-700">Panel de Administración</h1> */}
      </div>


      <div className="flex items-center gap-6">

        {/* 
        //#region Carrito
        //
        //  */}
      <div className="relative">
        <button
          onClick={() => setMostrarCarrito(!mostrarCarrito)}
          className="relative flex items-center gap-1 hover:text-blue-600"
        >
          <ShoppingCart className="w-6 h-6" />
          {carrito.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 rounded-full">
              {carrito.length}
            </span>
          )}
          <ChevronDown className="w-4 h-4" />
        </button>

        {mostrarCarrito && (
          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden animate-fade-in z-50">
            <div className="max-h-64 overflow-y-auto divide-y">
              {carrito.map((item) => (
                <div key={item.id} className="flex items-center p-4 gap-4">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.nombre}</p>
                    <p className="text-xs text-gray-500">
                      Cantidad: {item.cantidad}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">
                    L.{item.precio * item.cantidad}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t text-sm flex justify-between items-center">
              <span>Total:</span>
              <span className="font-bold text-blue-600">
                L.{calcularTotal()}
              </span>
            </div>

            <div className="px-4 pb-4">
              <Link
                to="cart/summary"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                onClick={() => setMostrarCarrito(false)}
              >
                Ver carrito
              </Link>
            </div>
          </div>
        )}
      </div>
        {/* Botón de notificaciones */}
        <button className="relative hover:text-blue-600 transition">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Usuario */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 focus:outline-none hover:bg-gray-100 px-2 py-1 rounded transition"
          >
            <img
              src={user.avatar}
              alt="Perfil"
              className="w-9 h-9 rounded-full border border-gray-300"
            />
            <span className="text-sm text-gray-700 font-medium">{user.name}</span>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 py-1">
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                Mi perfil
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
