"use client"

import type { MetaFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import Header from "~/components/header"
import Footer from "~/components/footer"
import { ChevronRight, ArrowRight } from "lucide-react"

// Definir interfaces para los tipos
interface ServiceOption {
  name: string
  price: number
}

interface Service {
  title: string
  description: string
  image: string
  slug: string
  options: ServiceOption[]
}

interface ProcessStep {
  title: string
  description: string
}

interface ServiceCardProps {
  service: Service
  index: number
  isSelected: boolean
  onSelect: () => void
}

interface ProcessStepProps {
  step: ProcessStep
  index: number
  total: number
}

interface Particle {
  x: number
  y: number
  size: number
  color: string
  speed: number
}

export const meta: MetaFunction = () => {
  return [
    { title: "Dienstleistungen - BeautyStyle" },
    { name: "description", content: "Entdecken Sie alle unsere Friseur- und Schönheitsdienstleistungen" },
  ]
}

export default function Servicios() {
  // Para la animación de partículas en el hero
  const [particles, setParticles] = useState<Particle[]>([])
  const heroRef = useRef<HTMLDivElement>(null)

  // Generar partículas para el efecto de fondo
  useEffect(() => {
    if (heroRef.current) {
      const width = heroRef.current.offsetWidth
      const height = heroRef.current.offsetHeight

      const newParticles = Array.from({ length: 50 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1,
        color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.2})`,
        speed: Math.random() * 1 + 0.5,
      }))

      setParticles(newParticles)
    }
  }, [])

  // Animación para las partículas
  useEffect(() => {
    const interval = setInterval(() => {
      if (heroRef.current) {
        const width = heroRef.current.offsetWidth
        const height = heroRef.current.offsetHeight

        setParticles((prev) =>
          prev.map((particle) => ({
            ...particle,
            y: particle.y - particle.speed,
            // Si la partícula sale por arriba, la reposicionamos abajo
            ...(particle.y < -10
              ? {
                  y: height + 10,
                  x: Math.random() * width,
                }
              : {}),
          })),
        )
      }
    }, 30)

    return () => clearInterval(interval)
  }, [])

  // Estado para el servicio seleccionado en la vista 3D
  const [selectedService, setSelectedService] = useState<number | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section con partículas animadas */}
        <section ref={heroRef} className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          {/* Partículas animadas */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle, index) => (
              <motion.div
                key={`particle-${index}`}
                className="absolute rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  left: particle.x,
                  top: particle.y,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#e91e63] to-[#ff4081]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Unsere Dienstleistungen
              </motion.h1>
              <motion.p
                className="text-gray-600 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Wir bieten eine breite Palette von Friseur- und Schönheitsdienstleistungen, um alle Ihre Bedürfnisse zu
                erfüllen.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center"
              >
                <div className="relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#e91e63] to-[#ff4081] rounded-full blur-md opacity-70 animate-pulse"></div>
                  <button
                    className="relative bg-white text-[#e91e63] px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() =>
                      window.scrollTo({
                        top: document.getElementById("services-list")?.offsetTop || 0,
                        behavior: "smooth",
                      })
                    }
                  >
                    Dienstleistungen entdecken <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services List - SIN ANIMACIONES */}
        <section id="services-list" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <SimplifiedServiceCard
                  key={index}
                  service={service}
                  index={index}
                  isSelected={selectedService === index}
                  onSelect={() => setSelectedService(index === selectedService ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section con timeline animada */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unser Prozess</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Wir bieten Ihnen bei jedem Besuch ein umfassendes und personalisiertes Erlebnis.
              </p>
            </motion.div>

            <div className="relative">
              {/* Línea de tiempo animada */}
              <motion.div
                className="absolute top-8 left-0 h-0.5 bg-gray-200"
                style={{ width: "100%" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
              />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {process.map((step, index) => (
                  <ProcessStep key={index} step={step} index={index} total={process.length} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section con efecto de partículas */}
        <section className="py-20 bg-gradient-to-r from-[#ff4081] to-[#fa4b86] text-white relative overflow-hidden">
          {/* Partículas brillantes */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`cta-particle-${i}`}
                className="absolute h-1 w-1 rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.7)",
                }}
                animate={{
                  y: [0, Math.random() * -100, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 0.7, 0],
                  scale: [0, Math.random() * 3 + 1, 0],
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

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Bereit zu buchen?
            </motion.h2>
            <motion.p
              className="text-white/90 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Vereinbaren Sie noch heute einen Termin und genießen Sie unsere professionellen Dienstleistungen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to="/reservar"
                className="inline-block bg-white text-[#e91e63] px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
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

// Componente de tarjeta de servicio SIMPLIFICADO SIN ANIMACIONES 3D
function SimplifiedServiceCard({ service, index, isSelected, onSelect }: ServiceCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isSelected ? "ring-2 ring-[#e91e63] ring-offset-2" : ""
      }`}
      onClick={onSelect}
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
        <p className="text-gray-600 mb-5">{service.description}</p>

        {/* Precios con animación de revelación simplificada */}
        {isSelected && (
          <div className="space-y-3 mb-6 rounded-lg border border-gray-100 overflow-hidden">
            {service.options.map((option, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 transition-colors hover:bg-gray-50 border-b border-dashed border-gray-200 last:border-0"
              >
                <span className="font-medium text-gray-700">{option.name}</span>
                <div className="flex items-center">
                  <span className="font-bold text-[#e91e63] text-lg">{option.price}</span>
                  <span className="ml-1 text-sm font-medium text-gray-500">CHF</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botón para ver detalles simplificado */}
        <button
          className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onSelect()
          }}
        >
          {isSelected ? "Details ausblenden" : "Details anzeigen"}
          <ChevronRight size={16} className={`transition-transform ${isSelected ? "rotate-90" : ""}`} />
        </button>
      </div>
    </div>
  )
}

// Componente de paso del proceso con animación
function ProcessStep({ step, index, total }: ProcessStepProps) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2, duration: 0.5 },
    })
  }, [controls, index])

  return (
    <motion.div className="text-center relative" initial={{ opacity: 0, y: 50 }} animate={controls}>
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        <div className="bg-[#e91e63] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative shadow-md">
          <motion.span
            className="text-xl font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.3 }}
            viewport={{ once: true }}
          >
            {index + 1}
          </motion.span>
        </div>

        {/* Línea de conexión entre pasos */}
        {index < total - 1 && (
          <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
        )}
      </motion.div>

      <motion.h3
        className="text-xl font-bold mb-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.4 }}
        viewport={{ once: true }}
      >
        {step.title}
      </motion.h3>

      <motion.p
        className="text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.5 }}
        viewport={{ once: true }}
      >
        {step.description}
      </motion.p>
    </motion.div>
  )
}

// Datos tipados correctamente
const services: Service[] = [
  {
    title: "Haarschnitt & Styling",
    description: "Personalisierte Schnitte je nach Gesichtsform und persönlichem Stil.",
    image: "https://beautystyle.lweb.ch/images/crop-stylist-drying-hair-with-brush_23-2147769824.jpg",
    slug: "haarschnitt-styling",
    options: [
      { name: "Damen Haarschnitt", price: 65 },
      { name: "Herren Haarschnitt", price: 45 },
      { name: "Kinder Haarschnitt", price: 35 },
      { name: "Styling", price: 55 },
    ],
  },
  {
    title: "Färbung",
    description: "Moderne Färbetechniken für einen einzigartigen und strahlenden Look.",
    image: "https://beautystyle.lweb.ch/images/front-view-beautiful-happy-woman_23-2148778255.jpg",
    slug: "faerbung",
    options: [
      { name: "Komplettfärbung", price: 95 },
      { name: "Strähnchen", price: 120 },
      { name: "Balayage", price: 150 },
      { name: "Ansatzfärbung", price: 75 },
    ],
  },
  {
    title: "Haarbehandlungen",
    description: "Nährende Behandlungen zur Wiederherstellung der Gesundheit und des Glanzes Ihres Haares.",
    image: "https://beautystyle.lweb.ch/images/hairdresser-cut-hair-her-client-hair-salon_1157-27198.jpg",
    slug: "behandlungen",
    options: [
      { name: "Tiefenhydratation", price: 70 },
      { name: "Keratin-Behandlung", price: 140 },
      { name: "Reparaturmaske", price: 60 },
      { name: "Anti-Haarausfall-Behandlung", price: 85 },
    ],
  },
  {
    title: "Spezielle Frisuren",
    description: "Frisuren für besondere Anlässe, die Sie strahlen lassen.",
    image: "https://beautystyle.lweb.ch/images/front-view-beautiful-happy-woman_23-2148778255.jpg",
    slug: "spezielle-frisuren",
    options: [
      { name: "Brautfrisur", price: 180 },
      { name: "Event-Hochsteckfrisur", price: 130 },
      { name: "Flechtfrisuren", price: 85 },
      { name: "Extensions", price: 250 },
    ],
  },
  {
    title: "Barbier",
    description: "Spezialisierte Dienstleistungen für die Pflege von Bart und Schnurrbart.",
    image: "https://beautystyle.lweb.ch/images/barber.png",
    slug: "barbier",
    options: [
      { name: "Bartschnitt & Pflege", price: 35 },
      { name: "Traditionelle Rasur", price: 50 },
      { name: "Bartbehandlung", price: 40 },
      { name: "Kombi Haarschnitt + Bart", price: 70 },
    ],
  },
  {
    title: "Make-up",
    description: "Professionelles Make-up für jeden Anlass.",
    image: "https://beautystyle.lweb.ch/images/close-up-collection-make-up-beauty-products_23-2148620012.jpg",
    slug: "make-up",
    options: [
      { name: "Tages-Make-up", price: 75 },
      { name: "Braut-Make-up", price: 150 },
      { name: "Express-Make-up", price: 50 },
      { name: "Make-up-Kurs", price: 100 },
    ],
  },
]

const process: ProcessStep[] = [
  {
    title: "Beratung",
    description: "Wir bewerten Ihr Haar und besprechen Ihre Vorlieben und Bedürfnisse.",
  },
  {
    title: "Design",
    description: "Wir erstellen einen personalisierten Plan, um den gewünschten Look zu erreichen.",
  },
  {
    title: "Transformation",
    description: "Wir wenden unsere Techniken und hochwertigen Produkte an.",
  },
  {
    title: "Ergebnis",
    description: "Sie genießen einen neuen Look, der Ihre natürliche Schönheit unterstreicht.",
  },
]
