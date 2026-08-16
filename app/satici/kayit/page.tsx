'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import HeaderIkonlar from '@/app/components/HeaderIkonlar'

function GeriSayimKampanya() {
  const [kalan, setKalan] = useState({ gun: 0, saat: 0, dakika: 0, saniye: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hedefTarih = new Date('2026-09-01T00:00:00')

    const hesapla = () => {
      const simdi = new Date()
      const fark = hedefTarih.getTime() - simdi.getTime()
      if (fark <= 0) return
      setKalan({
        gun: Math.floor(fark / (1000 * 60 * 60 * 24)),
        saat: Math.floor((fark % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        dakika: Math.floor((fark % (1000 * 60 * 60)) / (1000 * 60)),
        saniye: Math.floor((fark % (1000 * 60)) / 1000),
      })
    }
    hesapla()
    const interval = setInterval(hesapla, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const pad = (n: number) => n.toString().padStart(2, '0')

  return (
    <div className="flex items-center gap-2 justify-center">
      {[{ val: kalan.gun, label: 'gün' }, { val: kalan.saat, label: 'sa' }, { val: kalan.dakika, label: 'dk' }, { val: kalan.saniye, label: 'sn' }].map((item) => (
        <div key={item.label} className="bg-orange-600 text-white rounded-lg px-3 py-2 text-center min-w-[52px]">
          <p className="text-xl font-black tabular-nums">{pad(item.val)}</p>
          <p className="text-[10px] text-orange-200">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export default function SaticiKayit() {
  const router = useRouter()
  const [form, setForm] = useState({
    ad: '',
    eposta: '',
    sifre: '',
    magaza_adi: '',
    telefon: '',
  })
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)
  const [basarili, setBasarili] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHata('')
    setYukleniyor(true)

    const { data, error: authHata } = await supabase.auth.signUp({
      email: form.eposta,
      password: form.sifre,
      options: {
        emailRedirectTo: `${window.location.origin}/satici/giris`,
      },
    })

    if (authHata) {
      setHata(authHata.message)
      setYukleniyor(false)
      return
    }

    const { error: dbHata } = await supabase.from('saticilar').insert({
      id: data.user?.id,
      ad: form.ad,
      eposta: form.eposta,
      magaza_adi: form.magaza_adi,
      telefon: form.telefon,
      durum: 'beklemede',
    })

    if (dbHata) {
      setHata('Profil oluşturulamadı: ' + dbHata.message)
      setYukleniyor(false)
      return
    }

    setBasarili(true)
    setYukleniyor(false)
  }

  if (basarili) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-orange-500 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 py-3">
              <a href="/" className="flex flex-col whitespace-nowrap">
                <span className="text-white text-2xl font-black tracking-tight leading-none">
                  ucuzuygun<span className="text-yellow-400">.com</span>
                </span>
                <span className="text-orange-200 text-xs font-light tracking-wide">sadece indirimli ürünler</span>
              </a>
              <div className="ml-auto">
                <HeaderIkonlar />
              </div>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[calc(100vh-70px)]">
          <div className="bg-white p-8 rounded-xl shadow text-center max-w-md mx-4">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Hoş Geldiniz!</h2>
            <p className="text-gray-600 mb-2">Kurucu satıcılarımız arasına katıldınız!</p>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
              <p className="text-orange-700 font-bold text-lg">%5 Komisyon Hakkı Kazandınız! 🎯</p>
              <p className="text-orange-600 text-sm">E-postanızı doğruladıktan sonra başvurunuz incelenecek.</p>
            </div>
            <Link href="/" className="text-orange-500 hover:underline text-sm">
              Ana sayfaya dön
            </Link>
          </div>
        </div>
      </div>
    )
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

      {/* KAMPANYA BANNER */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-8 px-4 mb-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="bg-yellow-400 text-gray-800 text-xs font-black px-3 py-1 rounded-full mb-4 inline-block">
            🔥 KURUCU SATICI KAMPANYASI
          </span>
          <h1 className="text-3xl font-black mb-2">Erken Üye Ol, Az Komisyon Öde!</h1>
          <p className="text-orange-100 mb-6">
            İlk 1000 satıcıya özel <strong className="text-yellow-300">%5 komisyon</strong> fırsatı — normal oran %12
          </p>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-5 max-w-sm mx-auto">
            <p className="text-sm text-orange-100 mb-3">⏰ Kampanya bitiyor:</p>
            <GeriSayimKampanya />
          </div>

          <div className="max-w-sm mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-orange-100">847 satıcı aramıza katıldı</span>
              <span className="text-yellow-300 font-bold">Son 153 yer!</span>
            </div>
            <div className="bg-white/20 rounded-full h-3 mb-2">
              <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '84.7%' }} />
            </div>
            <p className="text-xs text-orange-200">Kurucu satıcı kontenjanı %84.7 doldu</p>
          </div>
        </div>
      </div>

      {/* KOMİSYON TABLOSU */}
      <div className="max-w-2xl mx-auto px-4 mb-8">
        <h2 className="text-center font-bold text-gray-900 mb-4">Komisyon Karşılaştırması</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-orange-500 text-white rounded-2xl p-4 text-center shadow-lg relative">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-800 text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">
              🔥 ŞİMDİ
            </span>
            <p className="text-4xl font-black mt-2">%5</p>
            <p className="text-orange-100 text-xs mt-1">İlk 1000 satıcı</p>
            <p className="text-yellow-300 text-xs font-bold mt-2">Kurucu Fiyatı</p>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center">
            <p className="text-4xl font-black text-gray-500 mt-2">%8</p>
            <p className="text-gray-400 text-xs mt-1">1001-5000 satıcı</p>
            <p className="text-gray-400 text-xs font-bold mt-2">Standart</p>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center">
            <p className="text-4xl font-black text-gray-500 mt-2">%12</p>
            <p className="text-gray-400 text-xs mt-1">5000+ satıcı</p>
            <p className="text-gray-400 text-xs font-bold mt-2">Normal</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="max-w-md mx-auto px-4 pb-8">
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">Hemen Başvur</h2>
          <p className="text-center text-sm text-gray-500 mb-6">%5 komisyon hakkını şimdi garantile</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
              <input type="text" required value={form.ad}
                onChange={e => setForm({ ...form, ad: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
                placeholder="Ahmet Yılmaz" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mağaza Adı</label>
              <input type="text" required value={form.magaza_adi}
                onChange={e => setForm({ ...form, magaza_adi: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
                placeholder="Ahmet'in Elektroniği" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input type="tel" value={form.telefon}
                onChange={e => setForm({ ...form, telefon: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
                placeholder="05xx xxx xx xx" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input type="email" required value={form.eposta}
                onChange={e => setForm({ ...form, eposta: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
                placeholder="ornek@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input type="password" required minLength={6} value={form.sifre}
                onChange={e => setForm({ ...form, sifre: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
                placeholder="En az 6 karakter" />
            </div>

            {hata && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{hata}</div>
            )}

            <button type="submit" disabled={yukleniyor}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50 transition text-lg">
              {yukleniyor ? 'Kaydediliyor...' : '🚀 %5 Komisyonla Başla'}
            </button>

            <p className="text-center text-xs text-gray-400">
              Kayıt olarak kullanım şartlarını kabul etmiş olursunuz.
            </p>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Zaten hesabınız var mı?{' '}
            <Link href="/satici/giris" className="text-orange-500 hover:underline">
              Giriş yapın
            </Link>
          </p>
        </div>

        {/* AVANTAJLAR */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { icon: '💰', title: 'Düşük Komisyon', desc: 'Sektörün en düşük oranı' },
            { icon: '⚡', title: 'Hızlı Kurulum', desc: '5 dakikada mağaza aç' },
            { icon: '📊', title: 'Kolay Yönetim', desc: 'Basit satıcı paneli' },
            { icon: '🛡️', title: 'Güvenli Ödeme', desc: 'Zamanında ödeme garantisi' },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-2xl mb-1">{item.icon}</p>
              <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
