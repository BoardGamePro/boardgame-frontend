'use client'

import AuthLayout from '@/components/layouts/AuthLayout'
import Input from '@/components/ui/Input'
import Link from 'next/link'
import React, { useState } from 'react'
import { useLogin } from '@/api/authApi'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const loginMutation = useLogin()

  const handleLogin = async (evt) => {
    evt.preventDefault()
    if (!loginData.username || !loginData.password) {
      return
    }

    loginMutation.mutate(loginData, {
      onSuccess: () => {
        router.push('/profile')
      },
      onError: (err) => {
        console.error('Ошибка входа:', err)
      },
    })
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl text-center font-bold mb-[30px]">Вход</h1>
      <div className="mb-[15px]">
        <Input
          placeholder="Имя пользователя"
          value={loginData.username}
          setValue={(value) =>
            setLoginData((prev) => ({ ...prev, username: value }))
          }
        />
        <Input
          placeholder="Пароль"
          type="password"
          value={loginData.password}
          setValue={(value) =>
            setLoginData((prev) => ({ ...prev, password: value }))
          }
        />
      </div>
      <button
        className="bg-[#f7f21a] rounded-xl w-full py-[7px] text-lg mb-[10px] font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleLogin}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Вход...' : 'Войти'}
      </button>
      <Link
        href="/register"
        className="bg-[#f6f6f6] rounded-xl w-full py-[7px] text-lg font-medium mb-[10px] text-center hover:bg-[#fefe22] transition-custom"
      >
        Зарегистрироваться
      </Link>
      {loginMutation.isError && (
        <p className="text-red-500 text-center">
          Ошибка: {loginMutation.error.message}
        </p>
      )}
    </AuthLayout>
  )
}
