import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react"; // usa lucide-react para iconos

import { ShoppingCart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const carrito = [
  {
    id: "6",
    nombre: "Galaxy S21",
    cantidad: 1,
    precio: 899,
    imagen: "https://i.ebayimg.com/images/g/bnIAAOSwXJpgAZ8c/s-l640.jpg",


  },
  {
    id: "7",
    nombre: "Audífonos JBL",
    cantidad: 2,
    precio: 129,
    imagen: "https://kh.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw3b9796ab/450BT_black_angle_01-1606x1606px.png?sw=537&sfrm=png",


  },
];

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
