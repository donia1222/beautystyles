"use client"

import type React from "react"

import { useState } from "react"
import Header from "~/components/header"
import Footer from "~/components/footer"
import { Calendar, Clock, User, Phone, Mail, CheckCircle } from "lucide-react"

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

  // Generieren von verfügbaren Zeiten für das Beispiel
  const availableTimes = []
  for (let hour = 9; hour < 20; hour++) {
    availableTimes.push(`${hour}:00`)
    if (hour < 19) {
      availableTimes.push(`${hour}:30`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = "Name ist erforderlich"
    if (!formData.email) newErrors.email = "E-Mail ist erforderlich"
    if (!formData.phone) newErrors.phone = "Telefonnummer ist erforderlich"
    if (!formData.service) newErrors.service = "Bitte wählen Sie einen Service"
    if (!formData.date) newErrors.date = "Datum ist erforderlich"
    if (!formData.time) newErrors.time = "Uhrzeit ist erforderlich"

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Termin buchen</h1>
              <p className="text-gray-600 text-lg mb-8">
                Buchen Sie Ihren Termin in wenigen Schritten und genießen Sie unsere professionellen Dienstleistungen.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md animate-slide-up">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Termin bestätigt!</h3>
                    <p className="text-gray-600 mb-6">
                      Vielen Dank für Ihre Buchung. Wir haben Ihnen eine E-Mail mit den Details Ihres Termins gesendet.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                      <h4 className="font-semibold mb-4">Buchungsdetails:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>
                          <span className="font-medium">Service:</span> {formData.service}
                        </li>
                        <li>
                          <span className="font-medium">Datum:</span> {formData.date}
                        </li>
                        <li>
                          <span className="font-medium">Uhrzeit:</span> {formData.time}
                        </li>
                        <li>
                          <span className="font-medium">Name:</span> {formData.name}
                        </li>
                        <li>
                          <span className="font-medium">E-Mail:</span> {formData.email}
                        </li>
                        <li>
                          <span className="font-medium">Telefon:</span> {formData.phone}
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Einen weiteren Termin buchen
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Geben Sie Ihre Daten ein</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="service" className="block text-gray-700 mb-2">
                            Service *
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                              errors.service ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Service auswählen</option>
                            <option value="Damenhaarschnitt">Damenhaarschnitt</option>
                            <option value="Herrenhaarschnitt">Herrenhaarschnitt</option>
                            <option value="Haarfärbung">Haarfärbung</option>
                            <option value="Strähnchen">Strähnchen</option>
                            <option value="Balayage">Balayage</option>
                            <option value="Haarbehandlung">Haarbehandlung</option>
                            <option value="Spezielle Frisur">Spezielle Frisur</option>
                            <option value="Barbier">Barbier</option>
                          </select>
                          {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                        </div>

                        <div>
                          <label htmlFor="stylist" className="block text-gray-700 mb-2">
                            Stylist (Optional)
                          </label>
                          <select
                            id="stylist"
                            name="stylist"
                            value={formData.stylist}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Jeder verfügbare Stylist</option>
                            <option value="Maria Rodriguez">Maria Rodriguez</option>
                            <option value="Carlos Gomez">Carlos Gomez</option>
                            <option value="Laura Martinez">Laura Martinez</option>
                            <option value="Javier Sanchez">Javier Sanchez</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="date" className="block text-gray-700 mb-2">
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
                              className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                errors.date ? "border-red-500" : "border-gray-300"
                              }`}
                            />
                          </div>
                          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                        </div>

                        <div>
                          <label htmlFor="time" className="block text-gray-700 mb-2">
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
                              className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                errors.time ? "border-red-500" : "border-gray-300"
                              }`}
                            >
                              <option value="">Uhrzeit auswählen</option>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 mb-2">
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
                              className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                errors.name ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="Ihr Name"
                            />
                          </div>
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-gray-700 mb-2">
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
                              className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                errors.phone ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="Ihre Telefonnummer"
                            />
                          </div>
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">
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
                            className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Ihre E-Mail"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="notes" className="block text-gray-700 mb-2">
                          Zusätzliche Notizen
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Zusätzliche Informationen, die wir wissen sollten"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center"
                      >
                        {isSubmitting ? <span>Verarbeitung...</span> : <span>Termin bestätigen</span>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
