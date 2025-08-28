'use client'

import { useRegister } from '@/api/authApi/authApi'
import AuthLayout from '@/components/layouts/AuthLayout'
import Input from '@/components/ui/Input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()
  const registerMutation = useRegister()

  const handleRegister = async (evt) => {
    evt.preventDefault()
    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password
    ) {
      return
    }
    if (registerData.password !== confirmPassword) {
      alert('Пароли не совпадают')
      return
    }

    registerMutation.mutate(registerData, {
      onSuccess: () => {
        router.push('/login')
      },
      onError: (err) => {
        console.error('Ошибка регистрации:', err)
      },
    })
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl text-center font-bold mb-[30px]">Регистрация</h1>
      <div className="mb-[15px]">
        <Input
          placeholder="Имя пользователя"
          value={registerData.username}
          setValue={(value) =>
            setRegisterData((prev) => ({ ...prev, username: value }))
          }
        />
        <Input
          placeholder="Почта"
          type="email"
          value={registerData.email}
          setValue={(value) =>
            setRegisterData((prev) => ({ ...prev, email: value }))
          }
        />
        <Input
          placeholder="Введите пароль"
          type="password"
          value={registerData.password}
          setValue={(value) =>
            setRegisterData((prev) => ({ ...prev, password: value }))
          }
        />
        <Input
          placeholder="Подтвердите пароль"
          type="password"
          value={confirmPassword}
          setValue={(value) => setConfirmPassword(value)}
        />
      </div>
      <button
        className="bg-[#f7f21a] rounded-xl w-full py-[7px] text-lg mb-[10px] font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleRegister}
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
      <Link
        href="/login"
        className="bg-[#f6f6f6] rounded-xl w-full py-[7px] text-lg font-medium mb-[10px] text-center hover:bg-[#fefe22] transition-custom"
      >
        Войти
      </Link>
      {registerMutation.isError && (
        <p className="text-red-500 text-center">
          Ошибка: {registerMutation.error.message}
        </p>
      )}
    </AuthLayout>
  )
}
