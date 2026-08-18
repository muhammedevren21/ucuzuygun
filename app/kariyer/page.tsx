import SiteHeader from '@/app/components/SiteHeader'
import SiteFooter from '@/app/components/SiteFooter'

export default function KariyerPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-2 text-orange-600">Kariyer</h1>
        <p className="text-sm text-gray-500 mb-8">ucuzuygun.com ekibine katılın</p>

        <section className="mb-10">
          <p className="text-gray-700 leading-relaxed mb-4">
            Türkiye&apos;nin en uygun pazaryerini birlikte inşa ediyoruz. Küçük ama tutkulu bir ekibiz —
            hızlı büyüyor, öğreniyor ve üretiyoruz.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Şu an erken aşamada olan bir startup&apos;ız. Eğer sıfırdan bir şey inşa etme fikri sizi heyecanlandırıyorsa,
            doğru yerdesiniz.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Açık Pozisyonlar</h2>
          <div className="space-y-3">
            {[
              { pozisyon: "Frontend Geliştirici", tip: "Uzaktan · Tam zamanlı", teknoloji: "Next.js, TypeScript, Tailwind" },
              { pozisyon: "Ürün Yöneticisi", tip: "Uzaktan · Tam zamanlı", teknoloji: "E-ticaret deneyimi tercih edilir" },
              { pozisyon: "Müşteri Deneyimi Uzmanı", tip: "Uzaktan · Yarı zamanlı", teknoloji: "İletişim becerileri ön planda" },
            ].map((item) => (
              <div key={item.pozisyon} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-800">{item.pozisyon}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{item.tip}</p>
                    <p className="text-xs text-orange-600 mt-1">{item.teknoloji}</p>
                  </div>
                  <a
                    href="mailto:iletisim@ucuzuygun.com?subject=Kariyer Başvurusu"
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition whitespace-nowrap"
                  >
                    Başvur
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
          <p className="text-gray-700 text-sm">
            Uygun bir pozisyon görmüyor musunuz? Yine de CV&apos;nizi{" "}
            <a href="mailto:iletisim@ucuzuygun.com?subject=Açık Başvuru" className="text-orange-600 underline">
              iletisim@ucuzuygun.com
            </a>{" "}
            adresine gönderin — ileride açılacak pozisyonlar için değerlendiririz.
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
