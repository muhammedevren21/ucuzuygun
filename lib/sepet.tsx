'use client'
import { createContext, useContext, useState, useEffect } from 'react'

type SepetItem = {
  id: number
  ad: string
  fiyat: number
  resim_url: string
  magaza_adi: string
  adet: number
}

type SepetContext = {
  sepet: SepetItem[]
  ekle: (urun: SepetItem) => void
  cikar: (id: number) => void
  temizle: () => void
  toplamAdet: number
  toplamFiyat: number
}

const SepetContext = createContext<SepetContext>({} as SepetContext)

export function SepetProvider({ children }: { children: React.ReactNode }) {
  const [sepet, setSepet] = useState<SepetItem[]>([])
  const [yuklendi, setYuklendi] = useState(false)

  useEffect(() => {
    const kayitli = localStorage.getItem('sepet')
    if (kayitli) setSepet(JSON.parse(kayitli))
    setYuklendi(true)
  }, [])

  useEffect(() => {
    if (yuklendi) {
      localStorage.setItem('sepet', JSON.stringify(sepet))
    }
  }, [sepet, yuklendi])

  const ekle = (urun: SepetItem) => {
    setSepet(prev => {
      const mevcut = prev.find(i => i.id === urun.id)
      if (mevcut) {
        return prev.map(i => i.id === urun.id ? { ...i, adet: i.adet + 1 } : i)
      }
      return [...prev, { ...urun, adet: 1 }]
    })
    // Badge'i anında güncelle
    window.dispatchEvent(new Event('sepetGuncellendi'))
  }

  const cikar = (id: number) => {
    setSepet(prev => prev.filter(i => i.id !== id))
    // Badge'i anında güncelle
    window.dispatchEvent(new Event('sepetGuncellendi'))
  }

  const temizle = () => {
    setSepet([])
    // Badge'i anında güncelle
    window.dispatchEvent(new Event('sepetGuncellendi'))
  }

  const toplamAdet = sepet.reduce((t, i) => t + i.adet, 0)
  const toplamFiyat = sepet.reduce((t, i) => t + i.fiyat * i.adet, 0)

  return (
    <SepetContext.Provider value={{ sepet, ekle, cikar, temizle, toplamAdet, toplamFiyat }}>
      {children}
    </SepetContext.Provider>
  )
}

export const useSepet = () => useContext(SepetContext)
