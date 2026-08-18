export default function KVKKPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-2xl font-bold mb-2 text-orange-600">
        Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni
      </h1>
      <p className="text-sm text-gray-500 mb-8">Son güncelleme: Ağustos 2026</p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">1. Veri Sorumlusu</h2>
        <p>
          Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında
          veri sorumlusu sıfatıyla hareket eden <strong>ucuzuygun.com</strong> tarafından
          hazırlanmıştır. Kişisel verilerinize ilişkin her türlü soru ve talebiniz için{" "}
          <a href="mailto:iletisim@ucuzuygun.com" className="text-orange-600 underline">
            iletisim@ucuzuygun.com
          </a>{" "}
          adresine ulaşabilirsiniz.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">2. İşlenen Kişisel Veriler</h2>
        <p className="mb-3">
          Platformumuzu kullanırken aşağıdaki kişisel verileriniz işlenmektedir:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Ad ve soyadı</li>
          <li>E-posta adresi</li>
          <li>Şifre (şifrelenmiş olarak saklanır, açık metin olarak tutulmaz)</li>
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
          <li>Platform güvenliğinin sağlanması ve sahteciliğin önlenmesi</li>
          <li>Hizmet kalitesinin iyileştirilmesi (anonim istatistikler)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">4. Kişisel Verilerin Aktarımı</h2>
        <p className="mb-3">
          Kişisel verileriniz aşağıdaki durumlarda üçüncü taraflarla paylaşılabilir:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>
            <strong>Satıcılar:</strong> Sipariş teslimatı için gerekli ad, adres ve iletişim
            bilgileri
          </li>
          <li>
            <strong>Altyapı sağlayıcıları:</strong> Supabase (veri tabanı ve kimlik doğrulama),
            Vercel (barındırma) — yalnızca hizmet sunumu amacıyla
          </li>
          <li>
            <strong>Yasal zorunluluklar:</strong> Yetkili kamu kurum ve kuruluşlarının talebi
            üzerine
          </li>
        </ul>
        <p className="mt-3">
          Verileriniz rıza alınmaksızın ticari amaçla üçüncü taraflara satılmaz veya kiralanmaz.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">5. Kişisel Verilerin Saklanma Süresi</h2>
        <p>
          Kişisel verileriniz, üyelik hesabınız aktif olduğu süre boyunca saklanır. Hesabınızı
          silmeniz durumunda verileriniz, yasal saklama yükümlülükleri saklı kalmak kaydıyla, 30
          gün içinde silinir veya anonim hâle getirilir.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">6. Çerezler (Cookies)</h2>
        <p>
          Platformumuz; oturum yönetimi ve temel işlevsellik için zorunlu çerezler kullanmaktadır.
          Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı
          özellikler çalışmayabilir.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">7. Haklarınız</h2>
        <p className="mb-3">KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>Kanunda öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
          <li>İşlemenin otomatik sistemler aracılığıyla gerçekleştirilmesi hâlinde itiraz etme</li>
          <li>Zararın giderilmesini talep etme</li>
        </ul>
        <p className="mt-3">
          Bu haklarınızı kullanmak için{" "}
          <a href="mailto:iletisim@ucuzuygun.com" className="text-orange-600 underline">
            iletisim@ucuzuygun.com
          </a>{" "}
          adresine e-posta gönderebilirsiniz. Talepleriniz en geç 30 gün içinde yanıtlanır.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">8. Değişiklikler</h2>
        <p>
          Bu aydınlatma metni zaman zaman güncellenebilir. Önemli değişiklikler e-posta veya
          platform bildirimi aracılığıyla size iletilecektir. Güncel metne her zaman bu sayfadan
          ulaşabilirsiniz.
        </p>
      </section>

      <div className="border-t pt-6 mt-8 text-sm text-gray-500">
        <p>
          Sorularınız için:{" "}
          <a href="mailto:iletisim@ucuzuygun.com" className="text-orange-600 underline">
            iletisim@ucuzuygun.com
          </a>
        </p>
      </div>
    </div>
  );
}
