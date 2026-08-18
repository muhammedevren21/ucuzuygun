import HeaderIkonlar from './HeaderIkonlar'

const navKategoriler = [
  { label: "Elektronik", slug: "elektronik" },
  { label: "Giyim", slug: "giyim" },
  { label: "Ev & Yaşam", slug: "ev-yasam" },
  { label: "Kozmetik", slug: "kozmetik" },
  { label: "Spor", slug: "spor" },
  { label: "Kitap", slug: "kitap" },
  { label: "Oyuncak", slug: "oyuncak" },
  { label: "Süpermarket", slug: "market" },
]

export default function SiteHeader() {
  return (
    <header className="bg-orange-500 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 py-3 flex-wrap">
          <a href="/" className="flex flex-col whitespace-nowrap order-1">
            <span className="text-white text-2xl font-black tracking-tight leading-none">
              ucuzuygun<span className="text-yellow-400">.com</span>
            </span>
            <span className="text-orange-200 text-xs font-light tracking-wide">sadece indirimli ürünler</span>
          </a>
          <form action="/arama" method="get" className="flex order-3 sm:order-2 w-full sm:flex-1 sm:max-w-2xl">
            <input type="text" name="q" placeholder="Ürün, marka veya kategori ara..."
              className="flex-1 px-4 py-2.5 rounded-l-lg outline-none text-gray-800 text-sm" />
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 px-5 py-2.5 rounded-r-lg font-bold text-gray-800 text-sm transition">
              Ara
            </button>
          </form>
          <div className="ml-auto sm:ml-0 order-2 sm:order-3">
            <HeaderIkonlar />
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {navKategoriler.map((cat) => (
            <a key={cat.slug} href={`/kategori/${cat.slug}`}
              className="text-white text-xs px-4 py-1.5 whitespace-nowrap hover:bg-orange-600 rounded-full transition">
              {cat.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
