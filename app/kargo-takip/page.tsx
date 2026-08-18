export default function KargoTakipPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-2xl font-bold mb-2 text-orange-600">Kargo Takip</h1>
      <p className="text-sm text-gray-500 mb-8">Siparişinizin nerede olduğunu öğrenin.</p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Siparişinizi Nasıl Takip Edersiniz?</h2>
        <div className="space-y-4">
          {[
            { adim: "1", baslik: "Hesabınıza giriş yapın", aciklama: 'Hesabım > Siparişlerim bölümüne gidin. Siparişinizin yanında "Kargo Takip" butonu görünecektir.' },
            { adim: "2", baslik: "E-postanızı kontrol edin", aciklama: "Siparişiniz kargoya verildiğinde otomatik olarak bir e-posta gönderilir. Bu e-postada kargo firması ve takip numaranız bulunur." },
            { adim: "3", baslik: "Kargo firmasının sitesini ziyaret edin", aciklama: "Takip numaranızı kargo firmasının web sitesine girerek anlık konum bilgisine ulaşabilirsiniz." },
          ].map((item) => (
            <div key={item.adim} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                {item.adim}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{item.baslik}</p>
                <p className="text-gray-500 text-sm mt-0.5">{item.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Anlaşmalı Kargo Firmaları</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["Yurtiçi Kargo", "MNG Kargo", "Aras Kargo", "PTT Kargo", "Sürat Kargo", "Sendeo"].map((firma) => (
            <div key={firma} className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 text-center shadow-sm">
              {firma}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Tahmini Teslimat Süreleri</h2>
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Bölge</th>
                <th className="text-left px-4 py-3 font-semibold">Süre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr><td className="px-4 py-3">İstanbul içi</td><td className="px-4 py-3">1-2 iş günü</td></tr>
              <tr><td className="px-4 py-3">Büyükşehirler</td><td className="px-4 py-3">1-3 iş günü</td></tr>
              <tr><td className="px-4 py-3">Diğer iller</td><td className="px-4 py-3">2-4 iş günü</td></tr>
              <tr><td className="px-4 py-3">Uzak bölgeler</td><td className="px-4 py-3">3-5 iş günü</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Süreler tahminidir, satıcıya ve kargo firmasına göre değişebilir.</p>
      </section>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-sm text-orange-700">
        Kargonuzla ilgili sorun mu yaşıyorsunuz?{" "}
        <a href="mailto:iletisim@ucuzuygun.com" className="underline font-medium">
          iletisim@ucuzuygun.com
        </a>{" "}
        adresine sipariş numaranızla yazın, takip edelim.
      </div>
    </div>
  )
}
