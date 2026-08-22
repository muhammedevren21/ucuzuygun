export default function Page() { return <div className='p-8'><h1 className='text-2xl font-bold capitalize'>raporlar</h1><p className='text-gray-500 mt-2'>Yakında eklenecek.</p></div> }
"use client";

const aylikVeri = [
  { ay: "Ocak", gelir: 0, siparis: 0, yeniKullanici: 12 },
  { ay: "Şubat", gelir: 0, siparis: 0, yeniKullanici: 18 },
  { ay: "Mart", gelir: 0, siparis: 0, yeniKullanici: 24 },
  { ay: "Nisan", gelir: 0, siparis: 0, yeniKullanici: 31 },
  { ay: "Mayıs", gelir: 0, siparis: 0, yeniKullanici: 27 },
  { ay: "Haziran", gelir: 0, siparis: 0, yeniKullanici: 19 },
];

const kategoriSatis = [
  { kategori: "Elektronik", urunSayisi: 8, oran: 57 },
  { kategori: "Giyim", urunSayisi: 4, oran: 29 },
  { kategori: "Evcil Hayvan", urunSayisi: 1, oran: 7 },
  { kategori: "Kozmetik", urunSayisi: 1, oran: 7 },
];

export default function RaporlarPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Raporlar</h1>
        <p className="text-gray-500 text-sm">Platform genel istatistikleri</p>
      </div>

      {/* ÖZET KARTLAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Toplam Gelir", value: "₺0", icon: "💰", color: "bg-purple-500", alt: "İyzico entegrasyonu bekleniyor" },
          { label: "Toplam Sipariş", value: "0", icon: "🛒", color: "bg-orange-500", alt: "Henüz sipariş yok" },
          { label: "Toplam Kullanıcı", value: "6", icon: "👥", color: "bg-blue-500", alt: "+2 bu ay" },
          { label: "Toplam Ürün", value: "14", icon: "📦", color: "bg-green-500", alt: "8 kategoride" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-xl`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            </div>
            <div className="text-gray-700 text-sm font-medium">{stat.label}</div>
            <div className="text-gray-400 text-xs mt-0.5">{stat.alt}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* AYLIK KULLANICI BÜYÜME */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-bold text-gray-800 mb-4">Aylık Yeni Kullanıcı</h2>
          <div className="space-y-3">
            {aylikVeri.map((veri) => (
              <div key={veri.ay} className="flex items-center gap-3">
                <div className="w-12 text-xs text-gray-400">{veri.ay}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-orange-400 h-2 rounded-full"
                    style={{ width: `${(veri.yeniKullanici / 35) * 100}%` }}
                  />
                </div>
                <div className="w-6 text-xs text-gray-600 text-right">{veri.yeniKullanici}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KATEGORİ DAĞILIMI */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-bold text-gray-800 mb-4">Kategori Dağılımı</h2>
          <div className="space-y-3">
            {kategoriSatis.map((k) => (
              <div key={k.kategori} className="flex items-center gap-3">
                <div className="w-24 text-xs text-gray-400">{k.kategori}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full"
                    style={{ width: `${k.oran}%` }}
                  />
                </div>
                <div className="w-8 text-xs text-gray-600 text-right">%{k.oran}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-400">Toplam 14 ürün · 4 kategori</div>
          </div>
        </div>

        {/* PLATFORM DURUMU */}
        <div className="bg-white rounded-lg p-4 md:col-span-2">
          <h2 className="font-bold text-gray-800 mb-4">Platform Durumu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Ödeme Sistemi", durum: "Beklemede", aciklama: "İyzico entegrasyonu şirket kurulunca yapılacak", icon: "💳", renk: "bg-yellow-100 text-yellow-600" },
              { label: "ETBİS Kaydı", durum: "Beklemede", aciklama: "Şirket kurulumu tamamlanınca yapılacak", icon: "📋", renk: "bg-yellow-100 text-yellow-600" },
              { label: "Site Yayını", durum: "Aktif", aciklama: "ucuzuygun.com canlıda, Vercel üzerinde çalışıyor", icon: "🌐", renk: "bg-green-100 text-green-600" },
            ].map((item) => (
              <div key={item.label} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <div className="font-medium text-gray-700 text-sm">{item.label}</div>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${item.renk}`}>{item.durum}</span>
                </div>
                <div className="text-xs text-gray-400">{item.aciklama}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}