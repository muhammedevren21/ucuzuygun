export default function Page() { return <div className='p-8'><h1 className='text-2xl font-bold capitalize'>kullanicilar</h1><p className='text-gray-500 mt-2'>Yakında eklenecek.</p></div> }
"use client";

import { useState } from "react";

const kullanicilar = [
  { id: "1", ad: "Ahmet Yılmaz", email: "ahmet@gmail.com", telefon: "0532 111 22 33", kayitTarihi: "12 Ocak 2025", siparisSayisi: 3, durum: "Aktif" },
  { id: "2", ad: "Fatma Kaya", email: "fatma@gmail.com", telefon: "0543 222 33 44", kayitTarihi: "18 Şubat 2025", siparisSayisi: 7, durum: "Aktif" },
  { id: "3", ad: "Mehmet Demir", email: "mehmet@hotmail.com", telefon: "0555 333 44 55", kayitTarihi: "3 Mart 2025", siparisSayisi: 1, durum: "Aktif" },
  { id: "4", ad: "Ayşe Çelik", email: "ayse@gmail.com", telefon: "0506 444 55 66", kayitTarihi: "25 Mart 2025", siparisSayisi: 0, durum: "Pasif" },
  { id: "5", ad: "Ali Şahin", email: "ali@gmail.com", telefon: "0532 555 66 77", kayitTarihi: "7 Nisan 2025", siparisSayisi: 2, durum: "Aktif" },
  { id: "6", ad: "Zeynep Arslan", email: "zeynep@gmail.com", telefon: "0541 666 77 88", kayitTarihi: "14 Mayıs 2025", siparisSayisi: 5, durum: "Aktif" },
];

export default function KullanicilarPage() {
  const [arama, setArama] = useState("");
  const [durum, setDurum] = useState("Tümü");

  const filtrelenmis = kullanicilar.filter((k) => {
    const aramaUygun =
      k.ad.toLowerCase().includes(arama.toLowerCase()) ||
      k.email.toLowerCase().includes(arama.toLowerCase());
    const durumUygun = durum === "Tümü" || k.durum === durum;
    return aramaUygun && durumUygun;
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kullanıcılar</h1>
          <p className="text-gray-500 text-sm">{kullanicilar.length} kullanıcı kayıtlı</p>
        </div>
      </div>

      {/* FİLTRELER */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Ad veya e-posta ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:border-orange-400"
        />
        <div className="flex gap-2">
          {["Tümü", "Aktif", "Pasif"].map((d) => (
            <button
              key={d}
              onClick={() => setDurum(d)}
              className={`px-3 py-2 rounded-lg text-sm ${
                durum === d
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-orange-400"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* TABLO */}
      <div className="bg-white rounded-lg p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b">
              <th className="text-left pb-3">Kullanıcı</th>
              <th className="text-left pb-3">Telefon</th>
              <th className="text-left pb-3">Kayıt Tarihi</th>
              <th className="text-left pb-3">Sipariş</th>
              <th className="text-left pb-3">Durum</th>
              <th className="text-left pb-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filtrelenmis.map((k) => (
              <tr key={k.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-xs font-bold">
                      {k.ad.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">{k.ad}</div>
                      <div className="text-xs text-gray-400">{k.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-gray-500">{k.telefon}</td>
                <td className="py-3 text-gray-500">{k.kayitTarihi}</td>
                <td className="py-3 text-gray-700 font-medium">{k.siparisSayisi}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    k.durum === "Aktif"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {k.durum}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:underline text-xs">Detay</button>
                    <button className="text-red-500 hover:underline text-xs">Engelle</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtrelenmis.length === 0 && (
          <div className="text-center text-gray-400 py-8">Kullanıcı bulunamadı.</div>
        )}
      </div>
    </>
  );
}