// app/routes/UeberUns.tsx

import React from "react";
import Header from "~/components/header";
import Footer from "~/components/footer";
import { Award, Clock, MapPin, Phone, Instagram, Facebook } from "lucide-react";

export default function UeberUns() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Über Uns</h1>
              <p className="text-gray-600 text-lg mb-8">
                Erfahren Sie mehr über die Geschichte von BeautyStyle und unser Engagement für Schönheit und Wohlbefinden.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-right">
                <img
                  src="https://beautystyle.lweb.ch/images/hairdresser-cut-hair-her-client-hair-salon_1157-27198.jpg"
                  alt="Unser Salon"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="animate-slide-up">
                <h2 className="text-3xl font-bold mb-6">Unsere Geschichte</h2>
                <p className="text-gray-600 mb-4">
                  BeautyStyle wurde 2010 mit einer klaren Vision gegründet: einen Ort zu schaffen, an dem Schönheit und Wohlbefinden zusammenkommen, um unseren Kunden ein einzigartiges Erlebnis zu bieten.
                </p>
                <p className="text-gray-600 mb-4">
                  Gegründet von Maria Rodriguez, einer Stylistin mit über 15 Jahren Erfahrung in der Branche, begann unser Salon als kleiner Raum im Stadtzentrum und hat sich zu einer Referenz für modernes Friseurhandwerk entwickelt.
                </p>
                <p className="text-gray-600 mb-4">
                  Im Laufe der Jahre haben wir ein Team von Fachleuten aufgebaut, die ihre Arbeit lieben und sich der Exzellenz verschrieben haben. Wir halten uns ständig über die neuesten Trends und Techniken auf dem Laufenden, um Ihnen immer das Beste zu bieten.
                </p>
                <p className="text-gray-600">
                  Bei BeautyStyle kümmern wir uns nicht nur um Ihr Aussehen, sondern auch um Ihr Wohlbefinden. Wir verwenden hochwertige Produkte, die umweltfreundlich und tierversuchsfrei sind, weil wir glauben, dass Schönheit verantwortungsvoll sein sollte.
                </p>
              </div>
            </div>
          </div>
        </section>

       
        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unser Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Lernen Sie die Profis kennen, die Ihren neuen Look Wirklichkeit werden lassen.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary mb-3">{member.position}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-4">
                      {member.social.map((social, i) => {
                        return (
                          <a
                            key={i}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-primary transition-colors"
                          >
                            {social.icon === 'IG' ? <Instagram size={24} /> : <Facebook size={24} />}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unser Standort</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Wir befinden uns in einer zentralen und leicht zugänglichen Lage.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Hier: Zürich Karte */}
              <div className="animate-slide-in-right">
                <div className="bg-gray-200 rounded-lg overflow-hidden h-96 relative">
                  <img
                    src="https://beautystyle.lweb.ch/images/zurich.png"
                    alt="Karte von Zürich"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <MapPin size={48} className="text-primary drop-shadow-lg" />
                  </div>
                </div>
              </div>

              <div className="animate-slide-up">
                <div className="bg-white p-8 rounded-lg shadow-md h-full">
                  <h3 className="text-2xl font-bold mb-6">Kontaktinformationen</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="text-primary mr-4 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold mb-1">Adresse</h4>
                        <p className="text-gray-600">Hauptstraße 123, Stadt</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="text-primary mr-4 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold mb-1">Telefon</h4>
                        <p className="text-gray-600">+49 123 456 789</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="text-primary mr-4 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold mb-1">Öffnungszeiten</h4>
                        <p className="text-gray-600">Montag - Freitag: 9:00 - 20:00</p>
                        <p className="text-gray-600">Samstag: 9:00 - 18:00</p>
                        <p className="text-gray-600">Sonntag: Geschlossen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
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
    icon: Award,
  },
  {
    title: "Innovation",
    description: "Wir halten uns ständig über die neuesten Trends und Techniken auf dem Laufenden.",
    icon: Award,
  },
];

const team = [
  {
    name: "Maria Rodriguez",
    position: "Gründerin und Direktorin",
    bio: "Mit über 15 Jahren Erfahrung hat Maria mit den besten Marken der Branche zusammengearbeitet.",
    image: "https://beautystyle.lweb.ch/images/cheerful-girl-cashmere-sweater-laughs-against-backdrop-blossoming-sakura-portrait-woman-yellow-hoodie-city-spring.jpg",
    social: [
      { icon: "IG", url: "https://instagram.com" },
      { icon: "FB", url: "https://facebook.com" }
    ],
  },
  {
    name: "Carlos Gomez",
    position: "Senior Stylist",
    bio: "Als Spezialist für moderne Schnitte und Färbungen hat Carlos mehrere nationale Preise gewonnen.",
    image: "https://beautystyle.lweb.ch/images/close-up-portrait-young-smiling-man_171337-20064.jpg",
    social: [
 
      { icon: "FB", url: "https://facebook.com" }
    ],
  },
  {
    name: "Laura Martinez",
    position: "Coloristin",
    bio: "Laura ist Expertin für Färbetechniken und hat Dutzende von Fachleuten ausgebildet.",
    image: "https://beautystyle.lweb.ch/images/medium-shot-smiley-woman-holding-flowers_23-2149213138.jpg",
    social: [
      { icon: "IG", url: "https://instagram.com" },
      { icon: "FB", url: "https://facebook.com" }
    ],
  },
  {
    name: "Javier Sanchez",
    position: "Barbier",
    bio: "Javier kombiniert traditionelle Techniken mit modernen Trends, um einzigartige Looks zu kreieren.",
    image: "https://beautystyle.lweb.ch/images/man-with-backpack-walks-through-streets-amsterdam_1321-1769.jpg",
    social: [
      { icon: "IG", url: "https://instagram.com" },

    ],
  },
];
