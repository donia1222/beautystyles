import type { MetaFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import Header from "~/components/header"
import Footer from "~/components/footer"
import { ChevronRight } from "lucide-react"

export const meta: MetaFunction = () => {
  return [
    { title: "Dienstleistungen - BeautyStyle" },
    { name: "description", content: "Entdecken Sie alle unsere Friseur- und Schönheitsdienstleistungen" },
  ]
}

export default function Servicios() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Unsere Dienstleistungen</h1>
              <p className="text-gray-600 text-lg mb-8">
                Wir bieten eine breite Palette von Friseur- und Schönheitsdienstleistungen, um alle Ihre Bedürfnisse zu
                erfüllen.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                    <p className="text-gray-600 mb-5">{service.description}</p>

                    {/* Enhanced Price List */}
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

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unser Prozess</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Wir bieten Ihnen bei jedem Besuch ein umfassendes und personalisiertes Erlebnis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative">
                    <div className="bg-[#e91e63] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative shadow-md">
                      <span className="text-xl font-bold">{index + 1}</span>
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20  bg-gradient-to-r from-[#ff4081] to-[#fa4b86] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">Bereit zu buchen?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Vereinbaren Sie noch heute einen Termin und genießen Sie unsere professionellen Dienstleistungen.
            </p>
            <Link
              to="/reservar"
              className="inline-block bg-white text-[#e91e63] px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors animate-slide-up shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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

const services = [
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

const process = [
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
