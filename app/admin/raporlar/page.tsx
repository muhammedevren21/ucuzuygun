"use client";

const aylikVeri = [
  { ay: "Ocak", yeniKullanici: 12 },
  { ay: "Subat", yeniKullanici: 18 },
  { ay: "Mart", yeniKullanici: 24 },
  { ay: "Nisan", yeniKullanici: 31 },
  { ay: "Mayis", yeniKullanici: 27 },
  { ay: "Haziran", yeniKullanici: 19 },
];

const kategoriSatis = [
  { kategori: "Elektronik", oran: 57 },
  { kategori: "Giyim", oran: 29 },
  { kategori: "Evcil Hayvan", oran: 7 },
  { kategori: "Kozmetik", oran: 7 },
];

export default function RaporlarPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Raporlar</h1>
        <p className="text-gray-500 text-sm">Platform genel istatistikleri</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Toplam Gelir", value: "0", icon: "💰", color: "bg-purple-500", alt: "Iyzico bekleniyor" },
          { label: "Toplam Siparis", value: "0", icon: "🛒", color: "bg-orange-500", alt: "Henuz siparis yok" },
          { label: "Toplam Kullanici", value: "6", icon: "👥", color: "bg-blue-500", alt: "+2 bu ay" },
          { label: "Toplam Urun", value: "14", icon: "📦", color: "bg-green-500", alt: "8 kategoride" },
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
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-bold text-gray-800 mb-4">Aylik Yeni Kullanici</h2>
          <div className="space-y-3">
            {aylikVeri.map((veri) => (
              <div key={veri.ay} className="flex items-center gap-3">
                <div className="w-12 text-xs text-gray-400">{veri.ay}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${(veri.yeniKullanici / 35) * 100}%` }} />
                </div>
                <div className="w-6 text-xs text-gray-600 text-right">{veri.yeniKullanici}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-bold text-gray-800 mb-4">Kategori Dagilimi</h2>
          <div className="space-y-3">
            {kategoriSatis.map((k) => (
              <div key={k.kategori} className="flex items-center gap-3">
                <div className="w-24 text-xs text-gray-400">{k.kategori}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${k.oran}%` }} />
                </div>
                <div className="w-8 text-xs text-gray-600 text-right">%{k.oran}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
