"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPanel() {
  const router = useRouter();
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const giris = localStorage.getItem("adminGiris");
    if (giris !== "true") {
      router.push("/admin/giris");
    } else {
      setYukleniyor(false);
    }
  }, [router]);

  const cikisYap = () => {
    localStorage.removeItem("adminGiris");
    router.push("/admin/giris");
  };

  if (yukleniyor) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  const istatistikler = [
    { label: "Toplam Ürün", value: "14", icon: "📦", color: "bg-blue-500" },
    { label: "Toplam Satıcı", value: "5", icon: "🏪", color: "bg-green-500" },
    { label: "Toplam Sipariş", value: "0", icon: "🛒", color: "bg-orange-500" },
    { label: "Toplam Gelir", value: "₺0", icon: "💰", color: "bg-purple-500" },
  ];

  const urunler = [
    { id: "1", icon: "🎧", name: "Kablosuz Kulaklık Pro", price: 849, category: "Elektronik", seller: "TechMart", status: "Aktif" },
    { id: "2", icon: "👟", name: "Spor Ayakkabı Erkek", price: 629, category: "Giyim", seller: "SportPlus", status: "Aktif" },
    { id: "3", icon: "⌚", name: "Akıllı Saat Siyah", price: 1249, category: "Elektronik", seller: "TechMart", status: "Aktif" },
    { id: "4", icon: "👜", name: "Deri Çanta Kadın", price: 459, category: "Giyim", seller: "ModaKöşe", status: "Aktif" },
    { id: "5", icon: "📱", name: "Akıllı Telefon 128GB", price: 12999, category: "Elektronik", seller: "TechMart", status: "Aktif" },
  ];

  const saticilar = [
    { initials: "TM", name: "TechMart", color: "bg-orange-500", urunSayisi: 4, puan: 4.9 },
    { initials: "MK", name: "ModaKöşe", color: "bg-green-500", urunSayisi: 3, puan: 4.8 },
    { initials: "ES", name: "EvcilShop", color: "bg-purple-500", urunSayisi: 2, puan: 4.7 },
    { initials: "KZ", name: "KozmetikZen", color: "bg-pink-500", urunSayisi: 2, puan: 4.9 },
    { initials: "SP", name: "SportPlus", color: "bg-blue-500", urunSayisi: 3, puan: 4.6 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SOL MENU */}
      <aside className="w-56 bg-gray-900 text-white min-h-screen fixed">
        <div className="p-4 border-b border-gray-700">
          <div className="text-orange-400 font-bold text-lg">ucuzuygun.com</div>
          <div className="text-gray-400 text-xs">Admin Paneli</div>
        </div>
        <nav className="p-4">
          <div className="space-y-1">
            {[
              { icon: "📊", label: "Dashboard", href: "/admin", active: true },
              { icon: "📦", label: "Ürünler", href: "/admin/urunler", active: false },
              { icon: "🏪", label: "Satıcılar", href: "/admin/saticilar", active: false },
              { icon: "🛒", label: "Siparişler", href: "/admin/siparisler", active: false },
              { icon: "👥", label: "Kullanıcılar", href: "/admin/kullanicilar", active: false },
              { icon: "📈", label: "Raporlar", href: "/admin/raporlar", active: false },
              { icon: "⚙️", label: "Ayarlar", href: "/admin/ayarlar", active: false },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  item.active
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 space-y-1">
            <a href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white text-sm cursor-pointer">
              <span>🌐</span><span>Siteye Git</span>
            </a>
            <button onClick={cikisYap} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-red-800 hover:text-white text-sm cursor-pointer">
              <span>🚪</span><span>Çıkış Yap</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* ANA İÇERİK */}
      <main className="ml-56 flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 text-sm">Hoş geldiniz, Admin!</p>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">
            + Yeni Ürün Ekle
          </button>
        </div>

        {/* İSTATİSTİKLER */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {istatistikler.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg p-4 flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-gray-500 text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ÜRÜNLER TABLOSU */}
          <div className="md:col-span-2 bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-800">Son Ürünler</h2>
              <Link href="/admin/urunler" className="text-orange-500 text-sm">Tümünü Gör →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b">
                    <th className="text-left pb-2">Ürün</th>
                    <th className="text-left pb-2">Kategori</th>
                    <th className="text-left pb-2">Fiyat</th>
                    <th className="text-left pb-2">Satıcı</th>
                    <th className="text-left pb-2">Durum</th>
                    <th className="text-left pb-2">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {urunler.map((urun) => (
                    <tr key={urun.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{urun.icon}</span>
                          <span className="text-gray-700 font-medium">{urun.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500">{urun.category}</td>
                      <td className="py-3 text-orange-500 font-medium">{urun.price.toLocaleString()} TL</td>
                      <td className="py-3 text-gray-500">{urun.seller}</td>
                      <td className="py-3">
                        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">{urun.status}</span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button className="text-blue-500 hover:underline text-xs">Düzenle</button>
                          <button className="text-red-500 hover:underline text-xs">Sil</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SATICILAR */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-800">Satıcılar</h2>
              <Link href="/admin/saticilar" className="text-orange-500 text-sm">Tümü →</Link>
            </div>
            <div className="space-y-3">
              {saticilar.map((satici) => (
                <div key={satici.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className={`w-9 h-9 rounded-full ${satici.color} flex items-center justify-center text-white text-sm font-bold`}>{satici.initials}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{satici.name}</div>
                    <div className="text-xs text-gray-400">{satici.urunSayisi} ürün · ⭐ {satici.puan}</div>
                  </div>
                  <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">Aktif</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full border border-dashed border-gray-300 text-gray-400 py-2 rounded-lg text-sm hover:border-orange-400 hover:text-orange-400">
              + Yeni Satıcı Ekle
            </button>
          </div>

        </div>

        {/* SON AKTİVİTE */}
        <div className="bg-white rounded-lg p-4 mt-6">
          <h2 className="font-bold text-gray-800 mb-4">Son Aktivite</h2>
          <div className="space-y-3">
            {[
              { icon: "📦", text: "Yeni ürün eklendi: Kablosuz Kulaklık Pro", time: "2 saat önce", color: "bg-blue-100 text-blue-500" },
              { icon: "🏪", text: "Yeni satıcı kaydı: TechMart", time: "5 saat önce", color: "bg-green-100 text-green-500" },
              { icon: "🌐", text: "Site yayına alındı: ucuzuygun.com", time: "1 gün önce", color: "bg-orange-100 text-orange-500" },
            ].map((aktivite, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${aktivite.color} flex items-center justify-center text-sm`}>{aktivite.icon}</div>
                <div className="flex-1">
                  <div className="text-sm text-gray-700">{aktivite.text}</div>
                  <div className="text-xs text-gray-400">{aktivite.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}