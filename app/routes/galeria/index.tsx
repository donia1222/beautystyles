"use client"

import { json } from "@remix-run/node"
import { useLoaderData, useNavigation, useNavigate } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/node"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Header from "~/components/header"
import Footer from "~/components/footer"
import { Search, ZoomIn, X, ChevronLeft, ChevronRight, Scissors } from "lucide-react"

type TextItem = {
  id: number
  text_key: string
  section: string
  text_value: string
}

type ImageItem = {
  id: number
  src: string
  alt: string
  category: string
}

type Category = { label: string; value: string; count: number }

type LoaderData = {
  selectedCategory: string
  categories: Category[]
  images: ImageItem[]
  texts: TextItem[]
}

// Cambia este valor al dominio donde están tus imágenes
const IMAGE_HOST = "https://beautystyle.lweb.ch"

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const selectedCategory = url.searchParams.get("category") || "alle"

  // 1) Obtener textos desde el endpoint
  const textsRes = await fetch(`${IMAGE_HOST}/gallery/admin/obtener_textos.php`)
  const textsJson = await textsRes.json()
  const texts: TextItem[] = textsJson.texts || []

  // 2) Obtener imágenes filtradas
  const imagesRes = await fetch(`${IMAGE_HOST}/gallery/admin/obtener_imagenes.php?category=${selectedCategory}`)
  const imagesJson = await imagesRes.json()
  const images: ImageItem[] = imagesJson.images || []

  // 3) Definir categorías y contarlos
  const baseCats = [
    { label: "Alle", value: "alle" },
    { label: "Haarschnitte", value: "haarschnitte" },
    { label: "Farbe", value: "farbe" },
    { label: "Frisuren", value: "frisuren" },
    { label: "Behandlungen", value: "behandlungen" },
  ]
  const categories: Category[] = baseCats.map((cat) => ({
    ...cat,
    count: cat.value === "alle" ? images.length : images.filter((img) => img.category === cat.value).length,
  }))

  return json<LoaderData>({ selectedCategory, categories, images, texts })
}

export default function Galeria() {
  const { selectedCategory, categories, images, texts } = useLoaderData<LoaderData>()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const isLoading = navigation.state === "loading"

  // Estado para el lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>(images)

  // Referencias para animaciones basadas en scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"],
  })

  // Transformaciones basadas en scroll
  const scissorsRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scissorsScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  // Efecto para filtrar imágenes por búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredImages(images)
    } else {
      const filtered = images.filter(
        (img) =>
          img.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          img.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredImages(filtered)
    }
  }, [searchTerm, images])

  // Textos del hero con claves actualizadas
  const heroTitle = texts.find((t) => t.text_key === "gallery_title")?.text_value || "Unsere Galerie"
  const heroSubtitle =
    texts.find((t) => t.text_key === "gallery_description")?.text_value || "Entdecken Sie unsere besten Arbeiten."

  // Función para cambiar de categoría sin recargar la página
  const handleCategoryChange = (category: string) => {
    navigate(`?category=${category}`, { preventScrollReset: true })
  }

  // Funciones para el lightbox
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden" // Prevenir scroll
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto" // Restaurar scroll
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  // Manejar teclas para el lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return

      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, filteredImages.length])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section con Parallax */}
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          {/* Partículas decorativas */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-rose-500"
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

          <motion.div
            className="container mx-auto px-4 text-center max-w-3xl relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {heroTitle}
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heroSubtitle}
            </motion.p>

          </motion.div>
        </section>

        {/* Sección con animación basada en scroll - TEXTO CENTRADO */}
        <div
          ref={scrollContainerRef}
          className="relative py-16 overflow-hidden bg-gradient-to-r from-rose-50 to-pink-50 flex items-center justify-center"
        >
          {/* Texto flotante CENTRADO que se mueve con el scroll */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div
              className="text-8xl font-bold text-rose-100 whitespace-nowrap"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              BEAUTY • STYLE • ELEGANZ • PERFEKTION • QUALITÄT • INNOVATION • BEAUTY • STYLE • ELEGANZ • PERFEKTION •
              QUALITÄT • INNOVATION •
            </motion.div>
          </div>

          {/* Elemento decorativo que rota con el scroll */}
          <motion.div
            className="relative z-10 text-rose-400"
            style={{
              rotate: scissorsRotate,
              scale: scissorsScale,
            }}
          >
            <Scissors size={80} strokeWidth={1} />
          </motion.div>
        </div>

        {/* Gallery Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Filtros SIN ANIMACIÓN y SIN NÚMEROS */}
            <div className="text-center mb-4 text-sm text-gray-500">
              Aktive Kategorie: <strong>{selectedCategory}</strong> | <strong>{filteredImages.length}</strong> Bilder
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedCategory === cat.value
                      ? "bg-rose-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Galería de imágenes con transición fade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {isLoading ? (
                  // Esqueletos de carga
                  Array.from({ length: 8 }).map((_, index) => (
                    <div key={`skeleton-${index}`} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
                  ))
                ) : filteredImages.length > 0 ? (
                  filteredImages.map((img, index) => {
                    // Construir URL absoluta de la imagen
                    const imageUrl = img.src.startsWith("http") ? img.src : `${IMAGE_HOST}${img.src}`

                    return (
                      <div
                        key={img.id}
                        className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer hover:shadow-xl transition-shadow duration-300"
                        onClick={() => openLightbox(index)}
                      >
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt={img.alt}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => (e.currentTarget.src = "/hair-salon-interior.png")}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <p className="text-white text-center font-medium">{img.alt}</p>
                          <div className="flex justify-center mt-2">
                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
                              <ZoomIn size={18} className="text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">Keine Bilder in dieser Kategorie gefunden.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && filteredImages.length > 0 && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="absolute top-4 right-4 text-white hover:text-gray-300 z-10" onClick={closeLightbox}>
              <X size={32} />
            </button>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              className="relative max-w-4xl max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={
                  filteredImages[currentImageIndex].src.startsWith("http")
                    ? filteredImages[currentImageIndex].src
                    : `${IMAGE_HOST}${filteredImages[currentImageIndex].src}`
                }
                alt={filteredImages[currentImageIndex].alt}
                className="max-h-[80vh] max-w-full object-contain"
                onError={(e) => (e.currentTarget.src = "/hair-salon-interior.png")}
              />

              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center">
                <p>{filteredImages[currentImageIndex].alt}</p>
                <p className="text-sm text-gray-300 mt-1">
                  {currentImageIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
