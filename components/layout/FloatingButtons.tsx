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
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3">

      {/* Hotline - pulse button */}
      <a
        href="tel:0981907109"
        className="group flex items-center gap-0 overflow-hidden relative"
        aria-label="Gọi hotline"
        style={{
          border: '1px solid rgba(200,169,110,0.4)',
          borderRadius: '50%',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.borderRadius = '0'
          el.style.borderColor = 'rgba(200,169,110,0.7)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.borderRadius = '50%'
          el.style.borderColor = 'rgba(200,169,110,0.4)'
        }}
      >
        {/* Pulse ring */}
        <span
          className="animate-pulse-ring absolute inset-0 rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(200,169,110,0.3)' }}
        />
        <div
          className="flex items-center justify-center"
          style={{ width: '48px', height: '48px', background: '#0D0D0D' }}
        >
          <Phone size={17} style={{ color: 'rgba(200,169,110,0.85)' }} />
        </div>
        <div
          className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 ease-in-out"
        >
          <span
            className="pr-4 pl-1 text-xs font-semibold whitespace-nowrap flex items-center"
            style={{
              height: '48px',
              background: '#0D0D0D',
              color: 'rgba(200,169,110,0.85)',
              letterSpacing: '0.08em',
            }}
          >
            0981 907 109
          </span>
        </div>
      </a>

      {/* Zalo */}
      <a
        href="https://zalo.me/0981907109"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center font-bold transition-all hover:-translate-y-0.5"
        style={{
          width: '44px',
          height: '44px',
          background: '#0D0D0D',
          border: '1px solid rgba(200,169,110,0.25)',
          color: 'rgba(200,169,110,0.7)',
          fontSize: '0.6875rem',
          letterSpacing: '0.04em',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(200,169,110,0.6)'
          ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,169,110,0.95)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(200,169,110,0.25)'
          ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,169,110,0.7)'
        }}
        aria-label="Zalo"
      >
        Za
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/favevietnam"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center transition-all hover:-translate-y-0.5"
        style={{
          width: '44px',
          height: '44px',
          background: '#0D0D0D',
          border: '1px solid rgba(200,169,110,0.25)',
          color: 'rgba(200,169,110,0.7)',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(200,169,110,0.6)'
          ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,169,110,0.95)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(200,169,110,0.25)'
          ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,169,110,0.7)'
        }}
        aria-label="Messenger"
      >
        <MessageCircle size={17} />
      </a>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={cn(
          'flex items-center justify-center transition-all hover:-translate-y-0.5',
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
        style={{
          width: '40px',
          height: '40px',
          background: '#0D0D0D',
          border: '1px solid rgba(200,169,110,0.2)',
          color: 'rgba(200,169,110,0.6)',
          transition: 'all 0.3s ease',
        }}
        aria-label="Lên đầu trang"
      >
        <ChevronUp size={15} />
      </button>
    </div>
  )
}
