'use client'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { useSepet } from '@/lib/sepet'
import { useEffect, useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function UrunDetay({ params }: { params: Promise<{ id: string }> }) {
  const [urun, setUrun] = useState<any>(null)
  const [yukleniyor, setYukleniyor] = useState(true)
  const [eklendi, setEklendi] = useState(false)
  const { ekle, toplamAdet } = useSepet()

  useEffect(() => {
    async function getUrun() {
      const { id } = await params
      const { data } = await supabase
        .from('urunler')
        .select('*')
        .eq('id', id)
        .single()
      setUrun(data)
      setYukleniyor(false)
    }
    getUrun()
  }, [])

  if (yukleniyor) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-gray-500">Yükleniyor...</div>
    </div>
  )
  if (!urun) return notFound()

  const tasarruf = urun.eski_fiyat ? (urun.eski_fiyat - urun.fiyat).toFixed(2) : null

  const sepeteEkle = () => {
    ekle({
      id: urun.id,
      ad: urun.ad,
      fiyat: urun.fiyat,
      resim_url: urun.resim_url || '',
      magaza_adi: urun.magaza_adi || urun.satici || '',
      adet: 1
    })
    setEklendi(true)
    setTimeout(() => setEklendi(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-orange-500 px-4 py-3 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" className="flex flex-col whitespace-nowrap">
            <span className="text-white text-xl font-black tracking-tight leading-none">
              ucuzuygun<span className="text-yellow-300">.com</span>
            </span>
            <span className="text-orange-200 text-xs font-light">sadece indirimli ürünler</span>
          </a>
          <div className="flex-1" />
          <a href="/sepet" className="text-white flex items-center gap-2 relative">
            <span className="text-2xl">🛒</span>
            <span className="text-sm">Sepet</span>
            {toplamAdet > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {toplamAdet}
              </span>
            )}
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* BREADCRUMB */}
        <div className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-orange-500">Ana Sayfa</a>
          <span className="mx-2">›</span>
          <a href={`/kategori/${urun.kategori?.toLowerCase()}`} className="hover:text-orange-500">{urun.kategori}</a>
          <span className="mx-2">›</span>
          <span className="text-gray-800">{urun.ad}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-8">
          {/* RESİM */}
          <div className="w-full md:w-96 h-80 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 relative">
            {urun.resim_url ? (
              <img src={urun.resim_url} alt={urun.ad} className="w-full h-full object-cover" />
            ) : (
              <span className="text-8xl">📦</span>
            )}
            {urun.indirim_orani && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-lg">
                %{urun.indirim_orani} İNDİRİM
              </span>
            )}
          </div>

          {/* BİLGİLER */}
          <div className="flex-1">
            <p className="text-sm text-orange-500 font-medium mb-1">{urun.magaza_adi || urun.satici}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{urun.ad}</h1>

            {/* FİYAT */}
            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl font-black text-orange-500">{urun.fiyat} ₺</span>
                {urun.eski_fiyat && (
                  <span className="text-gray-400 text-lg line-through">{urun.eski_fiyat} ₺</span>
                )}
                {urun.indirim_orani && (
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg">
                    %{urun.indirim_orani}
                  </span>
                )}
              </div>
              {tasarruf && (
                <p className="text-green-600 text-sm font-medium">
                  🎉 Bu üründe <strong>{tasarruf} ₺</strong> tasarruf ediyorsunuz!
                </p>
              )}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500">Kategori:</span>
                <a href={`/kategori/${urun.kategori?.toLowerCase()}`} className="text-orange-500 font-medium hover:underline">
                  {urun.kategori}
                </a>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500">Satıcı:</span>
                <span className="text-gray-700 font-medium">{urun.magaza_adi || urun.satici}</span>
              </div>
            </div>

            {/* BUTONLAR */}
            <div className="flex gap-3">
              <button onClick={sepeteEkle}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition ${
                  eklendi
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}>
                {eklendi ? '✅ Sepete Eklendi!' : '🛒 Sepete Ekle'}
              </button>
              <button className="border-2 border-gray-200 text-gray-500 py-4 px-5 rounded-xl hover:bg-gray-50 hover:border-red-300 hover:text-red-400 transition text-xl">
                ♡
              </button>
            </div>

            {/* GÜVENLİ ALIŞVERİŞ */}
            <div className="mt-4 flex gap-4 text-xs text-gray-400">
              <span>🔒 Güvenli ödeme</span>
              <span>🚚 Hızlı kargo</span>
              <span>↩️ Kolay iade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}