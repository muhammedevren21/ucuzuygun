const urunler = [
  {
    id: "1",
    icon: "🎧",
    name: "Kablosuz Kulaklık Pro",
    price: 849,
    oldPrice: 1499,
    discount: 43,
    rating: 4.8,
    reviewCount: 2841,
    category: "Elektronik",
    seller: "TechMart",
    description:
      "Yüksek kaliteli ses deneyimi sunan kablosuz kulaklık. 30 saate kadar pil ömrü, aktif gürültü engelleme özelliği ve premium ses kalitesiyle müzik dinleme deneyiminizi üst seviyeye taşıyın.",
    features: ["30 saat pil ömrü", "Aktif gürültü engelleme", "Bluetooth 5.0", "Katlanabilir tasarım"],
  },
  {
    id: "2",
    icon: "👟",
    name: "Spor Ayakkabı Erkek",
    price: 629,
    oldPrice: 999,
    discount: 37,
    rating: 4.5,
    reviewCount: 1203,
    category: "Giyim",
    seller: "SportPlus",
    description: "Hafif ve dayanıklı spor ayakkabı. Koşu, yürüyüş ve günlük kullanım için ideal.",
    features: ["Hafif taban", "Nefes alan kumaş", "Kaymaz taban", "Ergonomik tasarım"],
  },
  {
    id: "3",
    icon: "⌚",
    name: "Akıllı Saat Siyah",
    price: 1249,
    oldPrice: 1899,
    discount: 34,
    rating: 4.9,
    reviewCount: 987,
    category: "Elektronik",
    seller: "TechMart",
    description: "Sağlık takibi, bildirimler ve spor modlarıyla dolu akıllı saat.",
    features: ["Kalp atışı takibi", "Su geçirmez", "7 gün pil", "GPS"],
  },
  {
    id: "4",
    icon: "👜",
    name: "Deri Çanta Kadın",
    price: 459,
    oldPrice: 799,
    discount: 43,
    rating: 4.6,
    reviewCount: 532,
    category: "Giyim",
    seller: "ModaKöşe",
    description: "Şık ve kullanışlı hakiki deri kadın çantası. Her kombine uyum sağlar.",
    features: ["Hakiki deri", "Fermuarlı iç cep", "Ayarlanabilir askı", "El yapımı"],
  },
];

export default async function UrunDetay({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const urun = urunler.find((u) => u.id === id) || urunler[0];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-orange-500 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" className="text-white text-xl font-bold">ucuzuygun.com</a>
          <div className="flex flex-1">
            <input
              type="text"
              placeholder="Ürün ara..."
              className="flex-1 px-4 py-2 rounded-l-md outline-none text-gray-800"
            />
            <button className="bg-yellow-400 px-4 py-2 rounded-r-md font-bold text-gray-800">Ara</button>
          </div>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
        <a href="/" className="text-orange-500 hover:underline">Ana Sayfa</a>
        <span className="mx-2">›</span>
        <span className="text-orange-500">{urun.category}</span>
        <span className="mx-2">›</span>
        <span>{urun.name}</span>
      </div>

      {/* ÜRÜN DETAY */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row gap-8">
          
          {/* Sol: Görsel */}
          <div className="flex flex-col items-center gap-4 md:w-1/2">
            <div className="w-full h-80 bg-gray-50 rounded-lg flex items-center justify-center text-9xl border border-gray-100">
              {urun.icon}
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-2xl cursor-pointer hover:border-orange-400">
                  {urun.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Sağ: Bilgiler */}
          <div className="md:w-1/2">
            <div className="text-sm text-gray-500 mb-1">{urun.seller}</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">{urun.name}</h1>

            {/* Puan */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 text-lg">{"★".repeat(Math.floor(urun.rating))}{"☆".repeat(5 - Math.floor(urun.rating))}</span>
              <span className="text-orange-500 font-semibold">{urun.rating}</span>
              <span className="text-gray-400 text-sm">({urun.reviewCount.toLocaleString()} değerlendirme)</span>
            </div>

            {/* Fiyat */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-orange-500">{urun.price.toLocaleString()} TL</span>
                <span className="text-gray-400 line-through text-lg">{urun.oldPrice.toLocaleString()} TL</span>
                <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">%{urun.discount} İndirim</span>
              </div>
              <p className="text-green-600 text-sm mt-1">✓ Ücretsiz kargo</p>
            </div>

            {/* Özellikler */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Öne Çıkan Özellikler</h3>
              <ul className="space-y-1">
                {urun.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-orange-500">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Butonlar */}
            <div className="flex flex-col gap-3">
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition">
                🛒 Sepete Ekle
              </button>
              <button className="w-full bg-yellow-400 text-gray-800 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition">
                ⚡ Hemen Satın Al
              </button>
              <button className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg hover:border-orange-400 transition">
                ♡ Favorilere Ekle
              </button>
            </div>
          </div>
        </div>

        {/* AÇIKLAMA */}
        <div className="bg-white rounded-lg p-6 mt-4">
          <h2 className="text-lg font-bold mb-3">Ürün Açıklaması</h2>
          <p className="text-gray-600">{urun.description}</p>
        </div>

        {/* YORUMLAR */}
        <div className="bg-white rounded-lg p-6 mt-4">
          <h2 className="text-lg font-bold mb-4">Müşteri Yorumları</h2>
          <div className="space-y-4">
            {[
              { user: "Ahmet K.", rating: 5, comment: "Harika bir ürün, çok memnun kaldım. Hızlı kargo için teşekkürler." },
              { user: "Ayşe M.", rating: 4, comment: "Ürün açıklamayla birebir, kaliteli. Tavsiye ederim." },
              { user: "Mehmet Y.", rating: 5, comment: "Fiyat/performans açısından mükemmel. Kesinlikle alın." },
            ].map((yorum, i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-500">
                    {yorum.user[0]}
                  </div>
                  <span className="font-medium text-sm">{yorum.user}</span>
                  <span className="text-yellow-400 text-sm">{"★".repeat(yorum.rating)}</span>
                </div>
                <p className="text-gray-600 text-sm">{yorum.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
