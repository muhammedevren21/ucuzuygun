import { createClient } from '@supabase/supabase-js'
import HeaderIkonlar from './components/HeaderIkonlar'
import GeriSayim from './components/GeriSayim'

async function getUrunler() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await client
    .from('urunler')
    .select('*')
    .not('eski_fiyat', 'is', null)
    .not('indirim_orani', 'is', null)
    .order('created_at', { ascending: false })
  return data || []
}

function getBadge(urun: any) {
  const indirim = urun.indirim_orani || 0
  const created = new Date(urun.created_at)
  const simdi = new Date()
  const gunFarki = (simdi.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  if (indirim >= 50) return { label: '🔥 Çok Satan', bg: 'bg-orange-500' }
  if (gunFarki <= 7) return { label: '🆕 Yeni', bg: 'bg-blue-500' }
  if (indirim >= 30) return { label: '⚡ Fırsat', bg: 'bg-yellow-500' }
  return null
}

export default async function Home() {
  const urunler = await getUrunler()

  const statikUrunler = [
    { id: "s1", icon: "🎧", name: "Kablosuz Kulaklık Pro", price: 849, oldPrice: 1499, discount: "43", rating: "4.8", reviews: "2.841", badge: { label: "🔥 Çok Satan", bg: "bg-orange-500" } },
    { id: "s2", icon: "👟", name: "Spor Ayakkabı Erkek", price: 629, oldPrice: 999, discount: "37", rating: "4.5", reviews: "1.203", badge: { label: "⚡ Fırsat", bg: "bg-yellow-500" } },
    { id: "s3", icon: "⌚", name: "Akıllı Saat Siyah", price: 1249, oldPrice: 1899, discount: "34", rating: "4.9", reviews: "987", badge: { label: "⭐ Çok Beğenilen", bg: "bg-purple-500" } },
    { id: "s4", icon: "👜", name: "Deri Çanta Kadın", price: 459, oldPrice: 799, discount: "43", rating: "4.6", reviews: "532", badge: { label: "🔥 Çok Satan", bg: "bg-orange-500" } },
    { id: "s5", icon: "💻", name: "Laptop Çantası", price: 299, oldPrice: 549, discount: "45", rating: "4.7", reviews: "1.102", badge: { label: "🔥 Çok Satan", bg: "bg-orange-500" } },
    { id: "s6", icon: "🎮", name: "Oyun Kolu", price: 449, oldPrice: 799, discount: "44", rating: "4.8", reviews: "876", badge: { label: "⚡ Fırsat", bg: "bg-yellow-500" } },
  ]

  const kategoriler = [
    { icon: "📱", label: "Elektronik", slug: "elektronik" },
    { icon: "👗", label: "Giyim", slug: "giyim" },
    { icon: "🏠", label: "Ev & Yaşam", slug: "ev-yasam" },
    { icon: "💄", label: "Kozmetik", slug: "kozmetik" },
    { icon: "⚽", label: "Spor", slug: "spor" },
    { icon: "📚", label: "Kitap", slug: "kitap" },
    { icon: "🧸", label: "Oyuncak", slug: "oyuncak" },
    { icon: "🥗", label: "Market", slug: "market" },
  ]

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

  const magazalar = [
    { initials: "TM", name: "TechMart", color: "from-orange-400 to-orange-600", products: "128 ürün", badge: "🚀 Hızlı Gönderi", rate: "4.9" },
    { initials: "MK", name: "ModaKöşe", color: "from-green-400 to-green-600", products: "246 ürün", badge: "✅ Güvenilir Satıcı", rate: "4.8" },
    { initials: "ES", name: "EvcilShop", color: "from-purple-400 to-purple-600", products: "89 ürün", badge: "🎯 %98 Memnuniyet", rate: "4.7" },
    { initials: "KZ", name: "KozmetikZen", color: "from-pink-400 to-pink-600", products: "312 ürün", badge: "🚀 Hızlı Gönderi", rate: "4.9" },
    { initials: "SP", name: "SportPlus", color: "from-blue-400 to-blue-600", products: "175 ürün", badge: "✅ Güvenilir Satıcı", rate: "4.6" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* HEADER */}
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

      {/* BETA BANNER */}
      <div className="bg-yellow-400 text-gray-800 text-center text-xs font-medium py-2 px-4">
        🚧 Beta sürecindeyiz — ürünleri keşfedin, favorileyin. Ödeme sistemi yakında aktif olacak.
      </div>

      {/* HERO + KAMPANYA */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400">
        <div className="pt-8 pb-4 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-20 text-9xl">🛍️</div>
            <div className="absolute bottom-4 right-60 text-7xl">💫</div>
          </div>
          <div className="max-w-7xl mx-auto relative flex items-center justify-between gap-8">
            <div className="flex-1 min-w-0">
              <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                🔥 YAZA ÖZEL
              </span>
              <h1 className="text-white text-3xl md:text-4xl font-black mb-3 leading-tight">
                Yaz İndirimi<br />Başladı!
              </h1>
              <p className="text-white text-base md:text-lg mb-4">
                Binlerce üründe <strong className="text-yellow-300">%70&apos;e varan</strong> indirim
              </p>
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="text-orange-100 text-xs font-medium">⚡ Fırsatlar bitiyor:</span>
                <GeriSayim />
              </div>
              <div className="flex gap-3 flex-wrap">
                <a href="/kategori/giyim" className="bg-white text-orange-500 font-bold px-5 py-2.5 rounded-lg hover:bg-yellow-50 transition shadow-sm text-sm">
                  Şimdi Keşfet →
                </a>
                <a href="/satici/kayit" className="border-2 border-white text-white font-bold px-5 py-2.5 rounded-lg hover:bg-white hover:text-orange-500 transition text-sm">
                  Satıcı Ol
                </a>
              </div>
            </div>
            <div className="hidden md:flex flex-shrink-0 relative w-80 h-56">
              <div className="absolute right-0 top-4 w-36 h-44 bg-white/20 backdrop-blur-sm rounded-2xl rotate-6 border border-white/30" />
              <div className="absolute right-16 top-2 w-36 h-44 bg-white/25 backdrop-blur-sm rounded-2xl -rotate-3 border border-white/30" />
              <a href="/kategori/elektronik" className="absolute right-8 top-0 w-40 h-48 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-2 border border-orange-100 hover:shadow-3xl hover:-translate-y-1 transition-all">
                <span className="text-5xl">🎧</span>
                <div className="text-center px-3">
                  <p className="text-gray-800 text-xs font-bold leading-tight">Kablosuz Kulaklık Pro</p>
                  <p className="text-gray-400 text-xs line-through mt-1">1.499 ₺</p>
                  <p className="text-orange-500 text-lg font-black">849 ₺</p>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">%43 İNDİRİM</span>
                </div>
              </a>
              <div className="absolute left-0 top-6 bg-yellow-400 text-gray-800 text-[10px] font-black px-2 py-1 rounded-lg shadow-md">
                🔥 Çok Satan
              </div>
              <div className="absolute left-4 bottom-4 bg-white text-gray-700 text-[10px] font-bold px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
                ⭐ 4.8 <span className="text-gray-400">(2.841)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/kategori/elektronik" className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-5 text-white flex items-center gap-4 hover:bg-white/30 transition-all">
            <div className="bg-white/20 rounded-xl p-3 flex items-center justify-center flex-shrink-0">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg">Elektronik</p>
              <p className="text-orange-100 text-sm">%50&apos;ye varan indirim</p>
              <span className="text-yellow-300 text-xs font-semibold">Alışverişe Başla →</span>
            </div>
          </a>
          <a href="/kategori/giyim" className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-5 text-white flex items-center gap-4 hover:bg-white/30 transition-all">
            <div className="bg-white/20 rounded-xl p-3 flex items-center justify-center flex-shrink-0">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg">Giyim & Moda</p>
              <p className="text-orange-100 text-sm">Yeni sezon ürünler</p>
              <span className="text-yellow-300 text-xs font-semibold">Alışverişe Başla →</span>
            </div>
          </a>
          <a href="/kategori/ev-yasam" className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-5 text-white flex items-center gap-4 hover:bg-white/30 transition-all">
            <div className="bg-white/20 rounded-xl p-3 flex items-center justify-center flex-shrink-0">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg">Ev & Yaşam</p>
              <p className="text-orange-100 text-sm">Evinizi yenileyin</p>
              <span className="text-yellow-300 text-xs font-semibold">Alışverişe Başla →</span>
            </div>
          </a>
        </div>
      </div>

      {/* KATEGORİLER */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Kategoriler</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {kategoriler.map((cat) => (
            <a key={cat.slug} href={`/kategori/${cat.slug}`} className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl md:text-3xl group-hover:shadow-md group-hover:-translate-y-1 transition-all border border-gray-100">
                {cat.icon}
              </div>
              <span className="text-xs text-gray-600 text-center font-medium leading-tight">{cat.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* İNDİRİM ORANI BANTLARI */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">İndirim Oranına Göre Keşfet</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <a href="/kategori/elektronik?min_indirim=10" className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-all">
            <span className="text-3xl">🏷️</span>
            <div>
              <p className="text-2xl font-black text-orange-500">%10</p>
              <p className="text-xs text-gray-500">ve üzeri indirim</p>
            </div>
          </a>
          <a href="/kategori/elektronik?min_indirim=30" className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-all">
            <span className="text-3xl">🔖</span>
            <div>
              <p className="text-2xl font-black text-orange-500">%30</p>
              <p className="text-xs text-gray-500">ve üzeri indirim</p>
            </div>
          </a>
          <a href="/kategori/elektronik?min_indirim=50" className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-all">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="text-2xl font-black text-orange-500">%50</p>
              <p className="text-xs text-gray-500">ve üzeri indirim</p>
            </div>
          </a>
          <a href="/kategori/elektronik?min_indirim=70" className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-all">
            <span className="text-3xl">💥</span>
            <div>
              <p className="text-2xl font-black text-orange-500">%70</p>
              <p className="text-xs text-gray-500">ve üzeri indirim</p>
            </div>
          </a>
        </div>
      </div>

      {/* POPÜLER ÜRÜNLER — yatay scroll */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">🔥 Popüler Ürünler</h2>
          <a href="/kategori/elektronik" className="text-orange-500 text-sm font-semibold hover:underline">Tümünü Gör →</a>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
          {statikUrunler.map((product) => {
            const tasarruf = product.oldPrice - product.price
            return (
              <div key={product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all flex-shrink-0 w-44 md:w-52">
                <div className="relative">
                  <div className="h-36 md:h-44 bg-gray-50 flex items-center justify-center text-5xl">
                    {product.icon}
                  </div>
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                    %{product.discount}
                  </span>
                  {product.badge && (
                    <span className={`absolute top-2 right-2 ${product.badge.bg} text-white text-[10px] font-bold px-2 py-0.5 rounded-lg`}>
                      {product.badge.label}
                    </span>
                  )}
                  <span className="absolute bottom-2 left-1 bg-black/60 text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full">
                    ✅ Doğrulanmış
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-800 font-medium mb-1 line-clamp-2">{product.name}</p>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-yellow-400 text-xs">★★★★★</span>
                    <span className="text-[10px] text-gray-400">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-orange-500 font-bold text-sm">{product.price} ₺</span>
                    <span className="text-gray-400 text-xs line-through">{product.oldPrice} ₺</span>
                  </div>
                  <p className="text-green-600 text-[10px] font-bold mt-0.5">💰 {tasarruf} ₺ kazancınız var!</p>
                  <p className="text-[10px] text-green-600 font-medium mt-0.5">🚚 Kargo Bedava</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* YENİ EKLENEN ÜRÜNLER — yatay scroll */}
      {urunler.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">🆕 Yeni Eklenen Ürünler</h2>
            <span className="text-sm text-gray-400 bg-gray-200 px-3 py-1 rounded-full">{urunler.length} ürün</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {urunler.map((urun: any) => {
              const badge = getBadge(urun)
              const tasarruf = urun.eski_fiyat && urun.fiyat ? (urun.eski_fiyat - urun.fiyat).toFixed(0) : null
              return (
                <a key={urun.id} href={`/urun/${urun.id}`}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all flex-shrink-0 w-44 md:w-52 block">
                  <div className="h-36 md:h-44 bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    {urun.resim_url ? (
                      <img src={urun.resim_url} alt={urun.ad} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">📦</span>
                    )}
                    {urun.indirim_orani && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                        %{urun.indirim_orani}
                      </span>
                    )}
                    {badge && (
                      <span className={`absolute top-2 right-2 ${badge.bg} text-white text-[10px] font-bold px-2 py-0.5 rounded-lg`}>
                        {badge.label}
                      </span>
                    )}
                    <span className="absolute bottom-2 left-1 bg-black/60 text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full">
                      ✅ Doğrulanmış
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-orange-500 font-medium mb-1">{urun.magaza_adi || urun.satici}</p>
                    <p className="text-xs text-gray-800 font-medium mb-2 line-clamp-2">{urun.ad}</p>
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-orange-500 font-bold text-sm">{urun.fiyat} ₺</span>
                      {urun.eski_fiyat && (
                        <span className="text-gray-400 text-xs line-through">{urun.eski_fiyat} ₺</span>
                      )}
                    </div>
                    {tasarruf && <p className="text-green-600 text-[10px] font-bold mt-0.5">💰 {tasarruf} ₺ kazancınız var!</p>}
                    <p className="text-[10px] text-green-600 font-medium mt-0.5">🚚 Kargo Bedava</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* GÜNÜN FIRSATLARI — yatay scroll */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">⚡ Günün Fırsatları</h2>
            <p className="text-sm text-gray-500">Kaçırmayın, stoklar sınırlı!</p>
          </div>
          <a href="/kategori/elektronik" className="text-orange-500 text-sm font-semibold hover:underline">Tümünü Gör →</a>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
          {[...statikUrunler].reverse().map((product) => {
            const tasarruf = product.oldPrice - product.price
            return (
              <div key={product.id + '-f'} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all flex-shrink-0 w-44 md:w-52">
                <div className="relative">
                  <div className="h-36 md:h-44 bg-gray-50 flex items-center justify-center text-5xl">
                    {product.icon}
                  </div>
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                    %{product.discount}
                  </span>
                  {product.badge && (
                    <span className={`absolute top-2 right-2 ${product.badge.bg} text-white text-[10px] font-bold px-2 py-0.5 rounded-lg`}>
                      {product.badge.label}
                    </span>
                  )}
                  <span className="absolute bottom-2 left-1 bg-black/60 text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full">
                    ✅ Doğrulanmış
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-800 font-medium mb-1 line-clamp-2">{product.name}</p>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-yellow-400 text-xs">★★★★★</span>
                    <span className="text-[10px] text-gray-400">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-orange-500 font-bold text-sm">{product.price} ₺</span>
                    <span className="text-gray-400 text-xs line-through">{product.oldPrice} ₺</span>
                  </div>
                  <p className="text-green-600 text-[10px] font-bold mt-0.5">💰 {tasarruf} ₺ kazancınız var!</p>
                  <p className="text-[10px] text-green-600 font-medium mt-0.5">🚚 Kargo Bedava</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ÖNE ÇIKAN MAĞAZALAR */}
      <div className="max-w-7xl mx-auto px-4 py-4 pb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🏪 Öne Çıkan Mağazalar</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {magazalar.map((store) => (
            <div key={store.name} className="bg-white rounded-xl border border-gray-100 p-3 md:p-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all text-center">
              <div className={`w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${store.color} flex items-center justify-center text-white font-black text-base md:text-xl mx-auto mb-2 shadow-sm`}>
                {store.initials}
              </div>
              <p className="font-semibold text-gray-800 text-xs md:text-sm">{store.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{store.products}</p>
              <span className="inline-block bg-orange-50 text-orange-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1">
                {store.badge}
              </span>
              <p className="text-yellow-400 text-xs mt-1">⭐ {store.rate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GÜVENLİ ALIŞVERİŞ */}
      <div className="bg-white border-t border-b border-gray-200 py-6 px-4 mt-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm font-bold text-gray-800">SSL Güvenli Bağlantı</p>
              <p className="text-xs text-gray-500 hidden sm:block">256-bit şifreleme</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm font-bold text-gray-800">Hızlı Kargo</p>
              <p className="text-xs text-gray-500 hidden sm:block">Aynı gün kargoya verilir</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm font-bold text-gray-800">14 Gün İade Hakkı</p>
              <p className="text-xs text-gray-500 hidden sm:block">Satıcı onayıyla iade</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm font-bold text-gray-800">7/24 Destek</p>
              <p className="text-xs text-gray-500 hidden sm:block">Her zaman yanınızdayız</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl font-black mb-2">ucuzuygun<span className="text-yellow-400">.com</span></div>
              <p className="text-gray-400 text-sm">Türkiye&apos;nin en uygun pazaryeri</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-200">Kurumsal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/hakkimizda" className="hover:text-white">Hakkımızda</a></li>
                <li><a href="/iletisim" className="hover:text-white">İletişim</a></li>
                <li><a href="/kariyer" className="hover:text-white">Kariyer</a></li>
                <li><a href="/kvkk" className="hover:text-white">KVKK</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-200">Yardım</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/sss" className="hover:text-white">SSS</a></li>
                <li><a href="/iade-degisim" className="hover:text-white">İade & Değişim</a></li>
                <li><a href="/kargo-takip" className="hover:text-white">Kargo Takip</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-200">Satıcılar</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/satici/kayit" className="hover:text-white">Satıcı Ol</a></li>
                <li><a href="/satici/giris" className="hover:text-white">Satıcı Girişi</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ucuzuygun.com — Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  )
}
