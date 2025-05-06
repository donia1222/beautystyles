"use client"

import { Link, useLocation } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Header from "../components/header"
import Footer from "../components/footer"
import { Scissors, Star, Users, Clock, ChevronRight, ArrowRight, Camera, Sparkles } from "lucide-react"

export default function Index() {
  const location = useLocation()
  const videoElementRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  // Referencias para efectos de scroll
  const heroRef = useRef<HTMLDivElement>(null)

  // Efectos de scroll para el hero
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(heroScrollProgress, [0, 1], [1, 0])
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.8])
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 100])

  // Typing effect state
  const [typedText, setTypedText] = useState("")
  const fullText = "Entdecken Sie Ihren einzigartigen Stil"

  // Typing effect implementation
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 30) // Cambiado de 100ms a 30ms para que sea más rápido
      return () => clearTimeout(timeout)
    }
  }, [typedText, fullText])

  // Cerrar el menú móvil cuando cambia la ruta
  useEffect(() => {
    const menuToggle = document.getElementById("mobile-menu-toggle") as HTMLInputElement
    if (menuToggle && menuToggle.checked) {
      menuToggle.checked = false
      document.body.classList.remove("menu-open")
    }
  }, [location])

  // Manejar el scroll cuando el menú está abierto
  useEffect(() => {
    const menuToggle = document.getElementById("mobile-menu-toggle") as HTMLInputElement

    const handleMenuToggle = () => {
      if (menuToggle.checked) {
        document.body.classList.add("menu-open")
      } else {
        document.body.classList.remove("menu-open")
      }
    }

    menuToggle?.addEventListener("change", handleMenuToggle)

    return () => {
      menuToggle?.removeEventListener("change", handleMenuToggle)
    }
  }, [])

  // Manejar la carga del video
  useEffect(() => {
    const videoElement = videoElementRef.current
    if (videoElement) {
      const handleLoadedData = () => {
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

  // Estilos para efectos de parallax
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
      
      .service-card {
        transition: all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1);
      }
      
      .service-card:hover {
        transform: translateY(-10px);
      }
      
      .feature-icon {
        transition: all 0.3s ease;
      }
      
      .feature-card:hover .feature-icon {
        transform: scale(1.2) rotate(10deg);
      }
      
      /* Fixed animation for single execution */
      .hero-content, .section-heading, .feature-content {
        animation: fadeIn 1.2s ease-out forwards;
        animation-iteration-count: 1;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .hero-button {
        position: relative;
        overflow: hidden;
      }
      
      .hero-button::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
      }
      
      .hero-button:hover::after {
        transform: translateX(0);
      }

      /* Typing cursor animation */
      .typing-cursor {
        display: inline-block;
        width: 3px;
        height: 1em;
        background-color: #ff4081;
        margin-left: 2px;
        animation: blink 1s step-end infinite;
      }
      
      @keyframes blink {
        from, to { opacity: 1; }
        50% { opacity: 0; }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Estado para la galería interactiva
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)

  // Cambiar imagen de galería automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % galleryImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16">
        {/* Hero Section con Parallax */}
        <section ref={heroRef} className="relative h-screen flex items-center">
          <motion.div
            className="absolute inset-0 z-0 overflow-hidden"
            style={{ opacity: heroOpacity, scale: heroScale }}
          >
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
          </motion.div>

          <motion.div className="container mx-auto px-4 relative z-10" style={{ y: heroY }}>
            <div className="max-w-2xl hero-content">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {/* Typing effect for the headline */}
                {typedText}
                <span className="typing-cursor"></span>
              </h1>

              {/* Static text without animation */}
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Bei BeautyStyle verwandeln wir Ihr Image mit den neuesten personalisierten Schönheitsbehandlungen und
                -techniken.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.5 },
                  },
                }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/termin"
                    className="hero-button bg-[#ff4081] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#ff4081]/90 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <Calendar className="mr-2" size={18} />
                    Jetzt buchen
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/servicios"
                    className="hero-button bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-3 rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-300 transform hover:translate-y-[-2px] flex items-center justify-center"
                  >
                    <Scissors className="mr-2" size={18} />
                    Unsere Dienstleistungen
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Partículas decorativas */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`hero-particle-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                }}
                animate={{
                  y: [0, Math.random() * -50 - 10, 0],
                  x: [0, Math.random() * 30 - 15, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </section>

        {/* Sección con animación de texto deslizante */}
        <div className="relative py-16 overflow-hidden bg-white flex items-center justify-center">
          {/* Texto flotante CENTRADO que se mueve */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div
              className="text-8xl font-bold text-[#ff4081]/10 whitespace-nowrap"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              SCHÖNHEIT • STIL • ELEGANZ • PERFEKTION • QUALITÄT • INNOVATION • SCHÖNHEIT • STIL • ELEGANZ • PERFEKTION
              • QUALITÄT • INNOVATION •
            </motion.div>
          </div>

          {/* Elemento decorativo que pulsa */}
          <motion.div
            className="relative z-10 text-[#ff4081]"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <Scissors size={80} strokeWidth={1} />
          </motion.div>
        </div>

        {/* Services Preview - Static without animations */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-[#ff4081] font-medium mb-2 inline-block px-4 py-1 rounded-full bg-[#ff4081]/10">
                UNSERE EXPERTISE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-3">Unsere Dienstleistungen</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Wir bieten eine breite Palette von Schönheitsdienstleistungen, um alle Ihre Bedürfnisse zu erfüllen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="service-card bg-white rounded-xl shadow-lg overflow-hidden group">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                        <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                          Details ansehen
                        </button>
                      </div>
                    </div>

                    {/* Badge de precio */}
                    <div className="absolute top-4 right-4 bg-[#ff4081] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      Ab {service.price} CHF
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#ff4081] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link
                      to={`/servicios#${service.slug}`}
                      className="inline-flex items-center text-[#ff4081] font-medium hover:underline"
                    >
                      Mehr erfahren{" "}
                      <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
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

        {/* Galería interactiva */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16 section-heading"
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8 },
                },
              }}
            >
              <motion.span
                className="text-[#ff4081] font-medium mb-2 inline-block px-4 py-1 rounded-full bg-[#ff4081]/10"
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                UNSERE ARBEITEN
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 mt-3"
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.2 },
                  },
                }}
              >
                Galerie
              </motion.h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto"
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.3 },
                  },
                }}
              >
                Entdecken Sie einige unserer besten Arbeiten und lassen Sie sich inspirieren.
              </motion.p>
            </motion.div>

            <div className="relative">
              <div className="overflow-hidden rounded-xl shadow-xl">
                <motion.div
                  className="flex transition-transform duration-500 ease-out h-[400px] md:h-[500px]"
                  animate={{ x: `-${activeGalleryIndex * 100}%` }}
                >
                  {galleryImages.map((image, index) => (
                    <div key={index} className="min-w-full relative">
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-8">
                        <h3 className="text-white text-xl font-bold">{image.title}</h3>
                        <p className="text-white/80">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Controles de galería */}
              <div className="flex justify-center mt-6 space-x-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveGalleryIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeGalleryIndex === index ? "bg-[#ff4081] w-6" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <motion.div
                className="text-center mt-8"
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.5 },
                  },
                }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/galeria"
                    className="inline-flex items-center bg-transparent border-2 border-[#ff4081] text-[#ff4081] px-6 py-3 rounded-full hover:bg-[#ff4081] hover:text-white transition-all duration-300"
                  >
                    <Camera size={18} className="mr-2" />
                    Komplette Galerie ansehen
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us con animaciones */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16 section-heading"
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8 },
                },
              }}
            >
              <motion.span
                className="text-[#ff4081] font-medium mb-2 inline-block px-4 py-1 rounded-full bg-[#ff4081]/10"
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                UNSERE VORTEILE
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 mt-3"
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.2 },
                  },
                }}
              >
                Warum uns wählen?
              </motion.h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto"
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.3 },
                  },
                }}
              >
                Wir zeichnen uns durch einen außergewöhnlichen und personalisierten Service aus.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card bg-white p-8 rounded-xl shadow-md text-center border border-gray-100 hover:border-[#ff4081]/30 transition-colors feature-content"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: index * 0.1 },
                    },
                  }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="bg-gradient-to-br from-[#ff4081]/20 to-[#ff4081]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 feature-icon">
                    <feature.icon className="text-[#ff4081]" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de testimonios */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16 section-heading"
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8 },
                },
              }}
            >
              <motion.span
                className="text-[#ff4081] font-medium mb-2 inline-block px-4 py-1 rounded-full bg-[#ff4081]/10"
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                KUNDENSTIMMEN
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 mt-3"
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.2 },
                  },
                }}
              >
                Was unsere Kunden sagen
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl shadow-md relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute -top-4 -left-4 text-[#ff4081] opacity-20">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.032.76-1.018 1.058-1.733.906-2.141-.13-.352-.51-.593-1.155-.724-.33-.053-.658-.035-.953.054-.295.089-.527.236-.695.444-.387.465-.57 1.102-.55 1.912.01.467-.01.846-.06 1.138-.07.438-.21.843-.42 1.212.19.49.48.84.88 1.06.39.22.78.32 1.19.32.45 0 .8-.13 1.05-.4.25-.27.4-.6.45-.99.05-.21.08-.49.08-.84 0-.46.1-.82.29-1.09.19-.27.45-.4.78-.4.36 0 .65.12.88.35.22.23.33.56.33.99 0 .49-.18.94-.54 1.35-.36.41-.86.74-1.49.99-.64.25-1.39.37-2.27.37-.86 0-1.63-.17-2.3-.51-.67-.34-1.19-.82-1.54-1.44-.35-.62-.52-1.33-.52-2.13 0-.9.22-1.69.67-2.39.45-.7 1.06-1.24 1.83-1.63.77-.39 1.65-.59 2.63-.59 1.14 0 2.13.26 2.98.78.85.52 1.5 1.22 1.97 2.09.47.87.7 1.82.7 2.83 0 1.1-.23 2.08-.7 2.93-.47.85-1.12 1.53-1.97 2.04-.85.51-1.84.76-2.98.76-1.4 0-2.57-.35-3.51-1.06-.93-.71-1.51-1.73-1.74-3.07" />
                    </svg>
                  </div>

                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>

                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-semibold text-gray-500">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section con animaciones */}
        <section className="py-20 bg-gradient-to-r from-[#ff4081] to-[#fa4b86] text-white relative overflow-hidden">
          {/* Partículas decorativas */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`cta-particle-${i}`}
                className="absolute h-2 w-2 rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.3 + 0.1,
                }}
                animate={{
                  y: [0, Math.random() * -100, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Bereit, Ihr Image zu verändern?
            </motion.h2>
            <motion.p
              className="text-white/90 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Buchen Sie Ihren Termin noch heute und lassen Sie sich von unseren Profis überraschen.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/termin"
                className="inline-flex items-center bg-white text-[#ff4081] px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
              >
                <Sparkles size={18} className="mr-2" />
                Jetzt buchen
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Componente para el icono de calendario
function Calendar({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
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

const testimonials = [
  {
    name: "Sophie Müller",
    rating: 5,
    text: "Ich gehe seit Jahren zu BeautyStyle und bin immer begeistert! Maria ist eine Künstlerin mit Haaren und das gesamte Team ist sehr professionell und freundlich.",
    date: "15.04.2023",
    image:
      "https://beautystyle.lweb.ch/images/cheerful-girl-cashmere-sweater-laughs-against-backdrop-blossoming-sakura-portrait-woman-yellow-hoodie-city-spring.jpg",
  },
  {
    name: "Thomas Weber",
    rating: 5,
    text: "Zum ersten Mal dort gewesen und direkt überzeugt. Carlos hat meine Haare perfekt geschnitten und mir tolle Tipps zur Pflege gegeben.",
    date: "22.03.2023",
    image: "https://beautystyle.lweb.ch/images/close-up-portrait-young-smiling-man_171337-20064.jpg",
  },
  {
    name: "Lisa Schmidt",
    rating: 4,
    text: "Die Balayage, die Laura für mich gemacht hat, ist fantastisch! Genau das, was ich mir vorgestellt habe. Der einzige Grund für 4 statt 5 Sterne ist die Wartezeit.",
    date: "08.05.2023",
    image: "https://beautystyle.lweb.ch/images/medium-shot-smiley-woman-holding-flowers_23-2149213138.jpg",
  },
]

const galleryImages = [
  {
    src: "https://beautystyle.lweb.ch/images/front-view-beautiful-happy-woman_23-2148778255.jpg",
    alt: "Frau mit neuem Haarschnitt",
    title: "Moderner Bob-Schnitt",
    description: "Ein frischer Look für den Frühling",
  },
  {
    src: "https://beautystyle.lweb.ch/images/woman-shake-her-rainbow-color-hair_633478-156.jpg",
    alt: "Frau mit bunter Haarfarbe",
    title: "Regenbogen-Färbung",
    description: "Ausdrucksstarke Farben für einen einzigartigen Stil",
  },
  {
    src: "https://beautystyle.lweb.ch/images/crop-stylist-drying-hair-with-brush_23-2147769824.jpg",
    alt: "Stylist beim Föhnen",
    title: "Professionelles Styling",
    description: "Perfektes Finish für jeden Anlass",
  },
  {
    src: "https://beautystyle.lweb.ch/images/hairdresser-cut-hair-her-client-hair-salon_1157-27198.jpg",
    alt: "Friseur beim Haareschneiden",
    title: "Präziser Schnitt",
    description: "Detailgenaue Arbeit für optimale Ergebnisse",
  },
]
