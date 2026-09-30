'use client'

import { useState } from 'react'
import { loginAction } from './actions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { Lock, Mail, Eye, EyeOff, AlertCircle, Globe, Shield, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
})

type FormData = z.infer<typeof schema>

const BRAND_FEATURES = [
  { icon: Globe, text: 'Quản lý nội dung website toàn diện' },
  { icon: Shield, text: 'Bảo mật và phân quyền an toàn' },
  { icon: Users, text: 'Theo dõi khách hàng và báo giá' },
]

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    try {
      const result = await loginAction(data.email, data.password)
      if (result?.error) {
        setError(result.error)
      }
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        (err.message.includes('NEXT_REDIRECT') ||
          (err as { digest?: string }).digest?.includes('NEXT_REDIRECT'))
      ) {
        return
      }
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a1628] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0066ff]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#1B5BB8]/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0066ff]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-sm text-center">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/logo-fave.svg"
              alt="FAVE Vietnam"
              width={180}
              height={111}
              className="h-16 w-auto brightness-0 invert opacity-90"
              priority
              unoptimized
            />
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Hệ thống quản trị
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10">
            Nền tảng quản lý nội dung chuyên nghiệp dành riêng cho FAVE Việt Nam
          </p>

          {/* Features */}
          <div className="space-y-4">
            {BRAND_FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 bg-[#0066ff]/15 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#0066ff]" />
                </div>
                <span className="text-white/60 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 text-white/20 text-xs">
          © {new Date().getFullYear()} FAVE Việt Nam
        </div>
      </div>

      {/* Right — Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Image src="/logo-fave.svg" alt="FAVE Vietnam" width={130} height={80} className="h-11 w-auto" unoptimized />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Đăng nhập</h1>
            <p className="text-gray-500 text-sm mt-1">
              Nhập thông tin để truy cập hệ thống quản trị
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="admin@fave.com.vn"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff] transition-all',
                    errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={cn(
                    'w-full pl-10 pr-11 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff] transition-all',
                    errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#0066ff] accent-[#0066ff]"
                />
                <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3 border border-red-100">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0a1628] text-white font-semibold rounded-xl hover:bg-[#0066ff] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang đăng nhập...
                </span>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-8">
            © {new Date().getFullYear()} FAVE Việt Nam. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  )
}
