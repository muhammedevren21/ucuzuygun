"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGiris() {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const router = useRouter();

  // Admin bilgileri - ileride veritabanına taşınacak
  const ADMIN_KULLANICI = "admin";
  const ADMIN_SIFRE = "ucuzuygun2024";

  const handleGiris = () => {
    setYukleniyor(true);
    setHata("");

    setTimeout(() => {
      if (kullaniciAdi === ADMIN_KULLANICI && sifre === ADMIN_SIFRE) {
        localStorage.setItem("adminGiris", "true");
        router.push("/admin");
      } else {
        setHata("Kullanıcı adı veya şifre hatalı!");
        setYukleniyor(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-orange-500 text-2xl font-bold mb-1">ucuzuygun.com</div>
          <div className="text-gray-500 text-sm">Admin Paneli Girişi</div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı</label>
            <input
              type="text"
              value={kullaniciAdi}
              onChange={(e) => setKullaniciAdi(e.target.value)}
              placeholder="admin"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-orange-400 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-orange-400 text-gray-800"
              onKeyDown={(e) => e.key === "Enter" && handleGiris()}
            />
          </div>

          {hata && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
              ❌ {hata}
            </div>
          )}

          <button
            onClick={handleGiris}
            disabled={yukleniyor}
            className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-bold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {yukleniyor ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-gray-400 text-sm hover:text-orange-500">← Siteye Dön</a>
        </div>
      </div>
    </div>
  );
}
