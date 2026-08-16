'use client'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { useSepet } from '@/lib/sepet'
import { useEffect, useState } from 'react'
import HeaderIkonlar from '@/app/components/HeaderIkonlar'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function UrunDetay({ params }: { params: Promise<{ id: string }> }) {
  const [urun, setUrun] = useState<any>(null)
  const [benzerUrunler, setBenzerUrunler] = useState<any[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)
  const [eklendi, setEklendi] = useState(false)
  const { ekle } = useSepet()

  useEffect(() => {
    async function getUrun() {
      const { id } = await params
      const { data } = await supabase
        .from('urunler')
        .select('*')
        .eq('id', id)
        .single()
      setUrun(data)

      if (data?.kategori) {
        const { data: benzer } = await supabase
          .from('urunler')
          .select('*')
          .eq('kategori', data.kategori)
          .neq('id', id)
          .limit(6)
        setBenzerUrunler(benzer || [])
      }

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

  const getBadge = () => {
    const indirim = urun.indirim_orani || 0
    const created = new Date(urun.created_at)
    const gunFarki = (new Date().getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    if (indirim >= 50) return { label: '🔥 Çok Satan', bg: 'bg-orange-500' }
    if (gunFarki <= 7) return { label: '🆕 Yeni', bg: 'bg-blue-500' }
    if (indirim >= 30) return { label: '⚡ Fırsat', bg: 'bg-yellow-500' }
    return null
  }

  const badge = getBadge()

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
            {['Elektronik','Giyim','Ev & Yaşam','Kozmetik','Spor','Kitap','Oyuncak','Süpermarket'].map((cat) => (
              <a key={cat} href={`/kategori/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="text-white text-xs px-4 py-1.5 whitespace-nowrap hover:bg-orange-600 rounded-full transition">
                {cat}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* BREADCRUMB */}
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
          <a href="/" className="hover:text-orange-500">Ana Sayfa</a>
          <span>›</span>
          <a href={`/kategori/${urun.kategori?.toLowerCase()}`} className="hover:text-orange-500">{urun.kategori}</a>
          <span>›</span>
          <span className="text-gray-800 line-clamp-1">{urun.ad}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-8 mb-6">

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
            {badge && (
              <span className={`absolute top-3 right-3 ${badge.bg} text-white text-xs font-bold px-2 py-1 rounded-lg`}>
                {badge.label}
              </span>
            )}
            <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
              ✅ Doğrulanmış İndirim
            </span>
          </div>

          {/* BİLGİLER */}
          <div className="flex-1">
            <p className="text-sm text-orange-500 font-medium mb-1">{urun.magaza_adi || urun.satici}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{urun.ad}</h1>

            {/* FİYAT */}
            <div className="bg-orange-50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
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

            {/* AÇIKLAMA */}
            {urun.aciklama && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Ürün Açıklaması</p>
                <p className="text-sm text-gray-600 leading-relaxed">{urun.aciklama}</p>
              </div>
            )}

            {/* BİLGİLER */}
            <div className="space-y-2 mb-5">
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500 w-16">Kategori:</span>
                <a href={`/kategori/${urun.kategori?.toLowerCase()}`} className="text-orange-500 font-medium hover:underline">
                  {urun.kategori}
                </a>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500 w-16">Satıcı:</span>
                <span className="text-gray-700 font-medium">{urun.magaza_adi || urun.satici}</span>
              </div>
            </div>

            {/* BUTONLAR */}
            <div className="flex gap-3 mb-4">
              <button onClick={sepeteEkle}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition ${
                  eklendi ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}>
                {eklendi ? '✅ Sepete Eklendi!' : '🛒 Sepete Ekle'}
              </button>
              <button className="border-2 border-gray-200 text-gray-400 py-4 px-5 rounded-xl hover:bg-red-50 hover:border-red-300 hover:text-red-400 transition text-xl">
                ♡
              </button>
            </div>

            {/* GÜVENLİ ALIŞVERİŞ */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-lg mb-0.5">🔒</p>
                <p className="text-xs text-gray-500">Güvenli Ödeme</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-lg mb-0.5">🚚</p>
                <p className="text-xs text-gray-500">Hızlı Kargo</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-lg mb-0.5">↩️</p>
                <p className="text-xs text-gray-500">Kolay İade</p>
              </div>
            </div>
          </div>
        </div>

        {/* BENZER ÜRÜNLER */}
        {benzerUrunler.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Benzer Ürünler</h2>
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
              {benzerUrunler.map((b) => (
                <a key={b.id} href={`/urun/${b.id}`}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all flex-shrink-0 w-44">
                  <div className="h-36 bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    {b.resim_url ? (
                      <img src={b.resim_url} alt={b.ad} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">📦</span>
                    )}
                    {b.indirim_orani && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                        %{b.indirim_orani}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-800 font-medium line-clamp-2 mb-1">{b.ad}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-orange-500 font-bold text-sm">{b.fiyat} ₺</span>
                      {b.eski_fiyat && <span className="text-gray-400 text-xs line-through">{b.eski_fiyat} ₺</span>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
