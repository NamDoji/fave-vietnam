import { FileText, MessageSquare, Newspaper, Users } from 'lucide-react'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

async function getDashboardStats() {
  try {
    const [quotes, contacts, news, applicants, recentQuotes, recentContacts] = await Promise.all([
      prisma.quoteRequest.count(),
      prisma.contactRequest.count(),
      prisma.newsPost.count({ where: { status: 'PUBLISHED' } }),
      prisma.applicant.count(),
      prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5, where: { isRead: false } }),
    ])
    return { quotes, contacts, news, applicants, recentQuotes, recentContacts }
  } catch {
    return { quotes: 0, contacts: 0, news: 0, applicants: 0, recentQuotes: [], recentContacts: [] }
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const STAT_CARDS = [
    { icon: FileText, label: 'Báo giá mới', value: stats.quotes, color: 'from-blue-500 to-blue-600', href: '/admin/quotes' },
    { icon: MessageSquare, label: 'Liên hệ', value: stats.contacts, color: 'from-green-500 to-green-600', href: '/admin/contacts' },
    { icon: Newspaper, label: 'Bài viết', value: stats.news, color: 'from-purple-500 to-purple-600', href: '/admin/news' },
    { icon: Users, label: 'Ứng viên', value: stats.applicants, color: 'from-orange-500 to-orange-600', href: '/admin/recruitment' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Tổng quan hoạt động website FAVE Việt Nam</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <a key={card.label} href={card.href} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-800">{card.value}</span>
              </div>
              <div className="text-sm text-gray-500">{card.label}</div>
            </a>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quotes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Báo Giá Mới Nhất</h2>
          {stats.recentQuotes.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">Chưa có báo giá nào</p>
          ) : (
            <div className="space-y-3">
              {stats.recentQuotes.map((quote) => (
                <div key={quote.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="font-medium text-gray-700 text-sm">{quote.name}</div>
                    <div className="text-xs text-gray-400">{quote.phone} · {quote.service}</div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                      quote.status === 'NEW' ? 'bg-blue-50 text-blue-600' :
                      quote.status === 'CONTACTED' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {quote.status}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{formatDate(quote.createdAt, 'vi-VN')}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <a href="/admin/quotes" className="block mt-3 text-center text-xs text-[#00a0e9] hover:underline">Xem tất cả →</a>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Liên Hệ Chưa Đọc</h2>
          {stats.recentContacts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">Không có liên hệ mới</p>
          ) : (
            <div className="space-y-3">
              {stats.recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 bg-[#1a3a5c] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-700 text-sm">{contact.name}</div>
                    <div className="text-xs text-gray-400 truncate">{contact.message}</div>
                    <div className="text-xs text-gray-300 mt-0.5">{formatDate(contact.createdAt, 'vi-VN')}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <a href="/admin/contacts" className="block mt-3 text-center text-xs text-[#00a0e9] hover:underline">Xem tất cả →</a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-800 mb-4">Thao Tác Nhanh</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ Thêm tin tức', href: '/admin/news' },
            { label: '+ Thêm dự án', href: '/admin/projects' },
            { label: '+ Thêm sản phẩm', href: '/admin/products' },
            { label: '+ Thêm dịch vụ', href: '/admin/services' },
            { label: 'Cài đặt website', href: '/admin/settings' },
          ].map((link) => (
            <a key={link.href} href={link.href} className="px-4 py-2 bg-[#f7f9fc] border border-gray-200 text-[#1a3a5c] text-sm font-medium rounded-lg hover:bg-[#1a3a5c] hover:text-white hover:border-[#1a3a5c] transition-all">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
