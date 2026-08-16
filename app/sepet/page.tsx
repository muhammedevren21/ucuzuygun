'use client'
import { useSepet } from '@/lib/sepet'
import { useRouter } from 'next/navigation'
import HeaderIkonlar from '@/app/components/HeaderIkonlar'

export default function Sepet() {
  const { sepet, cikar, toplamFiyat, toplamAdet } = useSepet()
  const router = useRouter()

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
                className="text-white text-xs px-4 py-1.5 whitespace-nowrap hover:bg-orange-600 rounded-full transition">
                {cat.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">🛒 Sepetim ({toplamAdet} ürün)</h1>

        {sepet.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-6xl mb-4">🛒</p>
            <p className="text-xl font-bold text-gray-800 mb-2">Sepetiniz boş</p>
            <p className="text-gray-500 text-sm mb-6">Fırsatları kaçırmayın, hemen alışverişe başlayın!</p>
            <button onClick={() => router.push('/')}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition">
              Alışverişe Başla →
            </button>
          </div>
        ) : (
          <>
            {/* ÜRÜNLER */}
            <div className="flex flex-col gap-3 mb-4">
              {sepet.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                  <a href={`/urun/${item.id}`} className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 hover:opacity-80 transition">
                    {item.resim_url ? (
                      <img src={item.resim_url} alt={item.ad} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">📦</div>
                    )}
                  </a>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-orange-500 font-medium mb-0.5">{item.magaza_adi}</p>
                    <a href={`/urun/${item.id}`} className="font-medium text-gray-900 hover:text-orange-500 transition line-clamp-2 text-sm">
                      {item.ad}
                    </a>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-orange-500 font-bold">{item.fiyat} ₺</span>
                      <span className="text-gray-400 text-xs">× {item.adet}</span>
                      <span className="text-gray-600 text-sm font-semibold">= {(item.fiyat * item.adet).toFixed(2)} ₺</span>
                    </div>
                    <p className="text-xs text-green-600 mt-0.5">🚚 Kargo Bedava</p>
                  </div>
                  <button onClick={() => cikar(item.id)}
                    className="text-gray-300 hover:text-red-500 transition text-xl flex-shrink-0 p-1">
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* ÖZET */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Sipariş Özeti</h2>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam ({toplamAdet} ürün)</span>
                  <span>{toplamFiyat.toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>🚚 Kargo</span>
                  <span className="font-semibold">Bedava</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Toplam</span>
                  <span className="text-2xl font-black text-orange-500">{toplamFiyat.toFixed(2)} ₺</span>
                </div>
              </div>
              <button
                onClick={() => router.push('/odeme')}
                className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition">
                Siparişi Tamamla →
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full mt-3 text-orange-500 text-sm font-medium hover:underline">
                ← Alışverişe Devam Et
              </button>

              {/* GÜVENLİ ALIŞVERİŞ */}
              <div className="flex justify-center gap-6 mt-5 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400 flex items-center gap-1">🔒 Güvenli Ödeme</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">↩️ Kolay İade</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">🛡️ Alıcı Koruması</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
