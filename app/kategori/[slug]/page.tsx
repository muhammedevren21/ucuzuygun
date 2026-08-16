import { createClient } from '@supabase/supabase-js'
import HeaderIkonlar from '@/app/components/HeaderIkonlar'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const statikUrunler = [
  { id: "s1", icon: "🎧", name: "Kablosuz Kulaklık Pro", price: 849, oldPrice: 1499, discount: 43, rating: 4.8, reviewCount: 2841, category: "elektronik", seller: "TechMart" },
  { id: "s3", icon: "⌚", name: "Akıllı Saat Siyah", price: 1249, oldPrice: 1899, discount: 34, rating: 4.9, reviewCount: 987, category: "elektronik", seller: "TechMart" },
  { id: "s5", icon: "📱", name: "Akıllı Telefon 128GB", price: 12999, oldPrice: 15999, discount: 19, rating: 4.7, reviewCount: 5432, category: "elektronik", seller: "TechMart" },
  { id: "s2", icon: "👟", name: "Spor Ayakkabı Erkek", price: 629, oldPrice: 999, discount: 37, rating: 4.5, reviewCount: 1203, category: "giyim", seller: "SportPlus" },
  { id: "s4", icon: "👜", name: "Deri Çanta Kadın", price: 459, oldPrice: 799, discount: 43, rating: 4.6, reviewCount: 532, category: "giyim", seller: "ModaKöşe" },
  { id: "s7", icon: "👔", name: "Erkek Gömlek Slim Fit", price: 299, oldPrice: 499, discount: 40, rating: 4.4, reviewCount: 876, category: "giyim", seller: "ModaKöşe" },
  { id: "s8", icon: "👗", name: "Yazlık Elbise", price: 389, oldPrice: 599, discount: 35, rating: 4.7, reviewCount: 1543, category: "giyim", seller: "ModaKöşe" },
  { id: "s9", icon: "🕯️", name: "Kokulu Mum Seti", price: 189, oldPrice: 279, discount: 32, rating: 4.5, reviewCount: 761, category: "ev-yasam", seller: "EvcilShop" },
  { id: "s10", icon: "🛋️", name: "Dekoratif Yastık Seti", price: 249, oldPrice: 399, discount: 38, rating: 4.6, reviewCount: 432, category: "ev-yasam", seller: "EvcilShop" },
  { id: "s11", icon: "💄", name: "Ruj Seti 5'li", price: 299, oldPrice: 499, discount: 40, rating: 4.8, reviewCount: 2341, category: "kozmetik", seller: "KozmetikZen" },
  { id: "s12", icon: "🧴", name: "Nemlendirici Krem", price: 149, oldPrice: 249, discount: 40, rating: 4.7, reviewCount: 1876, category: "kozmetik", seller: "KozmetikZen" },
  { id: "s13", icon: "⚽", name: "Futbol Topu", price: 199, oldPrice: 299, discount: 33, rating: 4.5, reviewCount: 654, category: "spor", seller: "SportPlus" },
  { id: "s14", icon: "🎮", name: "Oyun Kolu Kablosuz", price: 799, oldPrice: 1199, discount: 33, rating: 4.6, reviewCount: 1544, category: "spor", seller: "SportPlus" },
]

const kategoriIsimleri: { [key: string]: string } = {
  "elektronik": "Elektronik",
  "giyim": "Giyim",
  "ev-yasam": "Ev & Yaşam",
  "kozmetik": "Kozmetik",
  "spor": "Spor",
  "kitap": "Kitap",
  "oyuncak": "Oyuncak",
  "market": "Market",
}

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

export default async function KategoriSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const kategoriAdi = kategoriIsimleri[slug] || slug
  const supabaseKategori = kategoriIsimleri[slug]

  const { data: gercekUrunler } = await supabase
    .from('urunler')
    .select('*')
    .ilike('kategori', supabaseKategori || slug)
    .order('created_at', { ascending: false })

  const statik = statikUrunler.filter(u => u.category === slug)
  const tumUrunler = [...(gercekUrunler || []), ...statik]

  return (
    <div className="min-h-screen bg-gray-100">

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
                className={`text-white text-xs px-4 py-1.5 whitespace-nowrap rounded-full transition ${
                  cat.slug === slug ? 'bg-orange-700 font-bold' : 'hover:bg-orange-600'
                }`}>
                {cat.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
        <a href="/" className="text-orange-500 hover:underline">Ana Sayfa</a>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{kategoriAdi}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8 flex gap-6">

        {/* SOL: FİLTRELER */}
        <div className="hidden md:block w-56 shrink-0">
          <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <h3 className="font-bold mb-3 text-gray-900">Fiyat Aralığı</h3>
            <div className="flex gap-2">
              <input type="number" placeholder="Min" className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-800" />
              <input type="number" placeholder="Max" className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-800" />
            </div>
            <button className="mt-3 w-full bg-orange-500 text-white py-1.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition">
              Uygula
            </button>
          </div>

          <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <h3 className="font-bold mb-3 text-gray-900">İndirim Oranı</h3>
            {[
              { label: '%10 ve üzeri', val: 10 },
              { label: '%30 ve üzeri', val: 30 },
              { label: '%50 ve üzeri', val: 50 },
              { label: '%70 ve üzeri', val: 70 },
            ].map((item) => (
              <label key={item.val} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                <input type="checkbox" className="accent-orange-500" />
                <span className="text-gray-600">{item.label}</span>
              </label>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold mb-3 text-gray-900">Değerlendirme</h3>
            {[5, 4, 3].map((star) => (
              <label key={star} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                <input type="checkbox" className="accent-orange-500" />
                <span className="text-yellow-400">{"★".repeat(star)}</span>
                <span className="text-gray-500">ve üzeri</span>
              </label>
            ))}
          </div>
        </div>

        {/* SAĞ: ÜRÜNLER */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-900">{kategoriAdi}</h1>
            <span className="text-gray-500 text-sm bg-gray-200 px-3 py-1 rounded-full">{tumUrunler.length} ürün</span>
          </div>

          <div className="bg-white rounded-xl p-3 mb-4 flex gap-2 overflow-x-auto scrollbar-hide shadow-sm">
            {["Önerilen", "En Çok Satan", "En Düşük Fiyat", "En Yüksek Fiyat", "En Yeni"].map((sort) => (
              <button key={sort} className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap font-medium transition ${
                sort === "Önerilen" ? "bg-orange-500 text-white" : "border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500"
              }`}>
                {sort}
              </button>
            ))}
          </div>

          {tumUrunler.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">Bu kategoride ürün bulunamadı</h3>
              <p className="text-gray-500 text-sm mb-4">Yakında eklenecek!</p>
              <a href="/" className="inline-block bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition">
                Ana Sayfaya Dön
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {tumUrunler.map((urun: any) => (
                <a key={urun.id} href={urun.resim_url !== undefined ? `/urun/${urun.id}` : '#'}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all block">
                  <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    {urun.resim_url ? (
                      <img src={urun.resim_url} alt={urun.ad || urun.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">{urun.icon || '📦'}</span>
                    )}
                    {(urun.indirim_orani || urun.discount) && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                        %{urun.indirim_orani || urun.discount} İNDİRİM
                      </span>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full">
                      ✅ Doğrulanmış
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-orange-500 font-medium mb-1">{urun.magaza_adi || urun.satici || urun.seller}</p>
                    <p className="text-sm text-gray-800 font-medium mb-2 line-clamp-2">{urun.ad || urun.name}</p>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-orange-500 font-bold">{(urun.fiyat || urun.price || 0).toLocaleString()} ₺</span>
                      {(urun.eski_fiyat || urun.oldPrice) && (
                        <span className="text-gray-400 text-xs line-through">{(urun.eski_fiyat || urun.oldPrice).toLocaleString()} ₺</span>
                      )}
                    </div>
                    {urun.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-xs text-gray-500">{urun.rating} ({(urun.reviewCount || 0).toLocaleString()})</span>
                      </div>
                    )}
                    <p className="text-[10px] text-green-600 font-medium mt-1">🚚 Kargo Bedava</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
