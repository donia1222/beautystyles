// app/routes/galeria.tsx
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import Header from "~/components/header";
import Footer from "~/components/footer";

type TextItem = {
  id: number;
  text_key: string;
  section: string;
  text_value: string;
};

type ImageItem = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

type Category = { label: string; value: string; count: number };

type LoaderData = {
  selectedCategory: string;
  categories: Category[];
  images: ImageItem[];
  texts: TextItem[];
};

// Cambia este valor al dominio donde están tus imágenes
const IMAGE_HOST = 'https://beautystyle.lweb.ch';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const selectedCategory = url.searchParams.get("category") || "alle";

  // 1) Obtener textos desde el endpoint
  const textsRes = await fetch(
    `${IMAGE_HOST}/gallery/admin/obtener_textos.php`
  );
  const textsJson = await textsRes.json();
  const texts: TextItem[] = textsJson.texts || [];

  // 2) Obtener imágenes filtradas
  const imagesRes = await fetch(
    `${IMAGE_HOST}/gallery/admin/obtener_imagenes.php?category=${selectedCategory}`
  );
  const imagesJson = await imagesRes.json();
  const images: ImageItem[] = imagesJson.images || [];

  // 3) Definir categorías y contarlos
  const baseCats = [
    { label: "Alle", value: "alle" },
    { label: "Haarschnitte", value: "haarschnitte" },
    { label: "Farbe", value: "farbe" },
    { label: "Frisuren", value: "frisuren" },
    { label: "Behandlungen", value: "behandlungen" },
  ];
  const categories: Category[] = baseCats.map(cat => ({
    ...cat,
    count:
      cat.value === "alle"
        ? images.length
        : images.filter(img => img.category === cat.value).length
  }));

  return json<LoaderData>({ selectedCategory, categories, images, texts });
};

export default function Galeria() {
  const { selectedCategory, categories, images, texts } = useLoaderData<LoaderData>();

  // Textos del hero con claves actualizadas
  const heroTitle =
    texts.find(t => t.text_key === "gallery_title")?.text_value ||
    "Unsere Galerie";
  const heroSubtitle =
    texts.find(t => t.text_key === "gallery_description")?.text_value ||
    "Entdecken Sie unsere besten Arbeiten.";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {heroTitle}
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              {heroSubtitle}
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Filtros */}
            <div className="text-center mb-4 text-sm text-gray-500">
              Aktive Kategorie: <strong>{selectedCategory}</strong> | <strong>{images.length}</strong> Bilder
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(cat => (
                <Form method="get" key={cat.value}>
                  <input type="hidden" name="category" value={cat.value} />
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-full transition-colors ${
                      selectedCategory === cat.value
                        ? "bg-rose-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {cat.label} ({cat.count})
                  </button>
                </Form>
              ))}
            </div>

            {/* Galería de imágenes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map(img => {
                // Construir URL absoluta de la imagen
                const imageUrl = img.src.startsWith('http')
                  ? img.src
                  : `${IMAGE_HOST}${img.src}`;

                return (
                  <div key={img.id} className="relative overflow-hidden rounded-lg shadow-md group">
                    <img
                      src={imageUrl}
                      alt={img.alt}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={e => (e.currentTarget.src = "/hair-salon-interior.png")}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-center px-4">{img.alt}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {images.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Keine Bilder in dieser Kategorie gefunden.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
