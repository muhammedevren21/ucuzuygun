import SiteHeader from '@/app/components/SiteHeader'
import SiteFooter from '@/app/components/SiteFooter'

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-2 text-orange-600">
          Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni
        </h1>
        <p className="text-sm text-gray-500 mb-8">Son güncelleme: Ağustos 2026</p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">1. Veri Sorumlusu</h2>
          <p>
            Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında
            veri sorumlusu sıfatıyla hareket eden <strong>ucuzuygun.com</strong> tarafından hazırlanmıştır.
            Kişisel verilerinize ilişkin her türlü soru ve talebiniz için{" "}
            <a href="mailto:iletisim@ucuzuygun.com" className="text-orange-600 underline">iletisim@ucuzuygun.com</a>{" "}
            adresine ulaşabilirsiniz.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">2. İşlenen Kişisel Veriler</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Ad ve soyadı</li>
            <li>E-posta adresi</li>
            <li>Şifre (şifrelenmiş olarak saklanır)</li>
            <li>Teslimat ve fatura adresi</li>
            <li>Telefon numarası</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">3. Kişisel Verilerin İşlenme Amaçları</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Üyelik hesabının oluşturulması ve yönetilmesi</li>
            <li>Sipariş ve teslimat süreçlerinin yürütülmesi</li>
            <li>Müşteri hizmetleri ve destek taleplerinin karşılanması</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>Platform güvenliğinin sağlanması</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">4. Kişisel Verilerin Aktarımı</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li><strong>Satıcılar:</strong> Sipariş teslimatı için gerekli bilgiler</li>
            <li><strong>Altyapı sağlayıcıları:</strong> Supabase, Vercel — yalnızca hizmet sunumu amacıyla</li>
            <li><strong>Yasal zorunluluklar:</strong> Yetkili kamu kurum ve kuruluşlarının talebi üzerine</li>
          </ul>
          <p className="mt-3 text-gray-700">Verileriniz rıza alınmaksızın ticari amaçla üçüncü taraflara satılmaz.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">5. Saklama Süresi</h2>
          <p className="text-gray-700">
            Verileriniz hesabınız aktif olduğu süre boyunca saklanır. Hesap silme talebinde verileriniz
            30 gün içinde silinir veya anonim hale getirilir.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">6. Çerezler</h2>
          <p className="text-gray-700">
            Platformumuz yalnızca oturum yönetimi için zorunlu çerezler kullanır.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">7. Haklarınız</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
            <li>Silinmesini veya yok edilmesini isteme</li>
            <li>İşlemeye itiraz etme</li>
            <li>Zararın giderilmesini talep etme</li>
          </ul>
          <p className="mt-3 text-gray-700">
            Talepleriniz için{" "}
            <a href="mailto:iletisim@ucuzuygun.com" className="text-orange-600 underline">iletisim@ucuzuygun.com</a>{" "}
            adresine e-posta gönderebilirsiniz. En geç 30 gün içinde yanıtlanır.
          </p>
        </section>

        <div className="border-t pt-6 mt-8 text-sm text-gray-500">
          <p>Sorularınız için: <a href="mailto:iletisim@ucuzuygun.com" className="text-orange-600 underline">iletisim@ucuzuygun.com</a></p>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
