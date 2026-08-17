'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function KayitSayfasi() {
  const router = useRouter()
  const [form, setForm] = useState({ ad: '', eposta: '', sifre: '', telefon: '' })
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)
  const [basarili, setBasarili] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHata('')
    setYukleniyor(true)

    const { data, error } = await supabase.auth.signUp({
      email: form.eposta,
      password: form.sifre,
    })

    if (error) {
      setHata('Kayıt olunamadı: ' + error.message)
      setYukleniyor(false)
      return
    }

    await supabase.from('alicilar').insert({
      id: data.user?.id,
      ad: form.ad,
      eposta: form.eposta,
      telefon: form.telefon,
    })

    setBasarili(true)
    setYukleniyor(false)
  }

  if (basarili) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hoş Geldin!</h2>
          <p className="text-gray-600 mb-6 text-sm">
            E-posta adresini doğruladıktan sonra giriş yapabilirsin.
          </p>
          <Link href="/giris"
            className="block w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition">
            Giriş Yap
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-orange-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <a href="/" className="flex flex-col whitespace-nowrap w-fit">
            <span className="text-white text-2xl font-black tracking-tight leading-none">
              ucuzuygun<span className="text-yellow-400">.com</span>
            </span>
            <span className="text-orange-200 text-xs font-light tracking-wide">sadece indirimli ürünler</span>
          </a>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-70px)] px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-gray-900 mb-1">Üye Ol</h1>
            <p className="text-gray-500 text-sm">Ücretsiz hesap oluştur, indirimlerden kaçırma</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
              <input type="text" required value={form.ad}
                onChange={e => setForm({ ...form, ad: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ahmet Yılmaz" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input type="email" required value={form.eposta}
                onChange={e => setForm({ ...form, eposta: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="ornek@email.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon <span className="text-gray-400 text-xs">(opsiyonel)</span></label>
              <input type="tel" value={form.telefon}
                onChange={e => setForm({ ...form, telefon: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="05xx xxx xx xx" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input type="password" required minLength={6} value={form.sifre}
                onChange={e => setForm({ ...form, sifre: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="En az 6 karakter" />
            </div>

            {hata && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">{hata}</div>
            )}

            <button type="submit" disabled={yukleniyor}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50 transition text-lg">
              {yukleniyor ? 'Kaydediliyor...' : 'Üye Ol'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Zaten hesabın var mı?{' '}
            <Link href="/giris" className="text-orange-500 font-semibold hover:underline">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
