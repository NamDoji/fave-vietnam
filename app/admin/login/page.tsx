'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Zap, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
})

type FormData = z.infer<typeof schema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email hoặc mật khẩu không đúng')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2540] to-[#1a3a5c] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1a3a5c] to-[#00a0e9] rounded-xl flex items-center justify-center">
              <Zap size={26} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-2xl text-white">FAVE</div>
              <div className="text-xs text-[#00a0e9] tracking-widest">VIETNAM</div>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-white">Đăng Nhập Admin</h1>
          <p className="text-gray-400 text-sm mt-1">Quản lý website FAVE Việt Nam</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="admin@fave.com.vn"
                  className={cn(
                    'w-full pl-9 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00a0e9]',
                    errors.email ? 'border-red-400' : 'border-gray-200'
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={cn(
                    'w-full pl-9 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00a0e9]',
                    errors.password ? 'border-red-400' : 'border-gray-200'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2.5">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1a3a5c] text-white font-semibold rounded-lg hover:bg-[#2a5a8c] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2024 FAVE Việt Nam. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </div>
  )
}
