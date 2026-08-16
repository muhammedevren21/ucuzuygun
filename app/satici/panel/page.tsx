'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import HeaderIkonlar from '@/app/components/HeaderIkonlar'

type Urun = {
  id: number
  ad: string
  fiyat: number
  eski_fiyat: number
  indirim_orani: number
  kategori: string
  resim_url: string
  magaza_adi: string
  durum: string
}

export default function SaticiPanel() {
  const router = useRouter()
  const [urunler, setUrunler] = useState<Urun[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)

  useEffect(() => {
    const kontrol = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/satici/giris'
        return
      }
      const { data } = await supabase
        .from('urunler')
        .select('*')
        .eq('satici_id', user.id)
        .order('id', { ascending: false })
      setUrunler(data || [])
      setYukleniyor(false)
    }
    kontrol()
  }, [])

  const urunSil = async (id: number) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return
    await supabase.from('urunler').delete().eq('id', id)
    setUrunler(urunler.filter(u => u.id !== id))
  }

  const cikisYap = async () => {
    await supabase.auth.signOut()
    router.push('/satici/giris')
  }

  const durumRenk = (durum: string) => {
    if (durum === 'onaylandi') return 'bg-green-100 text-green-700'
    if (durum === 'reddedildi') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  const durumLabel = (durum: string) => {
    if (durum === 'onaylandi') return '✅ Yayında'
    if (durum === 'reddedildi') return '❌ Reddedildi'
    return '⏳ İnceleniyor'
  }

  return (
    <div className="min-h-screen bg-gray-50">

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
            <div className="ml-auto order-2 flex items-center gap-3">
              <Link href="/satici/panel/urun-ekle"
                className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 transition">
                + Ürün Ekle
              </Link>
              <button onClick={cikisYap}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition">
                Çıkış
              </button>
              <HeaderIkonlar />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">

        {/* BAŞLIK */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Satıcı Paneli</h1>
            <p className="text-sm text-gray-500">{urunler.length} ürün listelendi</p>
          </div>
        </div>

        {yukleniyor ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-gray-400">Yükleniyor...</p>
          </div>
        ) : urunler.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-gray-500 mb-2 font-medium">Henüz ürün eklemediniz.</p>
            <p className="text-gray-400 text-sm mb-6">İlk ürününüzü ekleyerek satışa başlayın!</p>
            <Link href="/satici/panel/urun-ekle"
              className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition">
              + İlk Ürününü Ekle
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {urunler.map(u => (
              <div key={u.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-sm transition">
                {/* RESİM */}
                <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {u.resim_url ? (
                    <img src={u.resim_url} alt={u.ad} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">📦</span>
                  )}
                </div>

                {/* BİLGİLER */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm line-clamp-1">{u.ad}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{u.kategori} · {u.magaza_adi}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-orange-500 font-bold text-sm">{u.fiyat} ₺</span>
                    {u.eski_fiyat && <span className="text-gray-400 text-xs line-through">{u.eski_fiyat} ₺</span>}
                    {u.indirim_orani && (
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded">
                        %{u.indirim_orani}
                      </span>
                    )}
                  </div>
                </div>

                {/* DURUM */}
                <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${durumRenk(u.durum)}`}>
                  {durumLabel(u.durum)}
                </span>

                {/* BUTONLAR */}
                <div className="flex gap-2 flex-shrink-0">
                  <Link href={`/satici/panel/urun-duzenle/${u.id}`}
                    className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-600 transition">
                    Düzenle
                  </Link>
                  <button onClick={() => urunSil(u.id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 transition">
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
