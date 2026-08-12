'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Satici = {
  id: string
  ad: string
  eposta: string
  magaza_adi: string
  telefon: string
  durum: string
  olusturulma: string
}

export default function AdminSaticilar() {
  const [saticilar, setSaticilar] = useState<Satici[]>([])
  const [yukleniyor, setYukleniyor] = useState(true)

  const saticilarıGetir = async () => {
    const { data } = await supabase
      .from('saticilar')
      .select('*')
      .order('olusturulma', { ascending: false })
    setSaticilar(data || [])
    setYukleniyor(false)
  }

  useEffect(() => { saticilarıGetir() }, [])

  const durumGuncelle = async (id: string, yeniDurum: string) => {
    await supabase.from('saticilar').update({ durum: yeniDurum }).eq('id', id)
    saticilarıGetir()
  }

  const durumRengi = (durum: string) => {
    if (durum === 'aktif') return 'bg-green-100 text-green-700'
    if (durum === 'pasif') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Satıcı Başvuruları</h1>

      {yukleniyor ? (
        <p>Yükleniyor...</p>
      ) : saticilar.length === 0 ? (
        <p className="text-gray-500">Henüz satıcı başvurusu yok.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left">Ad</th>
                <th className="p-3 text-left">Mağaza</th>
                <th className="p-3 text-left">E-posta</th>
                <th className="p-3 text-left">Telefon</th>
                <th className="p-3 text-left">Durum</th>
                <th className="p-3 text-left">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {saticilar.map(s => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{s.ad}</td>
                  <td className="p-3 font-medium">{s.magaza_adi}</td>
                  <td className="p-3">{s.eposta}</td>
                  <td className="p-3">{s.telefon || '-'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${durumRengi(s.durum)}`}>
                      {s.durum}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    {s.durum !== 'aktif' && (
                      <button
                        onClick={() => durumGuncelle(s.id, 'aktif')}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600"
                      >
                        Onayla
                      </button>
                    )}
                    {s.durum !== 'pasif' && (
                      <button
                        onClick={() => durumGuncelle(s.id, 'pasif')}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600"
                      >
                        Pasife Al
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}