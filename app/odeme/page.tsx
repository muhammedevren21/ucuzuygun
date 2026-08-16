'use client'
import { useRouter } from 'next/navigation'
import HeaderIkonlar from '@/app/components/HeaderIkonlar'

export default function OdemeSayfasi() {
  const router = useRouter()

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
        </div>
      </header>

      {/* İÇERİK */}
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm p-10">
          <div className="text-7xl mb-6">🔐</div>
          <h1 className="text-2xl font-black text-gray-900 mb-3">Ödeme Sistemi Yakında!</h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Güvenli ödeme altyapımız hazırlanıyor.<br />
            Çok yakında kredi kartı, havale ve kapıda ödeme seçenekleriyle hizmetinizdeyiz.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">💳</p>
              <p className="text-xs text-gray-600 font-medium">Kredi Kartı</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">🏦</p>
              <p className="text-xs text-gray-600 font-medium">Havale/EFT</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">🚪</p>
              <p className="text-xs text-gray-600 font-medium">Kapıda Ödeme</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-green-700 font-semibold text-sm mb-1">📢 Bildirim Almak İster misiniz?</p>
            <p className="text-green-600 text-xs">Ödeme sistemi açıldığında sizi haberdar edelim.</p>
            <div className="flex gap-2 mt-3">
              <input type="email" placeholder="E-posta adresiniz"
                className="flex-1 border border-green-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300" />
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition">
                Bildir
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => router.push('/sepet')}
              className="flex-1 border-2 border-orange-500 text-orange-500 py-3 rounded-xl font-bold hover:bg-orange-50 transition">
              ← Sepete Dön
            </button>
            <button onClick={() => router.push('/')}
              className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition">
              Ana Sayfa
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
