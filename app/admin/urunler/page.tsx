"use client";

import { useState } from "react";
import Link from "next/link";

const urunler = [
  { id: "1", icon: "🎧", name: "Kablosuz Kulaklık Pro", price: 849, category: "Elektronik", seller: "TechMart", status: "Aktif" },
  { id: "2", icon: "👟", name: "Spor Ayakkabı Erkek", price: 629, category: "Giyim", seller: "SportPlus", status: "Aktif" },
  { id: "3", icon: "⌚", name: "Akıllı Saat Siyah", price: 1249, category: "Elektronik", seller: "TechMart", status: "Aktif" },
  { id: "4", icon: "👜", name: "Deri Çanta Kadın", price: 459, category: "Giyim", seller: "ModaKöşe", status: "Aktif" },
  { id: "5", icon: "📱", name: "Akıllı Telefon 128GB", price: 12999, category: "Elektronik", seller: "TechMart", status: "Aktif" },
  { id: "6", icon: "💻", name: "Laptop 16GB RAM", price: 24999, category: "Elektronik", seller: "TechMart", status: "Aktif" },
  { id: "7", icon: "👒", name: "Hasır Şapka", price: 199, category: "Giyim", seller: "ModaKöşe", status: "Aktif" },
  { id: "8", icon: "🐾", name: "Kedi Maması 5kg", price: 349, category: "Evcil Hayvan", seller: "EvcilShop", status: "Aktif" },
];

export default function UrunlerPage() {
  const [arama, setArama] = useState("");
  const [kategori, setKategori] = useState("Tümü");

  const kategoriler = ["Tümü", "Elektronik", "Giyim", "Evcil Hayvan"];

  const filtrelenmis = urunler.filter((u) => {
    const aramaUygun = u.name.toLowerCase().includes(arama.toLowerCase());
    const kategoriUygun = kategori === "Tümü" || u.category === kategori;
    return aramaUygun && kategoriUygun;
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ürünler</h1>
          <p className="text-gray-500 text-sm">{urunler.length} ürün listeleniyor</p>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">
          + Yeni Ürün Ekle
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Ürün ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:border-orange-400"
        />
        <div className="flex gap-2">
          {kategoriler.map((k) => (
            <button
              key={k}
              onClick={() => setKategori(k)}
              className={`px-3 py-2 rounded-lg text-sm ${
                kategori === k
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-orange-400"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b">
              <th className="text-left pb-3">Ürün</th>
              <th className="text-left pb-3">Kategori</th>
              <th className="text-left pb-3">Fiyat</th>
              <th className="text-left pb-3">Satıcı</th>
              <th className="text-left pb-3">Durum</th>
              <th className="text-left pb-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filtrelenmis.map((urun) => (
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
        {filtrelenmis.length === 0 && (
          <div className="text-center text-gray-400 py-8">Ürün bulunamadı.</div>
        )}
      </div>
    </>
  );
}
