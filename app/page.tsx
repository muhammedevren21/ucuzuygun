export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 py-3">
            {/* Logo */}
            <div className="text-white text-2xl font-bold whitespace-nowrap">
              ucuzuygun.com
            </div>

            {/* Arama */}
            <div className="flex flex-1">
              <input
                type="text"
                placeholder="Ürün, marka veya kategori ara..."
                className="flex-1 px-4 py-2 rounded-l-md outline-none text-gray-800"
              />
              <button className="bg-yellow-400 px-4 py-2 rounded-r-md font-bold text-gray-800">
                Ara
              </button>
            </div>

            {/* İkonlar */}
            <div className="flex gap-6 text-white text-sm">
              <button className="flex flex-col items-center">
                <span className="text-xl">♡</span>
                <span>Favoriler</span>
              </button>
              <button className="flex flex-col items-center">
                <span className="text-xl">🛒</span>
                <span>Sepet</span>
              </button>
              <button className="flex flex-col items-center">
                <span className="text-xl">👤</span>
                <span>Hesabım</span>
              </button>
            </div>
          </div>

          {/* Kategori Menüsü */}
          <nav className="flex gap-1 overflow-x-auto pb-1">
            {["Elektronik", "Giyim", "Ev & Yaşam", "Kozmetik", "Spor", "Kitap", "Oyuncak", "Süpermarket", "Tüm Kategoriler"].map((cat) => (
              <button
                key={cat}
                className="text-white text-xs px-3 py-2 whitespace-nowrap hover:bg-orange-600 rounded"
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* BANNER */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-300 py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-3xl font-bold mb-2">Yaz indirimi başladı!</h2>
          <p className="text-white mb-4">Binlerce üründe %70&apos;e varan indirim</p>
          <button className="bg-white text-orange-500 font-bold px-6 py-2 rounded">
            Şimdi Keşfet
          </button>
        </div>
      </div>

      {/* KATEGORİLER */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Kategoriler</h3>
          <button className="text-orange-500 text-sm">Tümü →</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { icon: "📱", label: "Elektronik" },
            { icon: "👗", label: "Giyim" },
            { icon: "🏠", label: "Ev & Yaşam" },
            { icon: "💄", label: "Kozmetik" },
            { icon: "⚽", label: "Spor" },
            { icon: "📚", label: "Kitap" },
            { icon: "🧸", label: "Oyuncak" },
            { icon: "🥗", label: "Market" },
          ].map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-2 min-w-16 cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                {cat.icon}
              </div>
              <span className="text-xs text-gray-600 text-center">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GÜNÜN FIRSATLARI */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Günün Fırsatları</h3>
          <button className="text-orange-500 text-sm">Tümü →</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🎧", name: "Kablosuz Kulaklık Pro", price: "849", oldPrice: "1.499", discount: "43" },
            { icon: "👟", name: "Spor Ayakkabı Erkek", price: "629", oldPrice: "999", discount: "37" },
            { icon: "⌚", name: "Akıllı Saat Siyah", price: "1.249", oldPrice: "1.899", discount: "34" },
            { icon: "👜", name: "Deri Çanta Kadın", price: "459", oldPrice: "799", discount: "43" },
          ].map((product) => (
            <div key={product.name} className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform">
              <div className="h-36 bg-gray-50 flex items-center justify-center text-5xl">
                {product.icon}
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 mb-1">{product.name}</p>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-orange-500 font-bold">{product.price} TL</span>
                  <span className="text-gray-400 text-xs line-through">{product.oldPrice} TL</span>
                  <span className="bg-red-500 text-white text-xs px-1 rounded">%{product.discount}</span>
                </div>
                <div className="text-yellow-400 text-xs mt-1">★★★★★</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ÖNE ÇIKAN DÜKKANLAR */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Öne Çıkan Dükkanlar</h3>
          <button className="text-orange-500 text-sm">Tümü →</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { initials: "TM", name: "TechMart", color: "bg-orange-500" },
            { initials: "MK", name: "ModaKöşe", color: "bg-green-500" },
            { initials: "ES", name: "EvcilShop", color: "bg-purple-500" },
            { initials: "KZ", name: "KozmetikZen", color: "bg-pink-500" },
            { initials: "SP", name: "SportPlus", color: "bg-blue-500" },
          ].map((store) => (
            <div key={store.name} className="flex flex-col items-center gap-2 min-w-28 bg-white rounded-lg border border-gray-200 p-3 cursor-pointer">
              <div className={`w-11 h-11 rounded-full ${store.color} flex items-center justify-center text-white font-bold`}>
                {store.initials}
              </div>
              <span className="text-xs font-medium text-center">{store.name}</span>
              <span className="text-xs text-gray-400">⭐ 4.8</span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white mt-8 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xl font-bold mb-2">ucuzuygun.com</div>
          <p className="text-gray-400 text-sm">Türkiye&apos;nin en uygun pazaryeri</p>
        </div>
      </footer>
    </div>
  );
}
