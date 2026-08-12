'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SaticiGiris() {
  const router = useRouter()
  const [form, setForm] = useState({ eposta: '', sifre: '' })
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHata('')
    setYukleniyor(true)

    const { data, error: authHata } = await supabase.auth.signInWithPassword({
      email: form.eposta,
      password: form.sifre,
    })

    if (authHata) {
      setHata('E-posta veya şifre hatalı.')
      setYukleniyor(false)
      return
    }

    const { data: satici } = await supabase
      .from('saticilar')
      .select('durum')
      .eq('id', data.user.id)
      .single()

    if (!satici) {
      setHata('Satıcı kaydı bulunamadı.')
      await supabase.auth.signOut()
      setYukleniyor(false)
      return
    }

    if (satici.durum === 'beklemede') {
      setHata('Hesabınız henüz admin tarafından onaylanmadı. Lütfen bekleyin.')
      await supabase.auth.signOut()
      setYukleniyor(false)
      return
    }

    if (satici.durum === 'pasif') {
      setHata('Hesabınız pasife alınmıştır. Admin ile iletişime geçin.')
      await supabase.auth.signOut()
      setYukleniyor(false)
      return
    }

    router.push('/satici/panel')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Satıcı Girişi
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
            <input
              type="email"
              required
              value={form.eposta}
              onChange={e => setForm({ ...form, eposta: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              required
              value={form.sifre}
              onChange={e => setForm({ ...form, sifre: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
            {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Hesabınız yok mu?{' '}
          <Link href="/satici/kayit" className="text-orange-500 hover:underline">
            Satıcı olun
          </Link>
        </p>
      </div>
    </div>
  )
}