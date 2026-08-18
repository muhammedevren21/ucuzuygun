export default function HakkimizdaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-2xl font-bold mb-2 text-orange-600">Hakkımızda</h1>
      <p className="text-sm text-gray-500 mb-8">ucuzuygun.com — Sadece indirimli ürünler</p>

      <section className="mb-8">
        <p className="text-gray-700 leading-relaxed mb-4">
          ucuzuygun.com, Türkiye&apos;nin en uygun fiyatlı ürünlerini tek çatı altında toplayan bir pazar yeri platformudur.
          Amacımız basit: alışverişte ödediğiniz her kuruşun karşılığını almanızı sağlamak.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Platformumuzda yalnızca gerçek indirimli ürünler yer alır. Her ürün, orijinal fiyatına kıyasla
          en az %10 indirimli olmak zorundadır — bu bizim temel kuralımız.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Neden ucuzuygun.com?</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold mt-0.5">→</span>
            <span>Yalnızca indirimli ürünler — fiyat karşılaştırma yapmanıza gerek yok</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold mt-0.5">→</span>
            <span>Onaylı satıcılar — her satıcı platforma kabul edilmeden önce incelenir</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold mt-0.5">→</span>
            <span>Şeffaf fiyatlandırma — eski fiyat, yeni fiyat ve tasarruf miktarı her ürünде görünür</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Kuruluş Hikayemiz</h2>
        <p className="text-gray-700 leading-relaxed">
          ucuzuygun.com, 2026 yılında "neden indirimli ürünleri bulmak bu kadar zor?" sorusundan doğdu.
          Şu an beta aşamasında olan platformumuz, her geçen gün büyüyen bir satıcı ve alıcı topluluğuyla
          Türkiye&apos;nin en güvenilir indirim pazaryeri olmayı hedeflemektedir.
        </p>
      </section>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
        <p className="text-orange-700 font-medium mb-1">İletişim</p>
        <p className="text-gray-600 text-sm">
          Bize ulaşmak için:{" "}
          <a href="mailto:iletisim@ucuzuygun.com" className="text-orange-600 underline">
            iletisim@ucuzuygun.com
          </a>
        </p>
      </div>
    </div>
  )
}
