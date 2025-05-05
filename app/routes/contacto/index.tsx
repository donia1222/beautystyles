"use client"

import type React from "react"
import { useState } from "react"
import Header from "~/components/header"
import Footer from "~/components/footer"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = "Name ist erforderlich"
    if (!formData.email) newErrors.email = "E-Mail ist erforderlich"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein"
    if (!formData.message) newErrors.message = "Nachricht ist erforderlich"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulieren einer Verzögerung für den Ladezustand
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setFormSubmitted(true)
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // FAQ Data
  const faqItems = [
    {
      question: "Muss ich einen Termin vereinbaren?",
      answer:
        "Ja, wir empfehlen Ihnen, einen Termin zu vereinbaren, um Wartezeiten zu vermeiden. Sie können einen Termin telefonisch, per E-Mail oder über unser Online-Buchungssystem vereinbaren.",
    },
    {
      question: "Wie kann ich einen Termin stornieren oder verschieben?",
      answer:
        "Termine können bis zu 24 Stunden vor dem vereinbarten Zeitpunkt kostenlos storniert oder verschoben werden. Bitte kontaktieren Sie uns telefonisch oder per E-Mail, um Änderungen vorzunehmen.",
    },
    {
      question: "Welche Zahlungsmethoden akzeptieren Sie?",
      answer:
        "Wir akzeptieren Barzahlung, EC-Karte, Kreditkarte (Visa, Mastercard) sowie kontaktlose Zahlungen via Apple Pay und Google Pay.",
    },
    {
      question: "Bieten Sie Geschenkgutscheine an?",
      answer:
        "Ja, wir bieten Geschenkgutscheine in verschiedenen Werten an. Diese können Sie direkt in unserem Salon erwerben oder online bestellen und per E-Mail erhalten.",
    },
    {
      question: "Welche Haarprodukte verwenden Sie?",
      answer:
        "Wir arbeiten ausschließlich mit hochwertigen Produkten renommierter Marken wie Wella, L'Oréal Professional, Kérastase und Redken. Alle verwendeten Produkte können Sie auch bei uns im Salon erwerben.",
    },
    {
      question: "Kann ich ohne Termin vorbeikommen?",
      answer:
        "Grundsätzlich ist ein Besuch ohne Termin möglich, jedoch können wir bei hoher Auslastung nicht garantieren, dass wir Sie sofort bedienen können. Für eine optimale Planung empfehlen wir daher eine Terminvereinbarung.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontakt</h1>
              <p className="text-gray-600 text-lg mb-8">
                Wir sind hier, um alle Ihre Fragen zu beantworten. Zögern Sie nicht, uns zu kontaktieren.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-md animate-slide-up">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Nachricht gesendet!</h3>
                    <p className="text-gray-600 mb-6">
                      Vielen Dank für Ihre Kontaktaufnahme. Wir werden Ihnen so schnell wie möglich antworten.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="bg-[#ff4081] text-white px-6 py-3 rounded-full hover:bg-[#ff4081]/90 transition-colors"
                    >
                      Weitere Nachricht senden
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Senden Sie uns eine Nachricht</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 mb-2">
                          Vollständiger Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Ihr Name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                          E-Mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Ihre E-Mail"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-gray-700 mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081]"
                          placeholder="Ihre Telefonnummer (optional)"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-gray-700 mb-2">
                          Nachricht *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] ${
                            errors.message ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Wie können wir Ihnen helfen?"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#ff4081] text-white px-6 py-3 rounded-full hover:bg-[#ff4081]/90 transition-colors flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <span>Wird gesendet...</span>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            <span>Nachricht senden</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Contact Info */}
              <div className="animate-slide-in-right">
                <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                  <h2 className="text-2xl font-bold mb-6">Kontaktinformationen</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="text-[#ff4081] mr-4 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold mb-1">Adresse</h4>
                        <p className="text-gray-600">Hauptstraße 123, Stadt</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="text-[#ff4081] mr-4 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold mb-1">Telefon</h4>
                        <p className="text-gray-600">+49 123 456 789</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="text-[#ff4081] mr-4 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold mb-1">E-Mail</h4>
                        <p className="text-gray-600">info@beautystyle.de</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="text-[#ff4081] mr-4 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold mb-1">Öffnungszeiten</h4>
                        <p className="text-gray-600">Montag - Freitag: 9:00 - 20:00</p>
                        <p className="text-gray-600">Samstag: 9:00 - 18:00</p>
                        <p className="text-gray-600">Sonntag: Geschlossen</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">Folgen Sie uns</h2>
                  <p className="text-gray-600 mb-4">
                    Bleiben Sie über unsere neuesten Nachrichten und Angebote auf dem Laufenden, indem Sie uns in den
                    sozialen Medien folgen.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://instagram.com"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-3 rounded-full transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <Instagram size={24} />
                    </a>
                    <a
                      href="https://facebook.com"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-3 rounded-full transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <Facebook size={24} />
                    </a>
                    <a
                      href="https://twitter.com"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-3 rounded-full transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <Twitter size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block p-3 rounded-full bg-[#ff4081]/10 mb-4">
                <HelpCircle className="text-[#ff4081]" size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Häufig gestellte Fragen</h2>
              <p className="text-gray-600">
                Hier finden Sie Antworten auf die am häufigsten gestellten Fragen. Falls Sie weitere Fragen haben,
                kontaktieren Sie uns gerne direkt.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-semibold text-lg">{item.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="text-[#ff4081]" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-2">{item.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">Haben Sie eine Frage, die hier nicht beantwortet wird?</p>
              <a
                href="#contact-form"
                className="inline-flex items-center bg-[#ff4081] text-white px-6 py-3 rounded-full hover:bg-[#ff4081]/90 transition-colors"
              >
                <Mail size={18} className="mr-2" />
                Kontaktieren Sie uns
              </a>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Besuchen Sie uns</h2>
              <p className="text-gray-600">
                Wir freuen uns darauf, Sie in unserem Salon begrüßen zu dürfen. Hier finden Sie uns:
              </p>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg h-[400px] relative">
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
