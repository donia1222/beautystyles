import { Link } from "@remix-run/react";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">BeautyStyle</h3>
            <p className="text-gray-300 mb-4">Wir verwandeln Ihr Image mit Stil und Professionalität seit 2010.</p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-gray-300 hover:text-[#e91e63] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" className="text-gray-300 hover:text-[#e91e63] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-[#e91e63] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Schnelllinks</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#e91e63] transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-[#e91e63] transition-colors">
                  Dienstleistungen
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-gray-300 hover:text-[#e91e63] transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-300 hover:text-[#e91e63] transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-[#e91e63] transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Öffnungszeiten</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>Montag - Freitag: 9:00 - 20:00</span>
              </li>
              <li className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>Samstag: 9:00 - 18:00</span>
              </li>
              <li className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>Sonntag: Geschlossen</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>Bahnhofstrasse 123, 8001 Zürich</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+41 44 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>info@beautystyle.ch</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BeautyStyle. Alle Rechte vorbehalten.</p>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4 mb-2">
  Images in this template are provided by <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer">Freepik</a>
</p>
<p className="text-center text-sm text-gray-500 mt-2 mb-8">
Demo page von <a href="https://www.lweb.ch" target="_blank" rel="noopener noreferrer">lweb.ch</a>
</p>
      </div>
    </footer>
  );
}