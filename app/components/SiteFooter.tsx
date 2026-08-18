export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-black mb-2">ucuzuygun<span className="text-yellow-400">.com</span></div>
            <p className="text-gray-400 text-sm">Türkiye&apos;nin en uygun pazaryeri</p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-gray-200">Kurumsal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/hakkimizda" className="hover:text-white">Hakkımızda</a></li>
              <li><a href="/iletisim" className="hover:text-white">İletişim</a></li>
              <li><a href="/kariyer" className="hover:text-white">Kariyer</a></li>
              <li><a href="/kvkk" className="hover:text-white">KVKK</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-gray-200">Yardım</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/sss" className="hover:text-white">SSS</a></li>
              <li><a href="/iade-degisim" className="hover:text-white">İade & Değişim</a></li>
              <li><a href="/kargo-takip" className="hover:text-white">Kargo Takip</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-gray-200">Satıcılar</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/satici/kayit" className="hover:text-white">Satıcı Ol</a></li>
              <li><a href="/satici/giris" className="hover:text-white">Satıcı Girişi</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ucuzuygun.com — Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  )
}
