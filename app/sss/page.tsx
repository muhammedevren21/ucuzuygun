"use client"
import { useState } from "react"
import SiteHeader from '@/app/components/SiteHeader'
import SiteFooter from '@/app/components/SiteFooter'

const sorular = [
  { soru: "ucuzuygun.com'da nasıl alışveriş yapabilirim?", cevap: "Üye olarak veya misafir olarak ürünleri inceleyebilirsiniz. Beğendiğiniz ürünü sepete ekleyip ödeme adımlarını takip ederek alışverişinizi tamamlayabilirsiniz." },
  { soru: "Ürünlerin indirim oranları gerçek mi?", cevap: "Evet. Platformumuza eklenen her ürün, orijinal fiyatından en az %10 indirimli olmak zorundadır. Bu kural otomatik sistem tarafından denetlenmektedir." },
  { soru: "Siparişimi nasıl takip edebilirim?", cevap: "Siparişiniz onaylandıktan sonra satıcı tarafından kargoya verilir. Kargo takip numaranız e-posta ile iletilir. Hesabım > Siparişlerim bölümünden de takip edebilirsiniz." },
  { soru: "Satıcılar güvenilir mi?", cevap: "Platforma kabul edilen her satıcı inceleme sürecinden geçmektedir. Bununla birlikte alışveriş deneyiminizi değerlendirmenizi ve sorun yaşamanız durumunda bize bildirmenizi öneririz." },
  { soru: "Ödeme yöntemleri nelerdir?", cevap: "Şu an ödeme sistemi entegrasyonu üzerinde çalışıyoruz. Yakında kredi kartı, banka kartı ve diğer ödeme yöntemleriyle güvenli ödeme yapabileceksiniz." },
  { soru: "Üyelik ücretsiz mi?", cevap: "Evet, alıcı üyeliği tamamen ücretsizdir. Satıcı üyeliği için ayrı bir kayıt süreci mevcuttur." },
  { soru: "Satıcı olmak istiyorum, ne yapmalıyım?", cevap: "Satıcı kayıt sayfasından başvurunuzu yapabilirsiniz. Kurucu satıcı kampanyamız kapsamında ilk dönem satıcılarımıza özel komisyon avantajı sunulmaktadır." },
]

export default function SSSPage() {
  const [acik, setAcik] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-2 text-orange-600">Sık Sorulan Sorular</h1>
        <p className="text-sm text-gray-500 mb-8">Aklınızdaki soruların cevaplarını burada bulabilirsiniz.</p>

        <div className="space-y-3">
          {sorular.map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <button
                className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 hover:bg-gray-50 transition"
                onClick={() => setAcik(acik === i ? null : i)}
              >
                <span className="font-medium text-gray-800 text-sm">{item.soru}</span>
                <span className="text-orange-500 font-bold text-lg flex-shrink-0">{acik === i ? "−" : "+"}</span>
              </button>
              {acik === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.cevap}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-orange-50 border border-orange-100 rounded-xl p-6 text-sm">
          <p className="text-orange-700">
            Cevabını bulamadığınız bir soru mu var?{" "}
            <a href="/iletisim" className="underline font-medium">Bize ulaşın</a>, en geç 1 iş günü içinde yanıtlayalım.
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
