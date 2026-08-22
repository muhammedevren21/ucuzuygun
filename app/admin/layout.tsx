"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
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

  const menuItems = [
    { icon: "📊", label: "Dashboard", href: "/admin" },
    { icon: "📦", label: "Ürünler", href: "/admin/urunler" },
    { icon: "🏪", label: "Satıcılar", href: "/admin/saticilar" },
    { icon: "🛒", label: "Siparişler", href: "/admin/siparisler" },
    { icon: "👥", label: "Kullanıcılar", href: "/admin/kullanicilar" },
    { icon: "📈", label: "Raporlar", href: "/admin/raporlar" },
    { icon: "⚙️", label: "Ayarlar", href: "/admin/ayarlar" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-56 bg-gray-900 text-white min-h-screen fixed">
        <div className="p-4 border-b border-gray-700">
          <div className="text-orange-400 font-bold text-lg">ucuzuygun.com</div>
          <div className="text-gray-400 text-xs">Admin Paneli</div>
        </div>
        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  pathname === item.href
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
            <a href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white text-sm">
              <span>🌐</span><span>Siteye Git</span>
            </a>
            <button onClick={cikisYap} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-red-800 hover:text-white text-sm">
              <span>🚪</span><span>Çıkış Yap</span>
            </button>
          </div>
        </nav>
      </aside>
      <main className="ml-56 flex-1 p-6">
        {children}
      </main>
    </div>
  );
}