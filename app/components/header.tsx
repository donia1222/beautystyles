"use client"

import { Link, useLocation } from "@remix-run/react"
import { Home, Scissors, Camera, Users, Mail, Calendar, Menu, X, FileText } from "lucide-react"

export default function Header() {
  // Obtener la ruta actual para resaltar el enlace activo
  const location = useLocation()
  const currentPath = location.pathname

  // Función para verificar si un enlace está activo
  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  // Clase CSS para enlaces activos
  const activeClass = "text-[#e91e63] font-medium"

  return (
    <>
      {/* Checkbox oculto para controlar el menú */}
      <input type="checkbox" id="mobile-menu-toggle" className="hidden" />

      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-[#e91e63]">Beauty</span>
            <span className="text-gray-700">Style</span>
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`flex items-center gap-2 transition-colors ${
                isActive("/") ? activeClass : "text-gray-800 hover:text-[#e91e63]"
              }`}
            >
              <Home size={18} />
              <span>Startseite</span>
            </Link>
            <Link
              to="/servicios"
              className={`flex items-center gap-2 transition-colors ${
                isActive("/servicios") ? activeClass : "text-gray-800 hover:text-[#e91e63]"
              }`}
            >
              <Scissors size={18} />
              <span>Dienstleistungen</span>
            </Link>
            <Link
              to="/galeria"
              className={`flex items-center gap-2 transition-colors ${
                isActive("/galeria") ? activeClass : "text-gray-800 hover:text-[#e91e63]"
              }`}
            >
              <Camera size={18} />
              <span>Galerie</span>
            </Link>
            <Link
              to="/blog"
              className={`flex items-center gap-2 transition-colors ${
                isActive("/blog") ? activeClass : "text-gray-800 hover:text-[#e91e63]"
              }`}
            >
              <FileText size={18} />
              <span>Blog</span>
            </Link>
            <Link
              to="/nosotros"
              className={`flex items-center gap-2 transition-colors ${
                isActive("/nosotros") ? activeClass : "text-gray-800 hover:text-[#e91e63]"
              }`}
            >
              <Users size={18} />
              <span>Über uns</span>
            </Link>
            <Link
              to="/contacto"
              className={`flex items-center gap-2 transition-colors ${
                isActive("/contacto") ? activeClass : "text-gray-800 hover:text-[#e91e63]"
              }`}
            >
              <Mail size={18} />
              <span>Kontakt</span>
            </Link>
          </nav>

          <Link
            to="/reservar"
            className={`hidden md:flex items-center gap-2 ${
              isActive("/reservar") ? "bg-[#d81557]" : "bg-[#e91e63] hover:bg-[#e91e63]/90"
            } text-white px-6 py-2 rounded-full transition-colors`}
          >
            <Calendar size={18} />
            <span>Termin buchen</span>
          </Link>

          {/* Label para el checkbox que controla el menú móvil */}
          <label
            htmlFor="mobile-menu-toggle"
            className="md:hidden p-2 text-gray-800 cursor-pointer flex items-center justify-center"
          >
            <Menu size={24} className="menu-icon" />
            <X size={24} className="close-icon hidden" />
          </label>
        </div>
      </header>

      {/* Overlay y menú móvil controlado por CSS */}
      <div className="mobile-menu-overlay fixed inset-0 bg-black/50 z-40 hidden"></div>
      <div className="mobile-menu fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 transform translate-x-full transition-transform duration-300">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-[#e91e63]">Menu</span>
          <label htmlFor="mobile-menu-toggle" className="p-2 cursor-pointer">
            <X size={24} />
          </label>
        </div>

        <div className="p-4">
          <Link
            to="/"
            className={`flex items-center gap-3 py-3 transition-colors ${
              isActive("/") ? "text-[#e91e63] font-medium" : "text-gray-800 hover:text-[#e91e63]"
            }`}
            onClick={() => document.getElementById("mobile-menu-toggle")?.click()}
          >
            <Home size={20} />
            <span>Startseite</span>
            {isActive("/") && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e91e63]"></span>}
          </Link>
          <Link
            to="/servicios"
            className={`flex items-center gap-3 py-3 transition-colors ${
              isActive("/servicios") ? "text-[#e91e63] font-medium" : "text-gray-800 hover:text-[#e91e63]"
            }`}
            onClick={() => document.getElementById("mobile-menu-toggle")?.click()}
          >
            <Scissors size={20} />
            <span>Dienstleistungen</span>
            {isActive("/servicios") && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e91e63]"></span>}
          </Link>
          <Link
            to="/galeria"
            className={`flex items-center gap-3 py-3 transition-colors ${
              isActive("/galeria") ? "text-[#e91e63] font-medium" : "text-gray-800 hover:text-[#e91e63]"
            }`}
            onClick={() => document.getElementById("mobile-menu-toggle")?.click()}
          >
            <Camera size={20} />
            <span>Galerie</span>
            {isActive("/galeria") && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e91e63]"></span>}
          </Link>
          <Link
            to="/blog"
            className={`flex items-center gap-3 py-3 transition-colors ${
              isActive("/blog") ? "text-[#e91e63] font-medium" : "text-gray-800 hover:text-[#e91e63]"
            }`}
            onClick={() => document.getElementById("mobile-menu-toggle")?.click()}
          >
            <FileText size={20} />
            <span>Blog</span>
            {isActive("/blog") && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e91e63]"></span>}
          </Link>
          <Link
            to="/nosotros"
            className={`flex items-center gap-3 py-3 transition-colors ${
              isActive("/nosotros") ? "text-[#e91e63] font-medium" : "text-gray-800 hover:text-[#e91e63]"
            }`}
            onClick={() => document.getElementById("mobile-menu-toggle")?.click()}
          >
            <Users size={20} />
            <span>Über uns</span>
            {isActive("/nosotros") && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e91e63]"></span>}
          </Link>
          <Link
            to="/contacto"
            className={`flex items-center gap-3 py-3 transition-colors ${
              isActive("/contacto") ? "text-[#e91e63] font-medium" : "text-gray-800 hover:text-[#e91e63]"
            }`}
            onClick={() => document.getElementById("mobile-menu-toggle")?.click()}
          >
            <Mail size={20} />
            <span>Kontakt</span>
            {isActive("/contacto") && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e91e63]"></span>}
          </Link>

          <div className="mt-6 pt-6 border-t">
            <Link
              to="/reservar"
              className={`flex items-center justify-center gap-2 w-full ${
                isActive("/reservar") ? "bg-[#d81557]" : "bg-[#e91e63]"
              } text-white px-6 py-3 rounded-full`}
              onClick={() => document.getElementById("mobile-menu-toggle")?.click()}
            >
              <Calendar size={20} />
              <span>Termin buchen</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Estilos CSS para controlar el menú móvil */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Cuando el checkbox está marcado, mostrar el overlay y el menú */
        #mobile-menu-toggle:checked ~ .mobile-menu-overlay {
          display: block;
        }
        
        #mobile-menu-toggle:checked ~ .mobile-menu {
          transform: translateX(0);
        }
        
        /* Cambiar los iconos del botón de menú */
        #mobile-menu-toggle:checked ~ header label .menu-icon {
          display: none;
        }
        
        #mobile-menu-toggle:checked ~ header label .close-icon {
          display: block;
        }
      `,
        }}
      />
    </>
  )
}
