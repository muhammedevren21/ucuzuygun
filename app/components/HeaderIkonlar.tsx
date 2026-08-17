'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function HeaderIkonlar() {
  const [sepetAdet, setSepetAdet] = useState(0)
  const [girisYapildi, setGirisYapildi] = useState(false)

  const hesapla = () => {
    try {
      const raw = localStorage.getItem('sepet')
      if (!raw) return setSepetAdet(0)
      const sepet = JSON.parse(raw)
      const toplam = Array.isArray(sepet)
        ? sepet.reduce((acc: number, item: any) => acc + (item.adet || 1), 0)
        : 0
      setSepetAdet(toplam)
    } catch {
      setSepetAdet(0)
    }
  }

  useEffect(() => {
    hesapla()
    const handleGuncelle = () => setTimeout(hesapla, 50)
    window.addEventListener('storage', hesapla)
    window.addEventListener('sepetGuncellendi', handleGuncelle)

    // Kullanıcı giriş durumunu kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      setGirisYapildi(!!session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setGirisYapildi(!!session)
    })

    return () => {
      window.removeEventListener('storage', hesapla)
      window.removeEventListener('sepetGuncellendi', handleGuncelle)
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="flex gap-2 text-white text-xs">
      <a href="/sepet" className="flex flex-col items-center gap-1 hover:text-yellow-300 transition group">
        <div className="relative bg-orange-600 group-hover:bg-orange-700 p-2.5 rounded-xl transition shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {sepetAdet > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-800 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {sepetAdet > 9 ? '9+' : sepetAdet}
            </span>
          )}
        </div>
        <span className="font-medium tracking-wide">Sepet</span>
      </a>
      <a href={girisYapildi ? '/hesabim' : '/giris'} className="flex flex-col items-center gap-1 hover:text-yellow-300 transition group">
        <div className={`p-2.5 rounded-xl transition shadow-sm ${girisYapildi ? 'bg-green-600 group-hover:bg-green-700' : 'bg-orange-600 group-hover:bg-orange-700'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <span className="font-medium tracking-wide">{girisYapildi ? 'Hesabım' : 'Giriş'}</span>
      </a>
    </div>
  )
}
