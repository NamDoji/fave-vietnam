'use client'

import { useState, useEffect } from 'react'
import { Phone, ChevronUp, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-center gap-3">
      {/* Hotline */}
      <a
        href="tel:0981907109"
        className="group flex items-center gap-2 bg-[#00a0e9] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        aria-label="Gọi hotline"
      >
        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#00a0e9]">
          <Phone size={20} className="animate-pulse" />
        </span>
        <span className="pr-4 text-sm font-semibold hidden sm:block">0981 907 109</span>
      </a>

      {/* Zalo */}
      <a
        href="https://zalo.me/0981907109"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 font-bold text-sm"
        aria-label="Zalo"
      >
        Za
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/favevietnam"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        aria-label="Messenger"
      >
        <MessageCircle size={20} />
      </a>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={cn(
          'w-10 h-10 flex items-center justify-center bg-[#1a3a5c] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5',
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
        aria-label="Lên đầu trang"
      >
        <ChevronUp size={18} />
      </button>
    </div>
  )
}
