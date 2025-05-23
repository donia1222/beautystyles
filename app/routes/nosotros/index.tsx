"use client"

import { useRef, useEffect, useState } from "react"
import Header from "~/components/header"
import Footer from "~/components/footer"
import { Award, Clock, MapPin, Phone, Instagram, Facebook, Star, Users } from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"

export default function UeberUns() {
  // Referencias para animaciones basadas en scroll
  const storyRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Estados para los contadores
  const [count1Value, setCount1Value] = useState(0)
  const [count2Value, setCount2Value] = useState(0)
  const [count3Value, setCount3Value] = useState(0)

  // Animación para la línea de tiempo
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "center center"],
  })

  const timelineWidth = useTransform(timelineProgress, [0, 0.6], ["0%", "100%"])
  const timelineOpacity = useTransform(timelineProgress, [0, 0.1], [0, 1])

  // Animación para el contador de experiencia
  const countRef = useRef<HTMLDivElement>(null)
  const isCountInView = useInView(countRef, { once: true, amount: 0.8 })

  // Contadores animados
  const count1 = useSpring(0, { duration: 2 })
  const count2 = useSpring(0, { duration: 2 })
  const count3 = useSpring(0, { duration: 2 })

  // Actualizar los valores de los contadores cuando están en vista
  useEffect(() => {
    if (isCountInView) {
      count1.set(15)
      count2.set(5000)
      count3.set(8)

      // Suscribirse a los cambios de los valores para actualizar los estados
      const unsubscribe1 = count1.onChange(setCount1Value)
      const unsubscribe2 = count2.onChange(setCount2Value)
      const unsubscribe3 = count3.onChange(setCount3Value)

      return () => {
        unsubscribe1()
        unsubscribe2()
        unsubscribe3()
      }
    }
  }, [isCountInView, count1, count2, count3])

  // Formatear el valor del contador 2
  const formattedCount2 = count2Value >= 5000 ? "5K+" : Math.round(count2Value)

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden max-w-full">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section con Parallax */}
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-[#ff4081]"
                style={{
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.3 + 0.1,
                }}
                animate={{
                  y: [0, Math.random() * -30 - 10, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ff4081] to-[#ff4687]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Über Uns
              </motion.h1>
              <motion.p
                className="text-gray-600 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Erfahren Sie mehr über die Geschichte von BeautyStyle und unser Engagement für Schönheit und
                Wohlbefinden.
              </motion.p>

              {/* Contadores animados */}
              <div ref={countRef} className="flex flex-wrap justify-center gap-3 md:gap-8 mt-12">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#ff4081] to-[#ff8db4] rounded-full blur-md opacity-70"></div>
                    <div className="relative bg-white text-[#ff4081] text-3xl md:text-4xl font-bold w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg">
                      <motion.span>{Math.round(count1Value)}</motion.span>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600 font-medium text-sm md:text-base">Jahre Erfahrung</p>
                </div>

                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#ff4081] to-[#ff8db4] rounded-full blur-md opacity-70"></div>
                    <div className="relative bg-white text-[#ff4081] text-3xl md:text-4xl font-bold w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg">
                      <motion.span>{formattedCount2}</motion.span>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600 font-medium text-sm md:text-base">Zufriedene Kunden</p>
                </div>

                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#ff4081] to-[#ff8db4] rounded-full blur-md opacity-70"></div>
                    <div className="relative bg-white text-[#ff4081] text-3xl md:text-4xl font-bold w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg">
                      <motion.span>{Math.round(count3Value)}</motion.span>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600 font-medium text-sm md:text-base">Experten</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story - Static without animations */}
        <section className="py-20" ref={storyRef}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#ff4081]/20 to-[#ff8db4]/20 rounded-lg blur-md"></div>
                  <img
                    src="https://beautystyle.lweb.ch/images/hairdresser-cut-hair-her-client-hair-salon_1157-27198.jpg"
                    alt="Unser Salon"
                    className="rounded-lg shadow-lg w-full h-auto relative z-10"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Unsere Geschichte</h2>
                <p className="text-gray-600 mb-4">
                  BeautyStyle wurde 2010 mit einer klaren Vision gegründet: einen Ort zu schaffen, an dem Schönheit und
                  Wohlbefinden zusammenkommen, um unseren Kunden ein einzigartiges Erlebnis zu bieten.
                </p>
                <p className="text-gray-600 mb-4">
                  Gegründet von Maria Rodriguez, einer Stylistin mit über 15 Jahren Erfahrung in der Branche, begann
                  unser Salon als kleiner Raum im Stadtzentrum und hat sich zu einer Referenz für modernes
                  Friseurhandwerk entwickelt.
                </p>
                <p className="text-gray-600 mb-4">
                  Im Laufe der Jahre haben wir ein Team von Fachleuten aufgebaut, die ihre Arbeit lieben und sich der
                  Exzellenz verschrieben haben. Wir halten uns ständig über die neuesten Trends und Techniken auf dem
                  Laufenden, um Ihnen immer das Beste zu bieten.
                </p>
                <p className="text-gray-600">
                  Bei BeautyStyle kümmern wir uns nicht nur um Ihr Aussehen, sondern auch um Ihr Wohlbefinden. Wir
                  verwenden hochwertige Produkte, die umweltfreundlich und tierversuchsfrei sind, weil wir glauben, dass
                  Schönheit verantwortungsvoll sein sollte.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section - Optimized for earlier animation triggering */}
        <section className="py-20 bg-gray-50" ref={timelineRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unsere Reise</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Entdecken Sie die wichtigsten Meilensteine auf unserem Weg zur Exzellenz.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Línea de tiempo animada - optimized */}
              <motion.div
                className="absolute top-8 left-0 h-1 bg-[#ff4081]"
                style={{
                  width: timelineWidth,
                  opacity: timelineOpacity,
                }}
              />

              <div className="relative z-10">
                {timeline.map((item, index) => (
                  <div key={index} className="flex mb-12 relative">
                    <div className="mr-4 md:mr-8 relative">
                      <motion.div
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#ff4081] z-20"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <span className="text-[#ff4081] font-bold text-sm md:text-base">{item.year}</span>
                      </motion.div>
                    </div>
                    <motion.div
                      className="bg-white p-4 md:p-6 rounded-lg shadow-md flex-1"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.6 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Static without animations */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unsere Werte</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Diese Grundsätze leiten unsere tägliche Arbeit und unser Engagement für unsere Kunden.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <div className="bg-gradient-to-br from-[#ff4081]/20 to-[#ff4081]/10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="text-[#ff4081]" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center text-sm md:text-base">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - Static without animations */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unser Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Lernen Sie die Profis kennen, die Ihren neuen Look Wirklichkeit werden lassen.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-56 md:h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ff4081]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 md:p-6">
                      <div className="text-white text-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-medium text-sm md:text-base">{member.bio}</p>
                        <div className="flex justify-center space-x-4 mt-4">
                          {member.social.map((social, i) => (
                            <a
                              key={i}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-white/80 transition-colors"
                            >
                              {social.icon === "IG" ? <Instagram size={18} /> : <Facebook size={18} />}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-[#ff4081] mb-2 text-sm md:text-base">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section with smooth fade-in */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unser Standort</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Wir befinden uns in einer zentralen und leicht zugänglichen Lage.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Map with gentle fade-in */}
              <div className="transition-opacity duration-1000 ease-in-out opacity-100">
                <div className="rounded-lg overflow-hidden shadow-lg h-[300px] md:h-[400px] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2724.064346044727!2d8.536927076938614!3d47.37436710898443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a01f1c6339f%3A0xd2d0e0d1f5eb9f8a!2sZ%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1683123456789!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Salon Standort"
                  ></iframe>
                </div>
              </div>

              <div className="transition-opacity duration-1000 ease-in-out opacity-100">
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-md h-full">
                  <h3 className="text-xl md:text-2xl font-bold mb-6">Kontaktinformationen</h3>
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-start">
                      <MapPin className="text-[#ff4081] mr-3 md:mr-4 mt-1" size={18} />
                      <div>
                        <h4 className="font-semibold mb-1">Adresse</h4>
                        <p className="text-gray-600 text-sm md:text-base">Hauptstraße 123, Stadt</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="text-[#ff4081] mr-3 md:mr-4 mt-1" size={18} />
                      <div>
                        <h4 className="font-semibold mb-1">Telefon</h4>
                        <p className="text-gray-600 text-sm md:text-base">+49 123 456 789</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="text-[#ff4081] mr-3 md:mr-4 mt-1" size={18} />
                      <div>
                        <h4 className="font-semibold mb-1">Öffnungszeiten</h4>
                        <p className="text-gray-600 text-sm md:text-base">Montag - Freitag: 9:00 - 20:00</p>
                        <p className="text-gray-600 text-sm md:text-base">Samstag: 9:00 - 18:00</p>
                        <p className="text-gray-600 text-sm md:text-base">Sonntag: Geschlossen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Optimized for earlier animation triggering */}
        <section className="py-20 bg-gradient-to-r from-[#ff4081] to-[#ff8db4] text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.8 }}
            >
              Bereit für eine Veränderung?
            </motion.h2>
            <motion.p
              className="text-white/90 max-w-2xl mx-auto mb-8 text-sm md:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Buchen Sie Ihren Termin noch heute und erleben Sie den BeautyStyle-Unterschied.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <a
                href="/reservar"
                className="inline-block bg-white text-[#ff4081] px-6 md:px-8 py-3 rounded-full text-base md:text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Jetzt buchen
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const values = [
  {
    title: "Exzellenz",
    description: "Wir bemühen uns, bei jedem Besuch den bestmöglichsten Service zu bieten.",
    icon: Award,
  },
  {
    title: "Personalisierung",
    description: "Jeder Kunde ist einzigartig, und so sollte auch sein Erlebnis in unserem Salon sein.",
    icon: Users,
  },
  {
    title: "Innovation",
    description: "Wir halten uns ständig über die neuesten Trends und Techniken auf dem Laufenden.",
    icon: Star,
  },
]

const timeline = [
  {
    year: "2010",
    title: "Die Gründung",
    description: "BeautyStyle öffnet seine Türen als kleiner Salon mit nur zwei Stylisten.",
  },
  {
    year: "2013",
    title: "Expansion",
    description: "Nach wachsendem Erfolg zieht der Salon in größere Räumlichkeiten um und erweitert sein Team.",
  },
  {
    year: "2016",
    title: "Auszeichnung",
    description: "BeautyStyle gewinnt den regionalen Preis für 'Bester Friseursalon des Jahres'.",
  },
  {
    year: "2019",
    title: "Neue Dienstleistungen",
    description: "Einführung einer kompletten Palette von Schönheitsbehandlungen und Spa-Services.",
  },
  {
    year: "2025",
    title: "Heute",
    description: "BeautyStyle ist zu einer anerkannten Marke mit einem Team von Experten geworden.",
  },
]

const team = [
  {
    name: "Maria Rodriguez",
    position: "Gründerin und Direktorin",
    bio: "Mit über 15 Jahren Erfahrung hat Maria mit den besten Marken der Branche zusammengearbeitet.",
    image:
      "https://beautystyle.lweb.ch/images/cheerful-girl-cashmere-sweater-laughs-against-backdrop-blossoming-sakura-portrait-woman-yellow-hoodie-city-spring.jpg",
    social: [
      { icon: "IG", url: "https://instagram.com" },
      { icon: "FB", url: "https://facebook.com" },
    ],
  },
  {
    name: "Carlos Gomez",
    position: "Senior Stylist",
    bio: "Als Spezialist für moderne Schnitte und Färbungen hat Carlos mehrere nationale Preise gewonnen.",
    image: "https://beautystyle.lweb.ch/images/close-up-portrait-young-smiling-man_171337-20064.jpg",
    social: [{ icon: "FB", url: "https://facebook.com" }],
  },
  {
    name: "Laura Martinez",
    position: "Coloristin",
    bio: "Laura ist Expertin für Färbetechniken und hat Dutzende von Fachleuten ausgebildet.",
    image: "https://beautystyle.lweb.ch/images/medium-shot-smiley-woman-holding-flowers_23-2149213138.jpg",
    social: [
      { icon: "IG", url: "https://instagram.com" },
      { icon: "FB", url: "https://facebook.com" },
    ],
  },
  {
    name: "Javier Sanchez",
    position: "Barbier",
    bio: "Javier kombiniert traditionelle Techniken mit modernen Trends, um einzigartige Looks zu kreieren.",
    image: "https://beautystyle.lweb.ch/images/man-with-backpack-walks-through-streets-amsterdam_1321-1769.jpg",
    social: [{ icon: "IG", url: "https://instagram.com" }],
  },
]
