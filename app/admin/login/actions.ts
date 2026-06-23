'use server'

import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'

export async function loginAction(email: string, password: string) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Email hoặc mật khẩu không đúng' }
    }
    // signIn redirects on success by throwing NEXT_REDIRECT — re-throw it
    throw error
  }
}
