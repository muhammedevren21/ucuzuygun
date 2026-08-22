"use client";

import { useState } from "react";

export default function AyarlarPage() {
  const [sitAdi, setSiteAdi] = useState("ucuzuygun.com");
  const [siteAciklama, setSiteAciklama] = useState("Türkiye'nin en uygun pazaryeri");
  const [iletisimEmail, setIletisimEmail] = useState("info@ucuzuygun.com");
  const [komisyonOrani, setKomisyonOrani] = useState("10");
  const [minSiparis, setMinSiparis] = useState("0");
  const [kargoUcreti, setKargoUcreti] = useState("29.90");
  const [kaydedildi, setKaydedildi] = useState(false);

  const kaydet = () => {
    setKaydedildi(true);
    setTimeout(() => setKaydedildi(false), 2500);
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ayarlar</h1>
        <p className="text-gray-500 text-sm">Platform genel ayarları</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* GENEL BİLGİLER */}
        <div className="bg-white rounded-lg p-5">
          <h2 className="font-bold text-gray-800 mb-4">Genel Bilgiler</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Site Adı</label>
              <input
                type="text"
                value={sitAdi}
                onChange={(e) => setSiteAdi(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Site Açıklaması</label>
              <input
                type="text"
                value={siteAciklama}
                onChange={(e) => setSiteAciklama(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">İletişim E-posta</label>
              <input
                type="email"
                value={iletisimEmail}
                onChange={(e) => setIletisimEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>
        </div>

        {/* TİCARET AYARLARI */}
        <div className="bg-white rounded-lg p-5">
          <h2 className="font-bold text-gray-800 mb-4">Ticaret Ayarları</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Komisyon Oranı (%)</label>
              <input
                type="number"
                value={komisyonOrani}
                onChange={(e) => setKomisyonOrani(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
              <p className="text-xs text-gray-400 mt-1">İyzico entegrasyonu sonrası aktif olacak</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Minimum Sipariş Tutarı (₺)</label>
              <input
                type="number"
                value={minSiparis}
                onChange={(e) => setMinSiparis(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Standart Kargo Ücreti (₺)</label>
              <input
                type="number"
                value={kargoUcreti}
                onChange={(e) => setKargoUcreti(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>
        </div>

        {/* ENTEGRASYONLAR */}
        <div className="bg-white rounded-lg p-5">
          <h2 className="font-bold text-gray-800 mb-4">Entegrasyonlar</h2>
          <div className="space-y-3">
            {[
              { ad: "İyzico Ödeme", durum: "Beklemede", aciklama: "Şirket kurulunca eklenecek", icon: "💳" },
              { ad: "ETBİS", durum: "Beklemede", aciklama: "Şirket kurulunca eklenecek", icon: "📋" },
              { ad: "Vercel", durum: "Aktif", aciklama: "ucuzuygun.com yayında", icon: "▲" },
              { ad: "Supabase", durum: "Aktif", aciklama: "Veritabanı bağlı", icon: "🗄️" },
              { ad: "GoDaddy", durum: "Aktif", aciklama: "Domain bağlı", icon: "🌐" },
            ].map((item) => (
              <div key={item.ad} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700">{item.ad}</div>
                  <div className="text-xs text-gray-400">{item.aciklama}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.durum === "Aktif"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}>
                  {item.durum}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* YÖNETİCİ HESABI */}
        <div className="bg-white rounded-lg p-5">
          <h2 className="font-bold text-gray-800 mb-4">Yönetici Hesabı</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Kullanıcı Adı</label>
              <input
                type="text"
                defaultValue="admin"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Yeni Şifre</label>
              <input
                type="password"
                placeholder="Değiştirmek için yeni şifre girin"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Şifre Tekrar</label>
              <input
                type="password"
                placeholder="Şifreyi tekrar girin"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>
        </div>

      </div>

      {/* KAYDET */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={kaydet}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-600"
        >
          Kaydet
        </button>
        {kaydedildi && (
          <span className="text-green-600 text-sm">✓ Ayarlar kaydedildi</span>
        )}
      </div>
    </>
  );
}