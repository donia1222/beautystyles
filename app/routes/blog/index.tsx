"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "@remix-run/react"
import Header from "~/components/header"
import Footer from "~/components/footer"
import { Search, Clock, Calendar, Sparkles, TrendingUp, Scissors, X } from "lucide-react"

// Importamos los estilos CSS
import "~/styles/animations.css"

// Tipos
interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
  publishedAt: string
  readTime: number
  imageUrl: string
  featured: boolean
  likes: number
  comments: number
}

// Datos de ejemplo para el blog
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Die neuesten Haartrends für den Sommer 2025",
    excerpt:
      "Entdecken Sie die angesagtesten Haartrends für die kommende Sommersaison. Von lebendigen Farben bis zu mühelosen Schnitten.",
    content: "",
    category: "Trends",
    tags: ["Sommer", "Haartrends", "Farben", "Schnitte"],
    author: {
      name: "Maria Rodriguez",
      avatar:
        "https://beautystyle.lweb.ch/images/cheerful-girl-cashmere-sweater-laughs-against-backdrop-blossoming-sakura-portrait-woman-yellow-hoodie-city-spring.jpg",
      role: "Senior Stylistin",
    },
    publishedAt: "2025-04-15",
    readTime: 5,
    imageUrl: "https://beautystyle.lweb.ch/images/woman-shake-her-rainbow-color-hair_633478-156.jpg",
    featured: true,
    likes: 124,
    comments: 18,
  },
  {
    id: "2",
    title: "Wie man feines Haar voluminöser aussehen lässt",
    excerpt:
      "Praktische Tipps und Tricks, um feinem Haar mehr Volumen und Fülle zu verleihen. Erfahren Sie, welche Produkte und Techniken am besten funktionieren.",
    content: "",
    category: "Haarpflege",
    tags: ["Feines Haar", "Volumen", "Styling-Tipps", "Produkte"],
    author: {
      name: "Carlos Gomez",
      avatar: "https://beautystyle.lweb.ch/images/close-up-portrait-young-smiling-man_171337-20064.jpg",
      role: "Haar-Experte",
    },
    publishedAt: "2025-04-10",
    readTime: 7,
    imageUrl: "https://beautystyle.lweb.ch/images/crop-stylist-drying-hair-with-brush_23-2147769824.jpg",
    featured: false,
    likes: 89,
    comments: 12,
  },
  {
    id: "3",
    title: "Die Kunst der Balayage: Natürlich aussehende Highlights",
    excerpt:
      "Alles, was Sie über die beliebte Balayage-Technik wissen müssen. Warum sie so beliebt ist und wie sie Ihrem Haar einen natürlichen, sonnengeküssten Look verleiht.",
    content: "",
    category: "Färbetechniken",
    tags: ["Balayage", "Highlights", "Färben", "Natürlicher Look"],
    author: {
      name: "Laura Martinez",
      avatar: "https://beautystyle.lweb.ch/images/medium-shot-smiley-woman-holding-flowers_23-2149213138.jpg",
      role: "Coloristin",
    },
    publishedAt: "2025-04-05",
    readTime: 6,
    imageUrl: "https://beautystyle.lweb.ch/images/front-view-beautiful-happy-woman_23-2148778255.jpg",
    featured: true,
    likes: 156,
    comments: 24,
  },
  {
    id: "4",
    title: "Nachhaltige Haarpflege: Umweltfreundliche Produkte und Praktiken",
    excerpt:
      "Entdecken Sie, wie Sie Ihre Haarpflegeroutine umweltfreundlicher gestalten können. Von nachhaltigen Produkten bis zu wassersparenden Techniken.",
    content: "",
    category: "Nachhaltigkeit",
    tags: ["Umweltfreundlich", "Nachhaltige Produkte", "Öko", "Bewusste Pflege"],
    author: {
      name: "Javier Sanchez",
      avatar: "https://beautystyle.lweb.ch/images/man-with-backpack-walks-through-streets-amsterdam_1321-1769.jpg",
      role: "Nachhaltigkeitsexperte",
    },
    publishedAt: "2025-03-28",
    readTime: 8,
    imageUrl: "https://beautystyle.lweb.ch/images/hairdresser-cut-hair-her-client-hair-salon_1157-27198.jpg",
    featured: false,
    likes: 72,
    comments: 9,
  },
  {
    id: "5",
    title: "Hochzeitsfrisuren, die 2025 im Trend liegen",
    excerpt:
      "Planen Sie Ihre Hochzeit? Hier sind die angesagtesten Brautfrisuren für 2025, die zu jedem Stil und jeder Gesichtsform passen.",
    content: "",
    category: "Hochzeit",
    tags: ["Brautfrisuren", "Hochzeit", "Eleganz", "Updo"],
    author: {
      name: "Maria Rodriguez",
      avatar:
        "https://beautystyle.lweb.ch/images/cheerful-girl-cashmere-sweater-laughs-against-backdrop-blossoming-sakura-portrait-woman-yellow-hoodie-city-spring.jpg",
      role: "Senior Stylistin",
    },
    publishedAt: "2025-03-20",
    readTime: 6,
    imageUrl: "https://beautystyle.lweb.ch/images/close-up-collection-make-up-beauty-products_23-2148620012.jpg",
    featured: false,
    likes: 203,
    comments: 31,
  },
  {
    id: "6",
    title: "Männer-Styling: Moderne Haarschnitte und Bartpflege",
    excerpt:
      "Die neuesten Trends in der Männermode, von klassischen Haarschnitten bis hin zu modernen Bartpflegetechniken und Produkten.",
    content: "",
    category: "Männer",
    tags: ["Männer", "Bart", "Haarschnitte", "Grooming"],
    author: {
      name: "Javier Sanchez",
      avatar: "https://beautystyle.lweb.ch/images/man-with-backpack-walks-through-streets-amsterdam_1321-1769.jpg",
      role: "Barbier",
    },
    publishedAt: "2025-03-15",
    readTime: 5,
    imageUrl: "https://beautystyle.lweb.ch/images/barber.png",
    featured: false,
    likes: 118,
    comments: 14,
  },
]

// Obtener categorías únicas
const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

// Obtener tags únicos
const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

export default function BlogIndex() {
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts)
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Efecto para marcar cuando los componentes están cargados
  useEffect(() => {
    // Pequeño retraso para asegurar que todo esté renderizado
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Efecto para filtrar posts
  useEffect(() => {
    let result = blogPosts

    // Filtrar por categoría
    if (activeCategory !== "all") {
      result = result.filter((post) => post.category === activeCategory)
    }

    // Filtrar por tags
    if (activeTags.length > 0) {
      result = result.filter((post) => activeTags.some((tag) => post.tags.includes(tag)))
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    setFilteredPosts(result)
  }, [activeCategory, activeTags, searchQuery])

  // Manejar selección de categoría
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  // Manejar selección de tags
  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("de-DE", options)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section - Sin animaciones complejas */}
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1
                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ff4081] to-[#f5578e] fade-in"
                style={{ animationDelay: "0ms" }}
              >
                BeautyStyle Blog
              </h1>
              <p className="text-gray-600 text-lg mb-8 fade-in" style={{ animationDelay: "100ms" }}>
                Entdecken Sie die neuesten Trends, Tipps und Inspirationen aus der Welt der Schönheit und des Stils.
              </p>

              {/* Barra de búsqueda - Sin animaciones complejas */}
              <div className="max-w-md mx-auto relative fade-in" style={{ animationDelay: "200ms" }}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Suchen Sie nach Artikeln..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff4081] focus:border-transparent transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filtros y categorías - Sin animaciones complejas */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Categorías */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === "all"
                      ? "bg-[#ff4081] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Alle
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category
                        ? "bg-[#ff4081] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtros avanzados - Transición CSS simple */}
            {showFilters && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg transition-all duration-300 ease-in-out">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Nach Tags filtern:</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        activeTags.includes(tag)
                          ? "bg-[#ff4081]/20 text-[#ff4081] border border-[#ff4081]/30"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Featured Posts - Sin animaciones complejas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Sparkles className="text-[#ff4081] mr-2" size={20} />
                Empfohlene Artikel
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts
                .filter((post) => post.featured)
                .slice(0, 2)
                .map((post, index) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="md:flex">
                      <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto">
                        <img
                          src={post.imageUrl || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-[#ff4081] text-white text-xs font-bold px-2 py-1 rounded-md uppercase">
                          Featured
                        </div>
                      </div>
                      <div className="p-6 md:w-3/5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-medium text-gray-500 flex items-center">
                            <Calendar size={12} className="mr-1" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="text-xs font-medium text-gray-500 flex items-center">
                            <Clock size={12} className="mr-1" />
                            {post.readTime} Min. Lesezeit
                          </span>
                        </div>
                        <Link to={`/blog/${post.id}`} className="block group">
                          <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-[#ff4081] transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={post.author.avatar || "/placeholder.svg"}
                              alt={post.author.name}
                              className="w-8 h-8 rounded-full mr-2 object-cover"
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-800 block leading-tight">
                                {post.author.name}
                              </span>
                              <span className="text-xs text-gray-500">{post.author.role}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Latest Posts - Sin animaciones complejas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <TrendingUp className="text-[#ff4081] mr-2" size={20} />
                Neueste Artikel
              </h2>
              <div className="text-sm text-gray-500">{filteredPosts.length} Artikel gefunden</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-[#ff4081] text-xs font-bold px-2 py-1 rounded-md">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-gray-500 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(post.publishedAt)}
                      </span>
              
                    </div>
                    <Link to={`/blog/${post.id}`} className="block group">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-[#ff4081] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full mr-2 object-cover"
                        />
                        <span className="text-xs font-medium text-gray-800">{post.author.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mensaje si no hay resultados */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 fade-in">
                <Scissors className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Keine Artikel gefunden</h3>
                <p className="text-gray-600">Versuchen Sie es mit anderen Filtern oder einer anderen Suchanfrage.</p>
                <button
                  onClick={() => {
                    setActiveCategory("all")
                    setActiveTags([])
                    setSearchQuery("")
                  }}
                  className="mt-4 px-4 py-2 bg-[#ff4081] text-white rounded-full text-sm font-medium hover:bg-[#ff4081]/90 transition-colors"
                >
                  Filter zurücksetzen
                </button>
              </div>
            )}

            {/* Paginación */}
            {filteredPosts.length > 0 && <div className="mt-12 flex justify-center"></div>}
          </div>
        </section>

        {/* Newsletter Section - Sin animaciones complejas */}
        <section className="py-20 bg-gradient-to-r from-[#ff4081] to-[#f46395] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 fade-in" style={{ animationDelay: "100ms" }}>
                Bleiben Sie auf dem Laufenden
              </h2>
              <p className="text-white/80 mb-8 fade-in" style={{ animationDelay: "200ms" }}>
                Abonnieren Sie unseren Newsletter und erhalten Sie die neuesten Trends, Tipps und Angebote direkt in
                Ihren Posteingang.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 fade-in" style={{ animationDelay: "300ms" }}>
                <input
                  type="email"
                  placeholder="Ihre E-Mail-Adresse"
                  className="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="bg-white text-[#ff4081] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Abonnieren
                </button>
              </div>
              <p className="mt-4 text-sm text-white/60 fade-in" style={{ animationDelay: "400ms" }}>
                Wir respektieren Ihre Privatsphäre. Sie können sich jederzeit abmelden.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
