'use client'

import { useState, useEffect } from 'react'

const ZALO_URL = 'https://zalo.me/0909XXXXXX'
const PHONE_TEL = 'tel:02839XXXXXX'

function ZaloIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.441 16.258c-.19.476-.951.808-1.666.808-.24 0-.477-.041-.697-.124-.596-.228-1.178-.49-1.74-.784a9.93 9.93 0 01-3.496-3.496 8.75 8.75 0 01-.784-1.74c-.256-.739.14-1.554.808-1.838l.196-.082a.772.772 0 01.95.296l.916 1.374a.772.772 0 01-.12.99l-.43.387a.374.374 0 00-.08.45c.337.624.775 1.19 1.296 1.67.52.52 1.085.959 1.708 1.295a.374.374 0 00.45-.08l.387-.43a.772.772 0 01.99-.12l1.374.916a.772.772 0 01.296.95l-.158.358z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.01 21 3 13.99 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
    </svg>
  )
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
}

export default function FloatingContact() {
  const [visible, setVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    function onScroll() {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500"
      style={{
        transform: visible ? 'translateX(0)' : 'translateX(120px)',
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Lên đầu trang"
          className="w-9 h-9 rounded-full bg-gray-700 text-white flex items-center justify-center shadow-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronUpIcon />
        </button>
      )}

      {/* Zalo button */}
      <div className="relative group">
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo"
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
          style={{ background: '#0068FF' }}
        >
          <ZaloIcon />
        </a>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat Zalo
        </span>
      </div>

      {/* Phone button with pulse */}
      <div className="relative group">
        {/* Pulse rings */}
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(230,81,0,0.3)', animationDuration: '1.8s' }}
        />
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(230,81,0,0.15)', animationDuration: '1.8s', animationDelay: '0.4s' }}
        />
        <a
          href={PHONE_TEL}
          aria-label="Gọi ngay"
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(135deg, #f97316, #E65100)' }}
        >
          <PhoneIcon />
        </a>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Gọi ngay
        </span>
      </div>
    </div>
  )
}
