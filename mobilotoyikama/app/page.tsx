import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="text-blue-600 font-bold text-xl">mobilotoyıkama.com</div>
        <div className="flex gap-3">
          <Link href="/giris" className="text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-100">Giriş Yap</Link>
          <Link href="/kayit" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">Kayıt Ol</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Arabanızı Kapınızda Yıkayalım</h1>
        <p className="text-blue-100 text-lg mb-8">En yakın mobil yıkama aracı dakikalar içinde kapınızda</p>
        <div className="max-w-md mx-auto bg-white rounded-xl p-4 flex gap-2">
          <input
            type="text"
            placeholder="Adresinizi girin..."
            className="flex-1 text-gray-700 text-sm focus:outline-none px-2"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            Sipariş Ver
          </button>
        </div>
      </section>

      {/* HİZMETLER */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🚿", title: "Dış Yıkama", price: "150₺", desc: "Araç dışı tamamen temizlenir" },
            { icon: "✨", title: "İç + Dış Yıkama", price: "250₺", desc: "İç ve dış komple temizlik" },
            { icon: "💎", title: "Detaylı Temizlik", price: "450₺", desc: "Profesyonel detaylı temizlik" },
          ].map((hizmet) => (
            <div key={hizmet.title} className="border border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
              <div className="text-4xl mb-3">{hizmet.icon}</div>
              <div className="font-bold text-gray-800 mb-1">{hizmet.title}</div>
              <div className="text-blue-600 font-bold text-lg mb-2">{hizmet.price}</div>
              <div className="text-gray-500 text-sm">{hizmet.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Nasıl Çalışır?</h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {[
            { step: "1", icon: "📍", title: "Adres Gir", desc: "Bulunduğunuz adresi girin" },
            { step: "2", icon: "🚗", title: "Araç Bilgisi", desc: "Plaka ve fotoğraf ekleyin" },
            { step: "3", icon: "💳", title: "Ödeme Yap", desc: "Güvenli online ödeme" },
            { step: "4", icon: "🧹", title: "Yıkama", desc: "Ekibimiz kapınıza gelir" },
          ].map((adim) => (
            <div key={adim.step} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">{adim.step}</div>
              <div className="text-2xl mb-2">{adim.icon}</div>
              <div className="font-bold text-gray-800 mb-1">{adim.title}</div>
              <div className="text-gray-500 text-sm">{adim.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 text-center text-sm">
        <div className="text-white font-bold mb-2">mobilotoyıkama.com</div>
        <p>© 2025 Tüm hakları saklıdır.</p>
      </footer>

    </div>
  );
}