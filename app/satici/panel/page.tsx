'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Urun = {
  id: number
  ad: string
  fiyat: number
  kategori: string
  resim: string
}

export default function SaticiPanel() {
  const router = useRouter()
  const [urunler, setUrunler] = useState<Urun[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)
  const [saticiId, setSaticiId] = useState<string | null>(null)

  useEffect(() => {
  const kontrol = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/satici/giris'
      return
    }
    setSaticiId(user.id)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Satıcı Paneli</h1>
        <div className="flex gap-3">
          <Link
            href="/satici/panel/urun-ekle"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600"
          >
            + Ürün Ekle
          </Link>
          <button
            onClick={cikisYap}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300"
          >
            Çıkış
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ürünlerim</h2>

        {yukleniyor ? (
          <p className="text-gray-600">Yükleniyor...</p>
        ) : urunler.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-500 mb-4">Henüz ürün eklemediniz.</p>
            <Link
              href="/satici/panel/urun-ekle"
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600"
            >
              İlk Ürününüzü Ekleyin
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-900 font-semibold">
                <tr>
                  <th className="p-3 text-left">Resim</th>
                  <th className="p-3 text-left">Ürün Adı</th>
                  <th className="p-3 text-left">Kategori</th>
                  <th className="p-3 text-left">Fiyat</th>
                  <th className="p-3 text-left">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {urunler.map(u => (
                  <tr key={u.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 flex gap-2">
  <Link
    href={`/satici/panel/urun-duzenle/${u.id}`}
    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
  >
    Düzenle
  </Link>
  <button
    onClick={() => urunSil(u.id)}
    className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600"
  >
    Sil
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}