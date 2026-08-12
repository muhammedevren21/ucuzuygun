'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Başvurunuz Alındı!</h2>
          <p className="text-gray-600 mb-4">
            E-posta adresinizi doğruladıktan sonra başvurunuz admin tarafından incelenecek.
            Onaylandığında size bilgi verilecektir.
          </p>
          <Link href="/" className="text-orange-500 hover:underline">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Satıcı Olarak Kayıt Ol
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
            <input
              type="text"
              required
              value={form.ad}
              onChange={e => setForm({ ...form, ad: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Ahmet Yılmaz"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mağaza Adı</label>
            <input
              type="text"
              required
              value={form.magaza_adi}
              onChange={e => setForm({ ...form, magaza_adi: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Ahmet'in Elektroniği"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <input
              type="tel"
              value={form.telefon}
              onChange={e => setForm({ ...form, telefon: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="05xx xxx xx xx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
            <input
              type="email"
              required
              value={form.eposta}
              onChange={e => setForm({ ...form, eposta: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="ornek@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.sifre}
              onChange={e => setForm({ ...form, sifre: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="En az 6 karakter"
            />
          </div>

          {hata && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              {hata}
            </div>
          )}

          <button
            type="submit"
            disabled={yukleniyor}
            className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 transition"
          >
            {yukleniyor ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Zaten hesabınız var mı?{' '}
          <Link href="/satici/giris" className="text-orange-500 hover:underline">
            Giriş yapın
          </Link>
        </p>
      </div>
    </div>
  )
}