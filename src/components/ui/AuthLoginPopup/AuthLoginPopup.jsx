import React, { useState } from 'react'
import Input from '../Input'
import { useTranslations } from 'next-intl'
import InputPassword from '../InputPassword'
import { useLogin } from '@/api/authApi/authApi'

export default function AuthLoginPopup({ changeAuthState, handleClosePopup }) {
  const t = useTranslations('loginPopup')
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })

  const loginMutation = useLogin()

  const setData = (data, dataType) => {
    setUserData((prev) => ({ ...prev, [dataType]: data }))
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    try {
      await loginMutation.mutateAsync({
        username: userData.username,
        password: userData.password,
      })
      handleClosePopup()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="mt-[55px] mb-[18px] flex w-full flex-col gap-[26px]">
        <Input
          placeholder={t('username')}
          value={userData.username}
          setValue={(value) => setData(value, 'username')}
        />
        <InputPassword
          placeholder={t('password')}
          value={userData.password}
          setValue={(value) => setData(value, 'password')}
        />
      </div>

      <div className="mb-[29px] flex gap-[5px] text-center">
        <p className="text-[13px] font-semibold">{t('registerHint')}</p>
        <button
          type="button"
          onClick={changeAuthState}
          className="text-[13px] font-semibold text-(--color-main) underline hover:no-underline"
        >
          {t('linkToRegister')}
        </button>
      </div>

      <button className="transition-custom min-w-[126px] rounded-[16px] bg-(--color-main) px-[9px] py-[8.5px] text-[20px] font-medium text-white hover:scale-105 active:scale-95">
        {t('login')}
      </button>
    </form>
  )
}
