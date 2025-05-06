"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "@remix-run/react"
import Header from "~/components/header"
import Footer from "~/components/footer"
import {
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  ArrowLeft,
  Facebook,
  Twitter,
  Instagram,
  Bookmark,
  ChevronRight,
} from "lucide-react"

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
    content: `
      <p>Die Sommersaison 2025 bringt aufregende neue Haartrends mit sich, die sowohl mutig als auch praktisch sind. In diesem Artikel stellen wir Ihnen die angesagtesten Looks vor, die in den kommenden Monaten dominieren werden.</p>
      
      <h2>1. Lebendige Pastelltöne</h2>
      <p>Pastellfarben sind zurück, aber mit einer modernen Wendung. Diesen Sommer sehen wir sanfte Lavendel-, Pfirsich- und Mintgrüntöne, die subtil in das Haar eingearbeitet werden. Diese Farben sind besonders schmeichelhaft für hellere Hauttöne und verleihen jedem Look eine verspielte Note.</p>
      
      <h2>2. Der strukturierte Bob</h2>
      <p>Der Bob bleibt ein zeitloser Klassiker, aber 2025 wird er mit mehr Textur und Bewegung getragen. Stumpfe Schnitte weichen weicheren, strukturierteren Varianten, die leicht zu stylen sind und perfekt für die heißen Sommertage geeignet sind.</p>
      
      <h2>3. Natürliche Locken</h2>
      <p>Natürliche Texturen werden gefeiert! Anstatt gegen Ihre natürlichen Locken anzukämpfen, umarmen Sie sie. Produkte, die die natürliche Textur verstärken, ohne sie zu beschweren, sind der Schlüssel zu diesem mühelosen Look.</p>
      
      <h2>4. Der moderne Shag</h2>
      <p>Der Shag-Schnitt der 70er Jahre erlebt ein modernes Revival. Mit weichen Stufen und einem fransigen Pony ist dieser Look sowohl retro als auch zeitgemäß. Er funktioniert gut für verschiedene Haarlängen und -texturen.</p>
      
      <h2>5. Glänzendes, gesundes Haar</h2>
      <p>Mehr denn je liegt der Fokus auf der Haargesundheit. Glänzendes, vitales Haar ist der ultimative Trend. Investieren Sie in qualitativ hochwertige Pflegeprodukte und regelmäßige Behandlungen, um Ihr Haar in Bestform zu halten.</p>
      
      <h2>Wie man diese Trends trägt</h2>
      <p>Der Schlüssel zu jedem dieser Trends ist die Anpassung an Ihren persönlichen Stil und Ihre Haarstruktur. Sprechen Sie mit Ihrem Stylisten über die beste Möglichkeit, diese Trends in Ihren Look zu integrieren.</p>
      
      <p>Besuchen Sie uns bei BeautyStyle, um mehr über diese Trends zu erfahren und herauszufinden, welcher am besten zu Ihnen passt!</p>
    `,
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
    content: `
      <p>Feines Haar kann manchmal schwer zu stylen sein, besonders wenn Sie nach Volumen und Fülle suchen. Aber mit den richtigen Techniken und Produkten können Sie Ihrem Haar einen deutlichen Volumenschub geben.</p>
      
      <h2>Verstehen Sie Ihr feines Haar</h2>
      <p>Feines Haar bezieht sich auf den Durchmesser jedes einzelnen Haarsträhns. Menschen mit feinem Haar haben Strähnen mit kleinerem Durchmesser, was dazu führen kann, dass das Haar flach und leblos aussieht. Es ist wichtig zu verstehen, dass feines Haar nicht unbedingt dünnes Haar bedeutet - Sie können viele feine Haare haben!</p>
      
      <h2>Die richtigen Produkte wählen</h2>
      <p>Beginnen Sie mit einem leichten, volumenverstärkenden Shampoo und Conditioner. Schwere, feuchtigkeitsspendende Formeln können feines Haar beschweren. Suchen Sie nach Produkten, die speziell für feines Haar entwickelt wurden und Inhaltsstoffe wie Proteine oder Biotin enthalten.</p>
      
      <h2>Styling-Techniken für maximales Volumen</h2>
      <p>1. <strong>Föhnen mit Kopf nach unten</strong>: Diese einfache Technik kann einen großen Unterschied machen. Beugen Sie Ihren Kopf nach vorne und föhnen Sie Ihr Haar gegen die natürliche Wuchsrichtung.</p>
      <p>2. <strong>Verwenden Sie Rundbürsten</strong>: Beim Föhnen kann eine Rundbürste helfen, Volumen an den Wurzeln zu erzeugen.</p>
      <p>3. <strong>Versuchen Sie es mit Velcro-Rollern</strong>: Setzen Sie diese an den Wurzeln ein, während Ihr Haar trocknet, um Volumen zu erzeugen.</p>
      
      <h2>Die Macht des Trockenshampoos</h2>
      <p>Trockenshampoo ist nicht nur zum Auffrischen zwischen den Wäschen da. Es kann auch als Volumen-Booster verwendet werden! Sprühen Sie es auf Ihre Wurzeln und massieren Sie es sanft ein, um sofortiges Volumen zu erzielen.</p>
      
      <h2>Der richtige Haarschnitt macht den Unterschied</h2>
      <p>Ein guter Haarschnitt kann Wunder für feines Haar bewirken. Stumpfe Schnitte können die Illusion von dickerem Haar erzeugen, während Schichten strategisch eingesetzt werden sollten, um nicht zu viel Gewicht zu entfernen.</p>
      
      <p>Besuchen Sie uns bei BeautyStyle für eine persönliche Beratung, wie Sie Ihrem feinen Haar mehr Volumen verleihen können!</p>
    `,
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
    content: `
      <p>Balayage hat die Welt der Haarfärbung revolutioniert und bietet einen natürlicheren, pflegeleichteren Ansatz für Highlights. In diesem Artikel tauchen wir tief in diese Technik ein und erklären, warum sie so beliebt geworden ist.</p>
      
      <h2>Was ist Balayage?</h2>
      <p>Balayage stammt aus dem Französischen und bedeutet "fegen" oder "malen". Im Gegensatz zu traditionellen Highlights, bei denen Folien verwendet werden, wird bei der Balayage-Technik die Farbe freihändig auf das Haar aufgetragen oder "gemalt", um einen natürlicheren, dimensionaleren Look zu erzielen.</p>
      
      <h2>Warum ist Balayage so beliebt?</h2>
      <p>1. <strong>Natürliches Aussehen</strong>: Balayage erzeugt einen sonnengeküssten Effekt, der natürlicher aussieht als traditionelle Highlights.</p>
      <p>2. <strong>Niedriger Wartungsaufwand</strong>: Da die Farbe sanft in das Haar eingearbeitet wird, sind die Übergänge weicher, was bedeutet, dass nachwachsende Wurzeln weniger auffällig sind.</p>
      <p>3. <strong>Anpassungsfähigkeit</strong>: Balayage kann an jede Haarfarbe, -länge und -textur angepasst werden.</p>
      <p>4. <strong>Dimensionalität</strong>: Diese Technik verleiht dem Haar Tiefe und Bewegung.</p>
      
      <h2>Ist Balayage für jeden geeignet?</h2>
      <p>Ja! Eine der großartigen Eigenschaften von Balayage ist ihre Vielseitigkeit. Egal, ob Sie blond, brünett, rothaarig oder sogar grau sind, Balayage kann angepasst werden, um Ihren natürlichen Farbton zu ergänzen.</p>
      
      <h2>Wie pflegt man Balayage?</h2>
      <p>Um Ihre Balayage in bestem Zustand zu halten:</p>
      <p>- Verwenden Sie sulfatfreie, farbschützende Shampoos und Conditioner</p>
      <p>- Reduzieren Sie die Verwendung von Hitze-Styling-Tools</p>
      <p>- Verwenden Sie regelmäßig Haarkuren, um die Gesundheit und den Glanz zu erhalten</p>
      <p>- Planen Sie alle 3-4 Monate Auffrischungen ein (viel weniger häufig als bei traditionellen Highlights!)</p>
      
      <h2>Der Balayage-Prozess</h2>
      <p>Bei BeautyStyle beginnt unsere Balayage-Behandlung mit einer gründlichen Beratung, um Ihre Wünsche und Ziele zu verstehen. Unser Colorist wird dann eine maßgeschneiderte Mischung von Tönen erstellen, die Ihren Hautton und Ihren natürlichen Haarfarbton ergänzen.</p>
      
      <p>Besuchen Sie uns für eine Balayage-Beratung und entdecken Sie, wie diese Technik Ihren Look transformieren kann!</p>
    `,
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
]

export default function BlogPost() {
  const { postId } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  // Efecto para cargar el post
  useEffect(() => {
    if (postId) {
      const foundPost = blogPosts.find((p) => p.id === postId)
      if (foundPost) {
        setPost(foundPost)

        // Encontrar posts relacionados (misma categoría o tags similares)
        const related = blogPosts
          .filter((p) => p.id !== postId)
          .filter((p) => p.category === foundPost.category || p.tags.some((tag) => foundPost.tags.includes(tag)))
          .slice(0, 3)

        setRelatedPosts(related)
      }
    }
  }, [postId])

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("de-DE", options)
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Artikel nicht gefunden</h1>
            <p className="text-gray-600 mb-6">Der gesuchte Artikel existiert nicht oder wurde entfernt.</p>
            <Link
              to="/blog"
              className="inline-flex items-center px-4 py-2 bg-[#ff4081] text-white rounded-full hover:bg-[#ff4081]/90 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Zurück zum Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="absolute inset-0 opacity-30">
            <img src={post.imageUrl || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Link
                to="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Zur��ck zum Blog
              </Link>

              <div className="mb-4">
                <span className="inline-block bg-[#ff4081] text-white text-sm font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                <span className="flex items-center text-white/80 text-sm">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center text-white/80 text-sm">
                  <Clock size={14} className="mr-1" />
                  {post.readTime} Min. Lesezeit
                </span>
                <span className="flex items-center text-white/80 text-sm">
                  <MessageCircle size={14} className="mr-1" />
                  {post.comments} Kommentare
                </span>
              </div>

              <div className="flex items-center justify-center">
                <img
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div className="text-left">
                  <span className="block text-sm font-medium">{post.author.name}</span>
                  <span className="text-xs text-white/70">{post.author.role}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <div className="mt-12 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${tag}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-b border-gray-200 py-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-1 ${
                        isLiked ? "text-[#ff4081]" : "text-gray-500 hover:text-[#ff4081]"
                      } transition-colors`}
                    >
                      <Heart size={20} fill={isLiked ? "#ff4081" : "none"} />
                      <span>{isLiked ? post.likes + 1 : post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                      <MessageCircle size={20} />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`${
                        isBookmarked ? "text-[#ff4081]" : "text-gray-500 hover:text-[#ff4081]"
                      } transition-colors`}
                    >
                      <Bookmark size={20} fill={isBookmarked ? "#ff4081" : "none"} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                    <p className="text-gray-600 mb-4">
                      {post.author.role} bei BeautyStyle mit über 10 Jahren Erfahrung in der Schönheitsbranche.
                      Spezialisiert auf innovative Techniken und personalisierte Beratung.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="text-gray-500 hover:text-[#ff4081] transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook size={18} />
                      </a>
                      <a href="#" className="text-gray-500 hover:text-[#ff4081] transition-colors" aria-label="Twitter">
                        <Twitter size={18} />
                      </a>
                      <a
                        href="#"
                        className="text-gray-500 hover:text-[#ff4081] transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Kommentare ({post.comments})</h3>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="text-lg font-medium mb-4">Hinterlassen Sie einen Kommentar</h4>
                    <form>
                      <textarea
                        placeholder="Ihr Kommentar..."
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] focus:border-transparent transition-all mb-4"
                        rows={4}
                      ></textarea>
                      <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Name"
                          className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] focus:border-transparent transition-all"
                        />
                        <input
                          type="email"
                          placeholder="E-Mail"
                          className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4081] focus:border-transparent transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#ff4081] text-white rounded-full hover:bg-[#ff4081]/90 transition-colors"
                      >
                        Kommentar senden
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                {/* Related Posts */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-6">Ähnliche Artikel</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="flex gap-4">
                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={relatedPost.imageUrl || "/placeholder.svg"}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            to={`/blog/${relatedPost.id}`}
                            className="font-medium text-gray-800 hover:text-[#ff4081] transition-colors line-clamp-2"
                          >
                            {relatedPost.title}
                          </Link>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Calendar size={12} className="mr-1" />
                            {formatDate(relatedPost.publishedAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/blog"
                    className="mt-4 inline-flex items-center text-[#ff4081] font-medium text-sm hover:underline"
                  >
                    Alle Artikel anzeigen <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Categories */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-6">Kategorien</h3>
                  <ul className="space-y-3">
                    {Array.from(new Set(blogPosts.map((p) => p.category))).map((category) => (
                      <li key={category}>
                        <Link
                          to={`/blog?category=${category}`}
                          className="flex items-center justify-between text-gray-700 hover:text-[#ff4081] transition-colors"
                        >
                          <span>{category}</span>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                            {blogPosts.filter((p) => p.category === category).length}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags Cloud */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(blogPosts.flatMap((p) => p.tags))).map((tag) => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${tag}`}
                        className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-100 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
