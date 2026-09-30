'use client'

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export function trackQuoteSubmit(service?: string) {
  trackEvent('quote_submit', 'lead_generation', service)
}

export function trackPhoneClick(location: string) {
  trackEvent('phone_click', 'contact', location)
}

export function trackZaloClick() {
  trackEvent('zalo_click', 'contact', 'floating_widget')
}
