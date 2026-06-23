'use client'

import { useState, useEffect } from 'react'
import { Phone, ChevronUp, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-center gap-3">
      {/* Hotline - pulse button */}
      <a
        href="tel:0981907109"
        className="group flex items-center gap-0 overflow-hidden rounded-full shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
        aria-label="Gọi hotline"
        style={{ boxShadow: '0 4px 20px rgba(0, 102, 255, 0.35)' }}
      >
        <div className="w-13 h-13 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 pulse-blue"
          style={{ width: '52px', height: '52px' }}>
          <Phone size={20} className="text-white" />
        </div>
        <div className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 ease-in-out">
          <span className="pr-4 pl-2 text-sm font-semibold whitespace-nowrap text-white bg-gradient-to-r from-blue-600 to-blue-700 h-full flex items-center"
            style={{ height: '52px' }}>
            0981 907 109
          </span>
        </div>
      </a>

      {/* Zalo */}
      <a
        href="https://zalo.me/0981907109"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 font-bold text-sm"
        style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #0068FF, #00AEEF)', boxShadow: '0 4px 16px rgba(0, 104, 255, 0.3)' }}
        aria-label="Zalo"
      >
        <span className="text-[13px]">Za</span>
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/favevietnam"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', boxShadow: '0 4px 16px rgba(131, 58, 180, 0.3)' }}
        aria-label="Messenger"
      >
        <MessageCircle size={20} />
      </a>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={cn(
          'flex items-center justify-center bg-white text-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 hover:bg-blue-50',
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        )}
        style={{ width: '42px', height: '42px', transition: 'all 0.3s ease' }}
        aria-label="Lên đầu trang"
      >
        <ChevronUp size={18} className="text-blue-600" />
      </button>
    </div>
  )
}
