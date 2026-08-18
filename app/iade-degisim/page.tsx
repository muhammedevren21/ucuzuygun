import SiteHeader from '@/app/components/SiteHeader'
import SiteFooter from '@/app/components/SiteFooter'

export default function IadeDegisimPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-2 text-orange-600">İade & Değişim</h1>
        <p className="text-sm text-gray-500 mb-8">Memnun kalmazsanız çözüm buluruz.</p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">İade Süreci</h2>
          <div className="space-y-4">
            {[
              { adim: "1", baslik: "İade talebini oluştur", aciklama: "Hesabım > Siparişlerim bölümünden ilgili siparişi seçip iade talebi oluşturun. Alternatif olarak iletisim@ucuzuygun.com adresine e-posta gönderebilirsiniz." },
              { adim: "2", baslik: "Ürünü hazırla", aciklama: "Ürünü orijinal ambalajında ve eksiksiz olarak hazırlayın. Ürünün kullanılmamış ve hasarsız olması gerekir." },
              { adim: "3", baslik: "Kargo ile gönder", aciklama: "Satıcı tarafından iletilen kargo bilgileriyle ürünü gönderin. İade kargo ücreti ürün durumuna göre değişebilir." },
              { adim: "4", baslik: "İade onayı ve para iadesi", aciklama: "Ürün satıcıya ulaştıktan sonra kontrol edilir. Onaylanan iadeler 3-5 iş günü içinde ödeme yönteminize iade edilir." },
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
          <h2 className="text-lg font-semibold mb-3">İade Koşulları</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Teslim tarihinden itibaren 14 gün içinde iade talebinde bulunulmalıdır</li>
            <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Ürün kullanılmamış ve orijinal ambalajında olmalıdır</li>
            <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Fatura veya sipariş belgesi bulunmalıdır</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Kişiye özel üretilen ürünler iade edilemez</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Hijyen ürünleri (iç giyim, kozmetik vb.) açılmışsa iade edilemez</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Değişim</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Ürünü farklı beden veya renkle değiştirmek istiyorsanız iade işlemi başlatıp yeni ürünü ayrıca sipariş verebilirsiniz.
            Doğrudan değişim için satıcıyla iletişime geçebilir ya da bize yazabilirsiniz.
          </p>
        </section>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-sm text-orange-700">
          İade sürecinizde sorun yaşıyorsanız{" "}
          <a href="mailto:iletisim@ucuzuygun.com" className="underline font-medium">iletisim@ucuzuygun.com</a>{" "}
          adresine yazın, size yardımcı olalım.
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
