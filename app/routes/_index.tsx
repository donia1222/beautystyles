"use client"

import type { MetaFunction } from "@remix-run/node"
import { Link, useLocation } from "@remix-run/react"
import { useEffect } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import { Scissors, Star, Users, Clock, ChevronRight } from "lucide-react"

export const meta: MetaFunction = () => {
  return [
    { title: "BeautyStyle - Moderner Friseursalon in Zürich" },
    { name: "description", content: "Moderner Friseursalon mit den besten Schönheitsdienstleistungen in Zürich" },
  ]
}

export default function Index() {
  const location = useLocation()

  // Añadir logs para depuración
  console.log("Index component rendered, path:", location.pathname)

  // Cerrar el menú móvil cuando cambia la ruta
  useEffect(() => {
    const menuToggle = document.getElementById("mobile-menu-toggle") as HTMLInputElement
    if (menuToggle && menuToggle.checked) {
      console.log("Closing menu on route change")
      menuToggle.checked = false
      document.body.classList.remove("menu-open")
    }
  }, [location])

  // Manejar el scroll cuando el menú está abierto
  useEffect(() => {
    const menuToggle = document.getElementById("mobile-menu-toggle") as HTMLInputElement

    const handleMenuToggle = () => {
      if (menuToggle.checked) {
        console.log("Menu opened, preventing scroll")
        document.body.classList.add("menu-open")
      } else {
        console.log("Menu closed, enabling scroll")
        document.body.classList.remove("menu-open")
      }
    }

    menuToggle?.addEventListener("change", handleMenuToggle)

    // Añadir efecto de texto desplazándose con el scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const textContainer = document.getElementById("scrolling-text-container")

      if (textContainer) {
        // Calcula el desplazamiento basado en la posición del scroll
        // Esto moverá el texto de derecha a izquierda mientras se hace scroll hacia abajo
        const translateX = -(scrollPosition * 0.1) % 100
        textContainer.style.transform = `translateX(${translateX}%)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      menuToggle?.removeEventListener("change", handleMenuToggle)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: "url('https://beautystyle.lweb.ch/images/6817e8d8ddb8f.png')",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Entdecken Sie Ihren <span className="text-[#ff4081]">einzigartigen Stil</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Bei BeautyStyle verwandeln wir Ihr Image mit den neuesten personalisierten Schönheitsbehandlungen und
                -techniken.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/reservar"
                  className="bg-[#ff4081] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#ff4081]/90 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
                >
                  Jetzt buchen
                </Link>
                <Link
                  to="/servicios"
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-3 rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  Unsere Dienstleistungen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <span className="text-[#ff4081] font-medium mb-2 inline-block">UNSERE EXPERTISE</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unsere Dienstleistungen</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Wir bieten eine breite Palette von Schönheitsdienstleistungen, um alle Ihre Bedürfnisse zu erfüllen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#ff4081] font-semibold">Ab {service.price} CHF</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/servicios"
                className="inline-flex items-center bg-transparent border-2 border-[#ff4081] text-[#ff4081] px-6 py-3 rounded-full hover:bg-[#ff4081] hover:text-white transition-all duration-300"
              >
                Alle Dienstleistungen anzeigen <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <span className="text-[#ff4081] font-medium mb-2 inline-block">UNSERE VORTEILE</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Warum uns wählen?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Wir zeichnen uns durch einen außergewöhnlichen und personalisierten Service aus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl shadow-sm text-center animate-slide-up hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-to-br from-[#ff4081]/20 to-[#ff4081]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="text-[#ff4081]" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Animated Scrolling Text Section */}
        <section className="py-16 overflow-hidden relative mb-20">
          <div
            id="scrolling-text-container"
            className="whitespace-nowrap transition-transform duration-500 ease-out"
            style={{ transform: "translateX(0%)" }}
          >
            <div className="text-6xl md:text-8xl font-bold text-gray-100 inline-block">
              BEAUTY • STYLE • ELEGANZ • PERFEKTION • QUALITÄT • INNOVATION • BEAUTY • STYLE • ELEGANZ • PERFEKTION •
              QUALITÄT • INNOVATION •
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#ff4081] to-[#fa4b86] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">Bereit, Ihr Image zu verändern?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Buchen Sie Ihren Termin noch heute und lassen Sie sich von unseren Profis überraschen.
            </p>
            <Link
              to="/reservar"
              className="inline-block bg-white text-[#ff4081] px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Jetzt buchen
            </Link>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  )

  // Añadir estos estilos CSS en tu archivo de estilos global o en un componente de estilo
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      #scrolling-text-container {
        background: linear-gradient(to right, #ff4081, #fa4b86);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        padding: 1rem 0;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])
}

const services = [
  {
    title: "Haarschnitt & Styling",
    description: "Personalisierte Schnitte je nach Gesichtsform und persönlichem Stil.",
    price: "45",
    image: "https://beautystyle.lweb.ch/images/front-view-beautiful-happy-woman_23-2148778255.jpg",
    slug: "haarschnitt-styling",
  },
  {
    title: "Färbung",
    description: "Moderne Färbetechniken für einen einzigartigen und strahlenden Look.",
    price: "85",
    image: "https://beautystyle.lweb.ch/images/woman-shake-her-rainbow-color-hair_633478-156.jpg",
    slug: "faerbung",
  },
  {
    title: "Haarbehandlungen",
    description: "Nährende Behandlungen zur Wiederherstellung der Gesundheit und des Glanzes Ihres Haares.",
    price: "65",
    image: "https://beautystyle.lweb.ch/images/crop-stylist-drying-hair-with-brush_23-2147769824.jpg",
    slug: "behandlungen",
  },
]

const features = [
  {
    title: "Experten-Stylisten",
    description: "Unser Team besteht aus Fachleuten mit jahrelanger Erfahrung.",
    icon: Scissors,
  },
  {
    title: "Premium-Produkte",
    description: "Wir verwenden nur hochwertige Produkte, um Ihr Haar zu pflegen.",
    icon: Star,
  },
  {
    title: "Persönliche Betreuung",
    description: "Jeder Kunde erhält einen auf seine spezifischen Bedürfnisse zugeschnittenen Service.",
    icon: Users,
  },
  {
    title: "Flexible Öffnungszeiten",
    description: "Wir passen uns Ihrem Zeitplan an, um Ihnen maximalen Komfort zu bieten.",
    icon: Clock,
  },
]
