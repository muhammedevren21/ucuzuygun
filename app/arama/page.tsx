import { createClient } from '@supabase/supabase-js'
import HeaderIkonlar from '@/app/components/HeaderIkonlar'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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

export default async function AramaSayfasi({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams
  const sorgu = q || ''

  const { data: urunler } = await supabase
    .from('urunler')
    .select('*')
    .or(`ad.ilike.%${sorgu}%,kategori.ilike.%${sorgu}%,magaza_adi.ilike.%${sorgu}%`)
    .order('created_at', { ascending: false })

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
              <input type="text" name="q" defaultValue={sorgu}
                placeholder="Ürün, marka veya kategori ara..."
                className="flex-1 px-4 py-2.5 rounded-l-lg outline-none text-gray-800 text-sm" />
              <button type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 px-5 py-2.5 rounded-r-lg font-bold text-gray-800 text-sm transition">
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

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* BREADCRUMB */}
        <div className="text-sm text-gray-500 mb-4">
          <a href="/" className="text-orange-500 hover:underline">Ana Sayfa</a>
          <span className="mx-2">›</span>
          <span>"{sorgu}" için arama sonuçları</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            "{sorgu}" için {urunler?.length || 0} sonuç bulundu
          </h1>
        </div>

        {!urunler || urunler.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Sonuç bulunamadı</h3>
            <p className="text-gray-500 text-sm mb-6">"{sorgu}" için ürün bulunamadı. Farklı bir kelime deneyin.</p>
            <a href="/" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition">
              Ana Sayfaya Dön
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {urunler.map((urun: any) => (
              <a key={urun.id} href={`/urun/${urun.id}`}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all block">
                <div className="h-36 md:h-44 bg-gray-50 flex items-center justify-center overflow-hidden relative">
                  {urun.resim_url ? (
                    <img src={urun.resim_url} alt={urun.ad} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl">📦</span>
                  )}
                  {urun.indirim_orani && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                      %{urun.indirim_orani} İNDİRİM
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full">
                    ✅ Doğrulanmış
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs text-orange-500 font-medium mb-1">{urun.magaza_adi || urun.satici}</p>
                  <p className="text-sm text-gray-800 font-medium mb-2 line-clamp-2">{urun.ad}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-orange-500 font-bold text-base md:text-lg">{urun.fiyat} ₺</span>
                    {urun.eski_fiyat && (
                      <span className="text-gray-400 text-xs line-through">{urun.eski_fiyat} ₺</span>
                    )}
                  </div>
                  <p className="text-[10px] text-green-600 font-medium mt-1">🚚 Kargo Bedava</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
