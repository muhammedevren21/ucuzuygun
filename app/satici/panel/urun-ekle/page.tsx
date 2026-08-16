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
    eski_fiyat: '',
    indirim_orani: '',
    kategori: '',
    resim_url: '',
    satici: '',
    magaza_adi: '',
    aciklama: '',
  })
  const [hata, setHata] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)
  const [onayladi, setOnayladi] = useState(false)
  const [basarili, setBasarili] = useState(false)

  const fiyatHesapla = (eski: string, yeni: string) => {
    const e = parseFloat(eski)
    const y = parseFloat(yeni)
    if (e > 0 && y > 0) {
      if (y >= e) {
        setHata('⚠️ İndirimli fiyat, eski fiyattan küçük olmalıdır!')
        setForm(prev => ({ ...prev, indirim_orani: '' }))
      } else {
        setHata('')
        const oran = Math.round(((e - y) / e) * 100)
        setForm(prev => ({ ...prev, indirim_orani: oran.toString() }))
      }
    }
  }

  // Kural tabanlı otomatik onay
  const otomatikOnayKontrol = (fiyat: number, eskiFiyat: number, indirimOrani: number, ad: string, resimUrl: string) => {
    const hatalar: string[] = []

    if (indirimOrani < 10) hatalar.push('Minimum %10 indirim gerekli')
      if (indirimOrani > 90) hatalar.push('Maksimum %90 indirim uygulanabilir')
    if (fiyat < 1) hatalar.push('Fiyat en az 1₺ olmalı')
    if (fiyat > 500000) hatalar.push('Fiyat 500.000₺ üzerinde olamaz')
    if (eskiFiyat > 1000000) hatalar.push('Eski fiyat 1.000.000₺ üzerinde olamaz')
    if (ad.trim().length < 3) hatalar.push('Ürün adı en az 3 karakter olmalı')
    if (!resimUrl.startsWith('http')) hatalar.push('Geçerli bir resim URL\'i girin')

    return hatalar
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHata('')

    const fiyat = parseFloat(form.fiyat)
    const eskiFiyat = parseFloat(form.eski_fiyat)
    const indirimOrani = parseInt(form.indirim_orani)

    if (fiyat >= eskiFiyat) {
      setHata('⚠️ İndirimli fiyat, eski fiyattan küçük olmalıdır!')
      return
    }

    if (!onayladi) {
      setHata('⚠️ Lütfen sorumluluk beyanını onaylayın!')
      return
    }

    // Otomatik kural kontrolü
    const kuralHatalari = otomatikOnayKontrol(fiyat, eskiFiyat, indirimOrani, form.ad, form.resim_url)
    if (kuralHatalari.length > 0) {
      setHata('⚠️ ' + kuralHatalari.join(', '))
      return
    }

    setYukleniyor(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/satici/giris')
      return
    }

    const { error } = await supabase.from('urunler').insert({
      ad: form.ad,
      fiyat,
      eski_fiyat: eskiFiyat,
      indirim_orani: indirimOrani,
      kategori: form.kategori,
      resim_url: form.resim_url,
      satici: form.satici,
      magaza_adi: form.magaza_adi,
      aciklama: form.aciklama,
      satici_id: session.user.id,
      durum: 'onaylandi', // Kuralları geçti → anında yayına gir
    })

    if (error) {
      setHata('Ürün eklenemedi: ' + error.message)
      setYukleniyor(false)
      return
    }

    setBasarili(true)
    setYukleniyor(false)
  }

  // Başarılı eklenince
  if (basarili) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ürün Yayında!</h2>
          <p className="text-gray-600 mb-6">
            Ürününüz kurallara uygun bulundu ve <strong>anında yayına alındı.</strong>
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-green-700 text-sm font-semibold mb-2">✅ Geçilen Kurallar</p>
            <ul className="text-green-600 text-sm space-y-1">
              <li>✓ Minimum %10 indirim</li>
              <li>✓ Geçerli fiyat aralığı</li>
              <li>✓ Geçerli resim URL'i</li>
              <li>✓ Sorumluluk beyanı onaylandı</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <Link href="/satici/panel"
              className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition">
              Panele Dön
            </Link>
            <button onClick={() => {
              setBasarili(false)
              setForm({ ad: '', fiyat: '', eski_fiyat: '', indirim_orani: '', kategori: '', resim_url: '', satici: '', magaza_adi: '', aciklama: '' })
              setOnayladi(false)
            }}
              className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition">
              Yeni Ürün Ekle
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
          <p className="text-xs text-gray-500">Kurallara uyan ürünler anında yayına girer</p>
        </div>
        <Link href="/satici/panel"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300">
          ← Geri
        </Link>
      </div>

      {/* Kurallar bilgisi */}
      <div className="max-w-2xl mx-auto px-6 pt-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl">⚡</span>
          <div>
            <p className="text-green-800 font-semibold text-sm">Otomatik Onay Sistemi</p>
            <p className="text-green-600 text-xs mt-0.5">
              Minimum %10 indirim · Geçerli fiyat · Geçerli resim URL'i — tüm kurallara uyan ürünler <strong>anında yayına girer.</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
              <input type="text" required value={form.ad}
                onChange={e => setForm({ ...form, ad: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Kablosuz Kulaklık Pro" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Eski Fiyat (₺) <span className="text-gray-400 line-through text-xs">örn: 1.499</span>
                </label>
                <input type="number" required min="0" step="0.01" value={form.eski_fiyat}
                  onChange={e => {
                    setForm({ ...form, eski_fiyat: e.target.value })
                    fiyatHesapla(e.target.value, form.fiyat)
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="1499" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İndirimli Fiyat (₺) <span className="text-orange-500 font-bold text-xs">örn: 849</span>
                </label>
                <input type="number" required min="0" step="0.01" value={form.fiyat}
                  onChange={e => {
                    setForm({ ...form, fiyat: e.target.value })
                    fiyatHesapla(form.eski_fiyat, e.target.value)
                  }}
                  className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 ${
                    form.fiyat && form.eski_fiyat && parseFloat(form.fiyat) >= parseFloat(form.eski_fiyat)
                      ? 'border-red-400 focus:ring-red-400'
                      : 'focus:ring-orange-400'
                  }`}
                  placeholder="849" />
              </div>
            </div>

            {/* UYARI */}
            {form.fiyat && form.eski_fiyat && parseFloat(form.fiyat) >= parseFloat(form.eski_fiyat) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                <span>🚫</span>
                <p className="text-red-600 text-sm font-medium">İndirimli fiyat, eski fiyattan küçük olmalıdır!</p>
              </div>
            )}

            {/* İNDİRİM ORANI */}
            {form.indirim_orani && (
              <div className={`border rounded-lg p-3 flex items-center gap-3 ${
                parseInt(form.indirim_orani) < 10
                  ? 'bg-red-50 border-red-200'
                  : 'bg-green-50 border-green-200'
              }`}>
                <span className="text-2xl">{parseInt(form.indirim_orani) < 10 ? '⚠️' : '🎉'}</span>
                <div>
                  <p className={`font-bold ${parseInt(form.indirim_orani) < 10 ? 'text-red-700' : 'text-green-700'}`}>
                    %{form.indirim_orani} İndirim
                    {parseInt(form.indirim_orani) < 10 && ' — Minimum %10 gerekli!'}
                  </p>
                  <p className={`text-xs ${parseInt(form.indirim_orani) < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    {form.eski_fiyat} ₺ → {form.fiyat} ₺ — müşteri {(parseFloat(form.eski_fiyat) - parseFloat(form.fiyat)).toFixed(2)} ₺ tasarruf eder
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select required value={form.kategori}
                onChange={e => setForm({ ...form, kategori: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400">
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
              <input type="text" required value={form.magaza_adi}
                onChange={e => setForm({ ...form, magaza_adi: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ahmet'in Elektroniği" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ürün Açıklaması <span className="text-gray-400 text-xs">(opsiyonel)</span>
              </label>
              <textarea value={form.aciklama}
                onChange={e => setForm({ ...form, aciklama: e.target.value })}
                rows={3}
                className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                placeholder="Ürün hakkında kısa bilgi..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resim URL</label>
              <input type="url" required value={form.resim_url}
                onChange={e => setForm({ ...form, resim_url: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="https://example.com/resim.jpg" />
              {form.resim_url && (
                <img src={form.resim_url} alt="Önizleme"
                  className="mt-2 w-32 h-32 object-cover rounded-lg border"
                  onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>

            {/* SORUMLULUK BEYANI */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={onayladi}
                  onChange={e => setOnayladi(e.target.checked)}
                  className="mt-1 accent-orange-500 w-4 h-4 shrink-0" />
                <span className="text-sm text-gray-700">
                  Eklediğim ürünün gerçekten indirimli olduğunu, eski fiyatın doğru olduğunu ve
                  yanıltıcı fiyat bilgisi vermediğimi onaylıyorum.{' '}
                  <strong>Yanlış bilgi durumunda tüm hukuki sorumluluk tarafıma aittir.</strong>
                </span>
              </label>
            </div>

            {hata && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{hata}</div>
            )}

            <button type="submit" disabled={yukleniyor || !onayladi}
              className={`w-full py-3 rounded-lg font-bold transition text-lg ${
                onayladi
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}>
              {yukleniyor ? '⏳ Yükleniyor...' : '⚡ Anında Yayına Al'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}
