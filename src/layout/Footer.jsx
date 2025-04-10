export default function Footer() {
    return (
      <footer className="bg-gray-800 text-gray-300 text-sm p-1 text-center">
        © {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.
      </footer>
    );
  }