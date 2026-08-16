'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function UrunDuzenle({ params }: { params: Promise<{ id: string }> }) {
  const [form, setForm] = useState({ ad: '', fiyat: '', kategori: '', magaza_adi: '', resim_url: '' })
  const [yukleniyor, setYukleniyor] = useState(true)
  const [kaydediyor, setKaydediyor] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function getUrun() {
      const { id } = await params
      const { data } = await supabase.from('urunler').select('*').eq('id', id).single()
      if (data) {
        setForm({
          ad: data.ad || '',
          fiyat: data.fiyat || '',
          kategori: data.kategori || '',
          magaza_adi: data.magaza_adi || data.satici || '',
          resim_url: data.resim_url || ''
        })
      }
      setYukleniyor(false)
    }
    getUrun()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setKaydediyor(true)

    const { id } = await params
    const { error } = await supabase
      .from('urunler')
      .update({
        ad: form.ad,
        fiyat: parseFloat(form.fiyat),
        kategori: form.kategori,
        magaza_adi: form.magaza_adi,
        resim_url: form.resim_url
      })
      .eq('id', id)

    if (error) {
      alert('Hata: ' + error.message)
    } else {
      alert('Ürün güncellendi!')
      router.push('/satici/panel')
    }
    setKaydediyor(false)
  }

  if (yukleniyor) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111' }}>Ürünü Düzenle</h1>
        <button onClick={() => router.push('/satici/panel')}
          style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          ← Geri
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, color: '#111' }}>Ürün Adı</label>
          <input required value={form.ad} onChange={e => setForm({...form, ad: e.target.value})}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 16, boxSizing: 'border-box', color: '#111' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, color: '#111' }}>Fiyat (₺)</label>
          <input required type="number" step="0.01" value={form.fiyat}
            onChange={e => setForm({...form, fiyat: e.target.value})}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 16, boxSizing: 'border-box', color: '#111' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, color: '#111' }}>Kategori</label>
          <select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 16, boxSizing: 'border-box', color: '#111' }}>
            <option>Giyim</option>
            <option>Elektronik</option>
            <option>Ev & Yaşam</option>
            <option>Spor</option>
            <option>Kitap</option>
            <option>Diğer</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, color: '#111' }}>Mağaza Adı</label>
          <input required value={form.magaza_adi} onChange={e => setForm({...form, magaza_adi: e.target.value})}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 16, boxSizing: 'border-box', color: '#111' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, color: '#111' }}>Resim URL</label>
          <input value={form.resim_url} onChange={e => setForm({...form, resim_url: e.target.value})}
            placeholder="https://example.com/resim.jpg"
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 16, boxSizing: 'border-box', color: '#111' }} />
          {form.resim_url && (
            <img src={form.resim_url} alt="Önizleme"
              style={{ marginTop: 8, maxHeight: 150, borderRadius: 8, objectFit: 'contain' }} />
          )}
        </div>

        <button type="submit" disabled={kaydediyor}
          style={{
            padding: 14, background: kaydediyor ? '#ccc' : '#f97316',
            color: 'white', border: 'none', borderRadius: 8,
            fontSize: 16, fontWeight: 600, cursor: kaydediyor ? 'not-allowed' : 'pointer'
          }}>
          {kaydediyor ? '⏳ Kaydediliyor...' : '💾 Kaydet'}
        </button>
      </form>
    </div>
  )
}