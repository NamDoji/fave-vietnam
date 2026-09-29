import Link from 'next/link'
import {
  FileText, MessageSquare, Newspaper, Users,
  Plus, Building2, Package, Settings, Layers,
  ArrowRight, TrendingUp,
} from 'lucide-react'
import type { QuoteRequestModel as QuoteRequest } from '@/app/generated/prisma/models/QuoteRequest'
import type { ContactRequestModel as ContactRequest } from '@/app/generated/prisma/models/ContactRequest'
import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

interface DashboardStats {
  quotes: number
  contacts: number
  news: number
  applicants: number
  recentQuotes: QuoteRequest[]
  recentContacts: ContactRequest[]
}

async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [quotes, contacts, news, applicants, recentQuotes, recentContacts] = await Promise.all([
      prisma.quoteRequest.count(),
      prisma.contactRequest.count(),
      prisma.newsPost.count({ where: { status: 'PUBLISHED' } }),
      prisma.applicant.count(),
      prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.contactRequest.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        where: { isRead: false },
      }),
    ])
    return { quotes, contacts, news, applicants, recentQuotes, recentContacts }
  } catch {
    return { quotes: 0, contacts: 0, news: 0, applicants: 0, recentQuotes: [] as QuoteRequest[], recentContacts: [] as ContactRequest[] }
  }
}

const QUICK_ACTIONS = [
  { label: 'Thêm tin tức', href: '/admin/news', icon: Newspaper, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
  { label: 'Thêm dự án', href: '/admin/projects', icon: Building2, color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' },
  { label: 'Thêm sản phẩm', href: '/admin/products', icon: Package, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
  { label: 'Thêm dịch vụ', href: '/admin/services', icon: Settings, color: 'bg-green-50 text-green-600 hover:bg-green-100' },
  { label: 'Quản lý Banner', href: '/admin/banners', icon: Layers, color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
  { label: 'Cài đặt website', href: '/admin/settings', icon: Settings, color: 'bg-gray-50 text-gray-600 hover:bg-gray-100' },
]

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const STAT_CARDS = [
    {
      icon: Newspaper,
      label: 'Tin tức',
      value: stats.news,
      href: '/admin/news',
      iconBg: 'bg-blue-500',
      border: 'border-t-blue-500',
      trend: '+2 tuần này',
    },
    {
      icon: FileText,
      label: 'Báo giá chờ',
      value: stats.quotes,
      href: '/admin/quotes',
      iconBg: 'bg-green-500',
      border: 'border-t-green-500',
      trend: 'Xem chi tiết',
    },
    {
      icon: MessageSquare,
      label: 'Liên hệ mới',
      value: stats.contacts,
      href: '/admin/contacts',
      iconBg: 'bg-orange-500',
      border: 'border-t-orange-500',
      trend: 'Cần xử lý',
    },
    {
      icon: Users,
      label: 'Ứng viên',
      value: stats.applicants,
      href: '/admin/recruitment',
      iconBg: 'bg-purple-500',
      border: 'border-t-purple-500',
      trend: 'Xem hồ sơ',
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
        <p className="text-gray-500 text-sm mt-1">
          Chào mừng trở lại — đây là tổng quan hoạt động website FAVE Việt Nam
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 border-t-4 ${card.border} hover:shadow-md transition-all group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                  <Icon size={20} className="text-white" />
                </div>
                <TrendingUp size={14} className="text-gray-300 group-hover:text-gray-400 transition-colors mt-1" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
              <div className="text-sm font-medium text-gray-600">{card.label}</div>
              <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <span>{card.trend}</span>
                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Plus size={16} className="text-[#0066ff]" />
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border border-transparent text-center transition-all ${action.color}`}
              >
                <Icon size={22} />
                <span className="text-xs font-medium leading-tight">{action.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quotes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Báo giá mới nhất</h2>
            <Link href="/admin/quotes" className="text-xs text-[#0066ff] hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          {stats.recentQuotes.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">Chưa có báo giá nào</p>
          ) : (
            <div className="space-y-3">
              {stats.recentQuotes.map((quote) => (
                <div key={quote.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="font-medium text-gray-700 text-sm">{quote.name}</div>
                    <div className="text-xs text-gray-400">{quote.phone} · {quote.service}</div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div
                      className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                        quote.status === 'NEW'
                          ? 'bg-blue-50 text-blue-600'
                          : quote.status === 'CONTACTED'
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'bg-green-50 text-green-600'
                      }`}
                    >
                      {quote.status}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {formatDate(quote.createdAt, 'vi-VN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Liên hệ chưa đọc</h2>
            <Link href="/admin/contacts" className="text-xs text-[#0066ff] hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          {stats.recentContacts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">Không có liên hệ mới</p>
          ) : (
            <div className="space-y-3">
              {stats.recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 bg-[#0a1628] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-700 text-sm">{contact.name}</div>
                    <div className="text-xs text-gray-400 truncate">{contact.message}</div>
                    <div className="text-xs text-gray-300 mt-0.5">
                      {formatDate(contact.createdAt, 'vi-VN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
