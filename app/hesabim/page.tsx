'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import HeaderIkonlar from '@/app/components/HeaderIkonlar'

export default function HesabimSayfasi() {
  const router = useRouter()
  const [kullanici, setKullanici] = useState<any>(null)
  const [profil, setProfil] = useState<any>(null)
  const [siparisler, setSiparisler] = useState<any[]>([])
  const [favoriler, setFavoriler] = useState<any[]>([])
  const [aktifTab, setAktifTab] = useState<'profil' | 'siparisler' | 'favoriler'>('profil')
  const [yukleniyor, setYukleniyor] = useState(true)

  useEffect(() => {
    const kontrol = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/giris')
        return
      }
      setKullanici(user)

      const { data: profilData } = await supabase
        .from('alicilar')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfil(profilData)

      const { data: siparisData } = await supabase
        .from('siparisler')
        .select('*')
        .eq('alici_id', user.id)
        .order('created_at', { ascending: false })
      setSiparisler(siparisData || [])

      const { data: favoriData } = await supabase
        .from('favoriler')
        .select('*, urunler(*)')
        .eq('alici_id', user.id)
        .order('created_at', { ascending: false })
      setFavoriler(favoriData || [])

      setYukleniyor(false)
    }
    kontrol()
  }, [])

  const cikisYap = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const durumRenk = (durum: string) => {
    if (durum === 'teslim edildi') return 'bg-green-100 text-green-700'
    if (durum === 'kargoda') return 'bg-blue-100 text-blue-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  if (yukleniyor) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-400">Yükleniyor...</p>
    </div>
  )

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

      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* PROFİL KARTI */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
            {profil?.ad?.[0]?.toUpperCase() || kullanici?.email?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-lg">{profil?.ad || 'Kullanıcı'}</p>
            <p className="text-gray-500 text-sm">{kullanici?.email}</p>
          </div>
          <button onClick={cikisYap}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition">
            Çıkış
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 shadow-sm">
          {[
            { key: 'profil', label: '👤 Profil' },
            { key: 'siparisler', label: '📦 Siparişlerim' },
            { key: 'favoriler', label: '❤️ Favorilerim' },
          ].map(tab => (
            <button key={tab.key}
              onClick={() => setAktifTab(tab.key as any)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                aktifTab === tab.key
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* PROFİL */}
        {aktifTab === 'profil' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Profil Bilgileri</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Ad Soyad</span>
                <span className="text-gray-900 font-medium text-sm">{profil?.ad || '-'}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 text-sm">E-posta</span>
                <span className="text-gray-900 font-medium text-sm">{kullanici?.email}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Telefon</span>
                <span className="text-gray-900 font-medium text-sm">{profil?.telefon || '-'}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-500 text-sm">Üyelik Tarihi</span>
                <span className="text-gray-900 font-medium text-sm">
                  {profil?.created_at ? new Date(profil.created_at).toLocaleDateString('tr-TR') : '-'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SİPARİŞLER */}
        {aktifTab === 'siparisler' && (
          <div>
            {siparisler.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <p className="text-5xl mb-4">📦</p>
                <p className="font-bold text-gray-700 mb-2">Henüz siparişin yok</p>
                <p className="text-gray-500 text-sm mb-6">İndirimli ürünleri keşfet!</p>
                <Link href="/" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition">
                  Alışverişe Başla
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {siparisler.map(siparis => (
                  <div key={siparis.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {siparis.resim_url ? (
                        <img src={siparis.resim_url} alt={siparis.urun_adi} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm line-clamp-1">{siparis.urun_adi}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{siparis.magaza_adi}</p>
                      <p className="text-orange-500 font-bold text-sm mt-1">{siparis.fiyat} ₺</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${durumRenk(siparis.durum)}`}>
                      {siparis.durum}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FAVORİLER */}
        {aktifTab === 'favoriler' && (
          <div>
            {favoriler.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <p className="text-5xl mb-4">❤️</p>
                <p className="font-bold text-gray-700 mb-2">Henüz favori ürünün yok</p>
                <p className="text-gray-500 text-sm mb-6">Beğendiğin ürünleri kaydet!</p>
                <Link href="/" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition">
                  Ürünleri Keşfet
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {favoriler.map(fav => fav.urunler && (
                  <a key={fav.id} href={`/urun/${fav.urunler.id}`}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all block">
                    <div className="h-36 bg-gray-50 flex items-center justify-center overflow-hidden">
                      {fav.urunler.resim_url ? (
                        <img src={fav.urunler.resim_url} alt={fav.urunler.ad} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl">📦</span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-800 font-medium line-clamp-2">{fav.urunler.ad}</p>
                      <p className="text-orange-500 font-bold text-sm mt-1">{fav.urunler.fiyat} ₺</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
