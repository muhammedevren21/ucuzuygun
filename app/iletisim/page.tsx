import SiteHeader from '@/app/components/SiteHeader'
import SiteFooter from '@/app/components/SiteFooter'

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-2 text-orange-600">İletişim</h1>
        <p className="text-sm text-gray-500 mb-8">Size yardımcı olmaktan mutluluk duyarız.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="text-2xl mb-3">📧</div>
            <h2 className="font-semibold text-gray-800 mb-1">E-posta</h2>
            <p className="text-sm text-gray-500 mb-2">Genel sorular ve destek için</p>
            <a href="mailto:iletisim@ucuzuygun.com" className="text-orange-600 font-medium hover:underline text-sm">
              iletisim@ucuzuygun.com
            </a>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="text-2xl mb-3">🕐</div>
            <h2 className="font-semibold text-gray-800 mb-1">Yanıt Süresi</h2>
            <p className="text-sm text-gray-500">
              E-postalarınızı genellikle <strong className="text-gray-700">1 iş günü</strong> içinde yanıtlıyoruz.
            </p>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Sık Sorulan Konular</h2>
          <div className="space-y-3">
            {[
              { soru: "Siparişim nerede?", cevap: "Sipariş takibi için satıcınızdan kargo bilgisi talep edebilirsiniz." },
              { soru: "Satıcı olmak istiyorum", cevap: "Satıcı kayıt sayfasından başvurunuzu yapabilirsiniz." },
              { soru: "Ürün iade etmek istiyorum", cevap: "İade süreçleri için satıcıyla doğrudan iletişime geçin veya bize yazın." },
            ].map((item) => (
              <div key={item.soru} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-medium text-gray-800 text-sm mb-1">{item.soru}</p>
                <p className="text-gray-500 text-sm">{item.cevap}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-sm text-orange-700">
          Satıcılarla ilgili şikayetlerinizi de{" "}
          <a href="mailto:iletisim@ucuzuygun.com" className="underline font-medium">
            iletisim@ucuzuygun.com
          </a>{" "}
          adresine iletebilirsiniz. En geç 3 iş günü içinde geri dönüş sağlanır.
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
