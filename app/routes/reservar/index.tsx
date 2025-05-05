"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import Header from "~/components/header"
import Footer from "~/components/footer"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  ChevronRight,
  Sparkles,
  CalendarDays,
  Scissors,
  Heart,
  Star,
} from "lucide-react"

export default function Termin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    stylist: "",
    date: "",
    time: "",
    notes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [activeStep, setActiveStep] = useState(1)

  // Referencias para efectos de scroll
  const formRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const isFormInView = useInView(formRef, { once: false, amount: 0.2 })

  // Scroll con paralaje
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  // Referencias para las valoraciones
  const reviewsRef = useRef<HTMLDivElement>(null)
  const isReviewsInView = useInView(reviewsRef, { once: false, amount: 0.2 })

  // Efecto para simular fechas populares
  const [popularDates, setPopularDates] = useState<string[]>([])
  useEffect(() => {
    const today = new Date()
    const dates = []
    for (let i = 1; i <= 10; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i + Math.floor(Math.random() * 14))
      dates.push(date.toISOString().split("T")[0])
    }
    setPopularDates(dates)
  }, [])

  // Calcular tiempos disponibles
  const generateAvailableTimes = () => {
    const times = []
    for (let hour = 9; hour < 20; hour++) {
      times.push(`${hour}:00`)
      if (hour < 19) {
        times.push(`${hour}:30`)
      }
    }
    return times
  }

  const availableTimes = generateAvailableTimes()

  // Validar formulario
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.service) newErrors.service = "Bitte wählen Sie einen Service"
      if (!formData.date) newErrors.date = "Datum ist erforderlich"
      if (!formData.time) newErrors.time = "Uhrzeit ist erforderlich"
    } else if (step === 2) {
      if (!formData.name) newErrors.name = "Name ist erforderlich"
      if (!formData.email) newErrors.email = "E-Mail ist erforderlich"
      if (!formData.phone) newErrors.phone = "Telefonnummer ist erforderlich"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar cambio de paso
  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1)
      window.scrollTo({ top: formRef.current?.offsetTop || 0, behavior: "smooth" })
    }
  }

  const handlePrevStep = () => {
    setActiveStep(activeStep - 1)
  }

  // Manejar cambio de campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(2)) return

    setIsSubmitting(true)

    // Simulación de carga
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setFormSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Reiniciar formulario
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      stylist: "",
      date: "",
      time: "",
      notes: "",
    })
    setFormSubmitted(false)
    setActiveStep(1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section con Parallax */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-r from-rose-50 via-white to-pink-50">
          {/* Elementos decorativos */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
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
            <div className="flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative inline-block mb-6"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff4081] to-[#ff8db4] rounded-full blur-sm opacity-70"></div>
                <div className="relative bg-white p-3 rounded-full">
                  <CalendarDays size={28} className="text-[#ff4081]" />
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff4081] to-[#f44582]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Termin buchen
              </motion.h1>

              <motion.p
                className="text-gray-600 text-lg mb-8 text-center max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Buchen Sie Ihren Termin in wenigen Schritten und genießen Sie unsere professionellen Dienstleistungen.
              </motion.p>

              {!formSubmitted && (
                <button
                  className="bg-[#ff4081] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#ff4081]/90 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
                  onClick={() => {
                    window.scrollTo({ top: formRef.current?.offsetTop || 0, behavior: "smooth" })
                  }}
                >
                  <Sparkles size={18} className="mr-2" />
                  Jetzt Termin vereinbaren
                </button>
              )}
            </div>
          </div>
        </section>


        {/* Booking Form Section */}
        <section className="py-20 bg-gray-50" ref={formRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg overflow-hidden"
                style={{
                  opacity: isFormInView ? 1 : 0,
                  transform: isFormInView ? "translateY(0)" : "translateY(50px)",
                  transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1)",
                }}
              >
                {formSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative inline-block mb-6">
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur-md opacity-70 animate-pulse"></div>
                      <div className="relative bg-white p-4 rounded-full">
                        <CheckCircle size={64} className="text-green-500" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Termin bestätigt!</h3>
                    <p className="text-gray-600 mb-6">
                      Vielen Dank für Ihre Buchung. Wir haben Ihnen eine E-Mail mit den Details Ihres Termins gesendet.
                    </p>
                    <motion.div
                      className="bg-gray-50 p-6 rounded-lg mb-6 text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h4 className="font-semibold mb-4">Buchungsdetails:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                          <Scissors className="text-[#ff4081] mr-2" size={16} />
                          <span className="font-medium">Service:</span> <span className="ml-1">{formData.service}</span>
                        </li>
                        <li className="flex items-center">
                          <Calendar className="text-[#ff4081] mr-2" size={16} />
                          <span className="font-medium">Datum:</span> <span className="ml-1">{formData.date}</span>
                        </li>
                        <li className="flex items-center">
                          <Clock className="text-[#ff4081] mr-2" size={16} />
                          <span className="font-medium">Uhrzeit:</span> <span className="ml-1">{formData.time}</span>
                        </li>
                        <li className="flex items-center">
                          <User className="text-[#ff4081] mr-2" size={16} />
                          <span className="font-medium">Name:</span> <span className="ml-1">{formData.name}</span>
                        </li>
                        <li className="flex items-center">
                          <Mail className="text-[#ff4081] mr-2" size={16} />
                          <span className="font-medium">E-Mail:</span> <span className="ml-1">{formData.email}</span>
                        </li>
                        <li className="flex items-center">
                          <Phone className="text-[#ff4081] mr-2" size={16} />
                          <span className="font-medium">Telefon:</span> <span className="ml-1">{formData.phone}</span>
                        </li>
                      </ul>
                    </motion.div>
                    <motion.button
                      onClick={resetForm}
                      className="bg-[#ff4081] text-white px-6 py-3 rounded-full hover:bg-[#ff4081]/90 transition-colors shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      Einen weiteren Termin buchen
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    {/* Steps Progress Bar */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2 items-center">
                          <div
                            className={`rounded-full h-8 w-8 flex items-center justify-center ${
                              activeStep >= 1 ? "bg-[#ff4081] text-white" : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            1
                          </div>
                          <span className={activeStep >= 1 ? "text-gray-800 font-medium" : "text-gray-500"}>
                            Zeitpunkt & Service
                          </span>
                        </div>
                        <div className="h-1 w-10 bg-gray-200 mx-1">
                          <div className="h-full bg-[#ff4081]" style={{ width: activeStep >= 2 ? "100%" : "0%" }}></div>
                        </div>
                        <div className="flex space-x-2 items-center">
                          <div
                            className={`rounded-full h-8 w-8 flex items-center justify-center ${
                              activeStep >= 2 ? "bg-[#ff4081] text-white" : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            2
                          </div>
                          <span className={activeStep >= 2 ? "text-gray-800 font-medium" : "text-gray-500"}>
                            Persönliche Daten
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#ff4081] transition-all duration-500"
                          style={{ width: `${(activeStep / 2) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Form Steps */}
                    <AnimatePresence mode="wait">
                      {activeStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h2 className="text-2xl font-bold mb-6">Wählen Sie einen Service und Zeitpunkt</h2>

                          <div className="space-y-6">
                            <div>
                              <label htmlFor="service" className="block text-gray-700 mb-2 font-medium">
                                Service *
                              </label>
                              <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] ${
                                  errors.service ? "border-red-500" : "border-gray-300"
                                }`}
                              >
                                <option value="">Service auswählen</option>
                                {services.map((service, index) => (
                                  <option key={index} value={service.name}>
                                    {service.name} - {service.price} CHF
                                  </option>
                                ))}
                              </select>
                              {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                            </div>

                            <div>
                              <label htmlFor="stylist" className="block text-gray-700 mb-2 font-medium">
                                Stylist (Optional)
                              </label>
                              <select
                                id="stylist"
                                name="stylist"
                                value={formData.stylist}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081]"
                              >
                                <option value="">Jeder verfügbare Stylist</option>
                                {stylists.map((stylist, index) => (
                                  <option key={index} value={stylist.name}>
                                    {stylist.name} - {stylist.specialty}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="date" className="block text-gray-700 mb-2 font-medium">
                                  Datum *
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Calendar size={18} className="text-gray-500" />
                                  </div>
                                  <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split("T")[0]}
                                    className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] ${
                                      errors.date ? "border-red-500" : "border-gray-300"
                                    }`}
                                  />
                                </div>
                                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}

                                {/* Popular dates indicator */}
                                {popularDates.includes(formData.date) && (
                                  <div className="mt-2 text-sm text-[#ff4081] flex items-center animate-pulse">
                                    <Heart size={14} className="mr-1" /> Beliebtes Datum - schnell buchen!
                                  </div>
                                )}
                              </div>

                              <div>
                                <label htmlFor="time" className="block text-gray-700 mb-2 font-medium">
                                  Uhrzeit *
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Clock size={18} className="text-gray-500" />
                                  </div>
                                  <select
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] ${
                                      errors.time ? "border-red-500" : "border-gray-300"
                                    }`}
                                  >
                                    <option value=""></option>
                                    {availableTimes.map((time) => (
                                      <option key={time} value={time}>
                                        {time}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                              </div>
                            </div>

                            <motion.button
                              type="button"
                              onClick={handleNextStep}
                              className="w-full bg-[#ff4081] text-white px-6 py-3 rounded-full hover:bg-[#ff4081]/90 transition-colors flex items-center justify-center mt-6"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span>Weiter</span>
                              <ChevronRight className="ml-1" size={18} />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {activeStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h2 className="text-2xl font-bold mb-6">Ihre Kontaktdaten</h2>

                          <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                                  Vollständiger Name *
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <User size={18} className="text-gray-500" />
                                  </div>
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] ${
                                      errors.name ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Ihr Name"
                                  />
                                </div>
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                              </div>

                              <div>
                                <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
                                  Telefon *
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Phone size={18} className="text-gray-500" />
                                  </div>
                                  <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] ${
                                      errors.phone ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Ihre Telefonnummer"
                                  />
                                </div>
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                              </div>
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                                E-Mail *
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <Mail size={18} className="text-gray-500" />
                                </div>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                  }`}
                                  placeholder="Ihre E-Mail"
                                />
                              </div>
                              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                              <label htmlFor="notes" className="block text-gray-700 mb-2 font-medium">
                                Zusätzliche Notizen
                              </label>
                              <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081]"
                                placeholder="Zusätzliche Informationen, die wir wissen sollten"
                              ></textarea>
                            </div>

                            <div className="flex space-x-4">
                              <motion.button
                                type="button"
                                onClick={handlePrevStep}
                                className="w-1/2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <ChevronRight className="mr-1 rotate-180" size={18} />
                                <span>Zurück</span>
                              </motion.button>
                              <motion.button
                                type="submit"
                                className="w-1/2 bg-[#ff4081] text-white px-6 py-3 rounded-full hover:bg-[#ff4081]/90 transition-colors flex items-center justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <span>Verarbeitung...</span>
                                ) : (
                                  <>
                                    <span>Termin bestätigen</span>
                                    <CheckCircle className="ml-1" size={18} />
                                  </>
                                )}
                              </motion.button>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Selected Service Preview */}
                    {formData.service && formData.date && formData.time && (
                      <motion.div
                        className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h3 className="font-semibold mb-2 text-gray-700">Ihre Auswahl:</h3>
                        <div className="flex flex-wrap gap-2">
                          <div className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200 flex items-center">
                            <Scissors className="text-[#ff4081] mr-1" size={14} /> {formData.service}
                          </div>
                          <div className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200 flex items-center">
                            <Calendar className="text-[#ff4081] mr-1" size={14} /> {formData.date}
                          </div>
                          <div className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200 flex items-center">
                            <Clock className="text-[#ff4081] mr-1" size={14} /> {formData.time}
                          </div>
                          {formData.stylist && (
                            <div className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200 flex items-center">
                              <User className="text-[#ff4081] mr-1" size={14} /> {formData.stylist}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reviews Section with Parallax */}
        <section className="py-20 bg-white" ref={reviewsRef}>
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Was unsere Kunden sagen</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Erfahren Sie, warum unsere Kunden immer wieder zu uns zurückkommen.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  style={{
                    opacity: isReviewsInView ? 1 : 0,
                    transform: isReviewsInView ? "translateY(0)" : "translateY(30px)",
                    transition: `all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${index * 0.1}s`,
                  }}
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                  <div className="flex items-center mt-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="font-semibold text-gray-500">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#ff4081] to-[#f55c91] text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Bereit für eine Veränderung?
            </motion.h2>
            <motion.p
              className="text-white/90 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Buchen Sie Ihren Termin noch heute und erleben Sie den BeautyStyle-Unterschied.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <a
                href="/kontakt"
                className="inline-block bg-white text-[#ff4081] px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Kontakt aufnehmen
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const steps = [
  {
    title: "Service auswählen",
    description: "Wählen Sie den gewünschten Service aus unserem vielfältigen Angebot aus.",
  },
  {
    title: "Datum und Uhrzeit wählen",
    description: "Wählen Sie einen für Sie passenden Termin aus unseren verfügbaren Zeitfenstern.",
  },
  {
    title: "Bestätigung erhalten",
    description: "Erhalten Sie eine sofortige Bestätigung und freuen Sie sich auf Ihren Termin.",
  },
]

const services = [
  { name: "Damenhaarschnitt", price: "65" },
  { name: "Herrenhaarschnitt", price: "45" },
  { name: "Kinderhaarschnitt", price: "35" },
  { name: "Haarfärbung", price: "85" },
  { name: "Strähnchen", price: "120" },
  { name: "Balayage", price: "150" },
  { name: "Haarbehandlung", price: "70" },
  { name: "Keratin-Behandlung", price: "140" },
  { name: "Brautfrisur", price: "180" },
  { name: "Event-Hochsteckfrisur", price: "130" },
  { name: "Bartschnitt & Pflege", price: "35" },
  { name: "Traditionelle Rasur", price: "50" },
]

const stylists = [
  { name: "Maria Rodriguez", specialty: "Färbung & Styling" },
  { name: "Carlos Gomez", specialty: "Herrenhaarschnitte" },
  { name: "Laura Martinez", specialty: "Coloristin" },
  { name: "Javier Sanchez", specialty: "Barbier" },
]

const reviews = [
  {
    name: "Sophie Müller",
    rating: 5,
    text: "Ich gehe seit Jahren zu BeautyStyle und bin immer begeistert! Maria ist eine Künstlerin mit Haaren und das gesamte Team ist sehr professionell und freundlich.",
    date: "15.04.2023",
  },
  {
    name: "Thomas Weber",
    rating: 5,
    text: "Zum ersten Mal dort gewesen und direkt überzeugt. Carlos hat meine Haare perfekt geschnitten und mir tolle Tipps zur Pflege gegeben.",
    date: "22.03.2023",
  },
  {
    name: "Lisa Schmidt",
    rating: 4,
    text: "Die Balayage, die Laura für mich gemacht hat, ist fantastisch! Genau das, was ich mir vorgestellt habe. Der einzige Grund für 4 statt 5 Sterne ist die Wartezeit.",
    date: "08.05.2023",
  },
]
