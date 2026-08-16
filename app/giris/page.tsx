'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function GirisSayfasi() {
  const router = useRouter()
  const [form, setForm] = useState({ eposta: '', sifre: '' })
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHata('')
    setYukleniyor(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: form.eposta,
      password: form.sifre,
    })

    if (error) {
      setHata('E-posta veya şifre hatalı!')
      setYukleniyor(false)
      return
    }

    router.push('/hesabim')
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
            <h1 className="text-2xl font-black text-gray-900 mb-1">Giriş Yap</h1>
            <p className="text-gray-500 text-sm">Hesabına giriş yap, alışverişe devam et</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input type="email" required value={form.eposta}
                onChange={e => setForm({ ...form, eposta: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="ornek@email.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input type="password" required value={form.sifre}
                onChange={e => setForm({ ...form, sifre: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="••••••••" />
            </div>

            {hata && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">{hata}</div>
            )}

            <button type="submit" disabled={yukleniyor}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50 transition text-lg">
              {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600">
              Hesabın yok mu?{' '}
              <Link href="/kayit" className="text-orange-500 font-semibold hover:underline">
                Üye Ol
              </Link>
            </p>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-400">Satıcı mısın?{' '}
                <Link href="/satici/giris" className="text-orange-500 hover:underline">
                  Satıcı girişi
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
