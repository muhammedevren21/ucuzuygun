import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function UrunDetay({ params }: { params: { id: string } }) {
  const { data: urun } = await supabase
    .from('urunler')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!urun) notFound()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-orange-500 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" className="text-white text-2xl font-bold">ucuzuygun.com</a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-orange-500">Ana Sayfa</a>
          <span className="mx-2">›</span>
          <span>{urun.kategori}</span>
          <span className="mx-2">›</span>
          <span className="text-gray-800">{urun.ad}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-8">
          {/* Resim */}
          <div className="w-full md:w-96 h-80 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
            {urun.resim_url ? (
              <img src={urun.resim_url} alt={urun.ad} className="w-full h-full object-cover" />
            ) : (
              <span className="text-8xl">📦</span>
            )}
          </div>

          {/* Bilgiler */}
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">{urun.magaza_adi || urun.satici}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{urun.ad}</h1>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-orange-500">{urun.fiyat} ₺</span>
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-500">Kategori: </span>
              <span className="text-sm font-medium text-gray-700">{urun.kategori}</span>
            </div>

            <div className="mb-6">
              <span className="text-sm text-gray-500">Satıcı: </span>
              <span className="text-sm font-medium text-gray-700">{urun.magaza_adi || urun.satici}</span>
            </div>

            {/* Butonlar */}
            <div className="flex gap-3">
              <button className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-orange-600 transition">
                🛒 Sepete Ekle
              </button>
              <button className="border border-gray-300 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 transition">
                ♡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}