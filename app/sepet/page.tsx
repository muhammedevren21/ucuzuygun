'use client'
import { useSepet } from '@/lib/sepet'
import { useRouter } from 'next/navigation'

export default function Sepet() {
  const { sepet, cikar, toplamFiyat, toplamAdet } = useSepet()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-orange-500 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" className="text-white text-2xl font-bold">ucuzuygun.com</a>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">🛒 Sepetim ({toplamAdet} ürün)</h1>

        {sepet.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-5xl mb-4">🛒</p>
            <p className="text-gray-500 mb-4">Sepetiniz boş</p>
            <button
              onClick={() => router.push('/')}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600">
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-6">
              {sepet.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-4 flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    {item.resim_url ? (
                      <img src={item.resim_url} alt={item.ad} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">📦</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">{item.magaza_adi}</p>
                    <p className="font-medium text-gray-900">{item.ad}</p>
                    <p className="text-orange-500 font-bold">{item.fiyat} ₺ × {item.adet}</p>
                  </div>
                  <button onClick={() => cikar(item.id)} className="text-red-400 hover:text-red-600 text-sm">
                    Kaldır
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Toplam</span>
                <span className="text-2xl font-bold text-orange-500">{toplamFiyat.toFixed(2)} ₺</span>
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition">
                Siparişi Tamamla
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}