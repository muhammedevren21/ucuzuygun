'use client'

import { useEffect, useState } from 'react'

export default function GeriSayim() {
  const [kalan, setKalan] = useState({ saat: 0, dakika: 0, saniye: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const hesapla = () => {
      // Türkiye saati UTC+3
      const simdi = new Date()
      const tr = new Date(simdi.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }))

      const hedef = new Date(tr)
      hedef.setHours(23, 59, 59, 0)

      const fark = hedef.getTime() - tr.getTime()

      if (fark <= 0) {
        setKalan({ saat: 0, dakika: 0, saniye: 0 })
        return
      }

      setKalan({
        saat: Math.floor(fark / (1000 * 60 * 60)),
        dakika: Math.floor((fark % (1000 * 60 * 60)) / (1000 * 60)),
        saniye: Math.floor((fark % (1000 * 60)) / 1000),
      })
    }

    hesapla()
    const interval = setInterval(hesapla, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, '0')

  // Hydration hatası önlemek için mount olmadan render etme
  if (!mounted) return null

  return (
    <div className="flex items-center gap-1">
      <div className="bg-white/20 backdrop-blur-sm text-white font-black text-sm w-9 h-9 rounded-lg flex flex-col items-center justify-center border border-white/30">
        <span className="tabular-nums leading-none">{pad(kalan.saat)}</span>
        <span className="text-[8px] text-orange-200 leading-none mt-0.5">sa</span>
      </div>
      <span className="text-white/60 font-black text-sm">:</span>
      <div className="bg-white/20 backdrop-blur-sm text-white font-black text-sm w-9 h-9 rounded-lg flex flex-col items-center justify-center border border-white/30">
        <span className="tabular-nums leading-none">{pad(kalan.dakika)}</span>
        <span className="text-[8px] text-orange-200 leading-none mt-0.5">dk</span>
      </div>
      <span className="text-white/60 font-black text-sm">:</span>
      <div className="bg-white/30 backdrop-blur-sm text-white font-black text-sm w-9 h-9 rounded-lg flex flex-col items-center justify-center border border-white/40">
        <span className="tabular-nums leading-none">{pad(kalan.saniye)}</span>
        <span className="text-[8px] text-orange-200 leading-none mt-0.5">sn</span>
      </div>
    </div>
  )
}
