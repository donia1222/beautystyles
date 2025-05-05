"use client"

import type { MetaFunction } from "@remix-run/node"
import { Link, useLocation } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
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
  const videoElementRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

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

    return () => {
      menuToggle?.removeEventListener("change", handleMenuToggle)
    }
  }, [])

  useEffect(() => {
    const videoElement = videoElementRef.current
    if (videoElement) {
      const handleLoadedData = () => {
        console.log("Video loaded successfully")
        setVideoLoaded(true)
      }

      const handleError = (e: any) => {
        console.error("Error loading video:", e)
        setVideoError(true)
      }

      videoElement.addEventListener("loadeddata", handleLoadedData)
      videoElement.addEventListener("error", handleError)

      return () => {
        videoElement.removeEventListener("loadeddata", handleLoadedData)
        videoElement.removeEventListener("error", handleError)
      }
    }
  }, [])

  const [styleElement, setStyleElement] = useState<HTMLStyleElement | null>(null)

  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      /* Video parallax effect */
      main {
        position: relative;
        z-index: 1;
      }
      
      section:not(:first-child) {
        position: relative;
        z-index: 2;
        background-color: white;
      }

      video#background-video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
      }
      
      .floating-text-container {
        perspective: 1500px;
        transform-style: preserve-3d;
      }
      
      .text-3d {
        transform-style: preserve-3d;
      }
      
      @keyframes float {
        0% {
          transform: translateY(0px) translateZ(0px) rotateX(0deg);
        }
        50% {
          transform: translateY(-20px) translateZ(50px) rotateX(5deg);
        }
        100% {
          transform: translateY(0px) translateZ(0px) rotateX(0deg);
        }
      }
    `
    document.head.appendChild(style)
    setStyleElement(style)

    return () => {
      document.head.removeChild(style)
      setStyleElement(null)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              className="absolute w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="https://beautystyle.lweb.ch/images/poster.png"
              id="background-video"
              style={{ display: "block" }}
              ref={videoElementRef}
            >
              <source src="https://beautystyle.lweb.ch/images/1106187_1080p_Care_1280x720.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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

        {/* New 3D Floating Text Animation */}
        <section className="py-20 overflow-hidden relative mb-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="floating-text-container">
              <FloatingTextAnimation />
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
}

// Letter animation component with 3D floating effect
function FloatingTextAnimation() {
  const text = "BEAUTY • STYLE • ELEGANZ • PERFEKTION • QUALITÄT • INNOVATION •"
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  // Break the text into individual words and then letters
  const words = text.split(" ")

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.02,
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        repeatDelay: 2,
        ease: "easeInOut",
      },
    }),
  }

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      z: -100,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      z: 0,
      transition: {
        delay: i * 0.1,
        duration: 1,
        ease: "easeOut",
      },
    }),
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  // Simulate 3D perspective movement based on cursor position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="relative py-12 text-center flex flex-wrap justify-center transform-gpu"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="text-3d w-full text-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {words.map((word, wordIndex) => (
          <motion.div
            key={`word-${wordIndex}`}
            className="inline-block mx-2 my-4"
            variants={wordVariants}
            custom={wordIndex}
            style={{ transformStyle: "preserve-3d" }}
          >
            {Array.from(word).map((letter, letterIndex) => (
              <motion.span
                key={`letter-${wordIndex}-${letterIndex}`}
                className="inline-block text-5xl md:text-7xl font-bold text-gray-100"
                variants={letterVariants}
                custom={wordIndex * 10 + letterIndex}
                style={{
                  display: "inline-block",
                  transformStyle: "preserve-3d",
                  textShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative 3D particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-2 w-2 rounded-full bg-[#ff4081]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.7, 0],
              scale: [0, Math.random() * 2 + 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
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
