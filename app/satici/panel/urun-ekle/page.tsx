'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UrunEkle() {
  const router = useRouter()
  const [form, setForm] = useState({
    ad: '',
    fiyat: '',
    kategori: '',
    resim: '',
    satici: '',
  })
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHata('')
    setYukleniyor(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/satici/giris')
      return
    }

    const { error } = await supabase.from('urunler').insert({
      ad: form.ad,
      fiyat: parseFloat(form.fiyat),
      kategori: form.kategori,
      resim: form.resim,
      satici: form.satici,
      satici_id: session.user.id,
    })

    if (error) {
      setHata('Ürün eklenemedi: ' + error.message)
      setYukleniyor(false)
      return
    }

    router.push('/satici/panel')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
        <Link
          href="/satici/panel"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300"
        >
          ← Geri
        </Link>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
              <input
                type="text"
                required
                value={form.ad}
                onChange={e => setForm({ ...form, ad: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Kablosuz Kulaklık Pro"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (₺)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={form.fiyat}
                onChange={e => setForm({ ...form, fiyat: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="299.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
                required
                value={form.kategori}
                onChange={e => setForm({ ...form, kategori: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Kategori seçin</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Giyim">Giyim</option>
                <option value="Ev & Yaşam">Ev & Yaşam</option>
                <option value="Spor">Spor</option>
                <option value="Kozmetik">Kozmetik</option>
                <option value="Kitap">Kitap</option>
                <option value="Oyuncak">Oyuncak</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mağaza Adı</label>
              <input
                type="text"
                required
                value={form.satici}
                onChange={e => setForm({ ...form, satici: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ahmet'in Elektroniği"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resim URL</label>
              <input
                type="url"
                required
                value={form.resim}
                onChange={e => setForm({ ...form, resim: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="https://example.com/resim.jpg"
              />
              {form.resim && (
                <img
                  src={form.resim}
                  alt="Önizleme"
                  className="mt-2 w-32 h-32 object-cover rounded-lg border"
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
              )}
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
              {yukleniyor ? 'Ekleniyor...' : 'Ürünü Ekle'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}