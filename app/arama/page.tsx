import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
      <header className="bg-orange-500 px-4 py-3 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" className="text-white text-xl font-black whitespace-nowrap">
            ucuzuygun<span className="text-yellow-300">.com</span>
          </a>
          <form action="/arama" method="get" className="flex flex-1 max-w-2xl">
            <input type="text" name="q" defaultValue={sorgu}
              placeholder="Ürün, marka veya kategori ara..."
              className="flex-1 px-4 py-2.5 rounded-l-lg outline-none text-gray-800 text-sm" />
            <button type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 px-5 py-2.5 rounded-r-lg font-bold text-gray-800 text-sm transition">
              Ara
            </button>
          </form>
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
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Sonuç bulunamadı</h3>
            <p className="text-gray-500 text-sm mb-4">"{sorgu}" için ürün bulunamadı</p>
            <a href="/" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600">
              Ana Sayfaya Dön
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {urunler.map((urun: any) => (
              <a key={urun.id} href={`/urun/${urun.id}`}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all block">
                <div className="h-44 bg-gray-50 flex items-center justify-center overflow-hidden relative">
                  {urun.resim_url ? (
                    <img src={urun.resim_url} alt={urun.ad} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl">📦</span>
                  )}
                  {urun.indirim_orani && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      %{urun.indirim_orani} İNDİRİM
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-orange-500 font-medium mb-1">{urun.magaza_adi || urun.satici}</p>
                  <p className="text-sm text-gray-800 font-medium mb-2 line-clamp-2">{urun.ad}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold text-lg">{urun.fiyat} ₺</span>
                    {urun.eski_fiyat && (
                      <span className="text-gray-400 text-sm line-through">{urun.eski_fiyat} ₺</span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}