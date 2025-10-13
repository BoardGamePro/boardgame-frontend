import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import Input from '../Input'
import InputPassword from '../InputPassword'
import { useRegister } from '@/api/authApi/authApi'

export default function AuthRegisterPopup({
  changeAuthState,
  handleClosePopup,
}) {
  const t = useTranslations('registerPopup')
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const registerMutation = useRegister()

  const setData = (data, dataType) => {
    setUserData((prev) => ({ ...prev, [dataType]: data }))
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    try {
      await registerMutation.mutateAsync({
        username: userData.username,
        email: userData.email,
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
        <Input
          placeholder={t('email')}
          value={userData.email}
          setValue={(value) => setData(value, 'email')}
        />
        <InputPassword
          placeholder={t('password')}
          value={userData.password}
          setValue={(value) => setData(value, 'password')}
        />
      </div>

      <div className="mb-[29px] flex gap-[5px] text-center">
        <p className="text-[13px] font-semibold">{t('loginHint')}</p>
        <button
          type="button"
          onClick={changeAuthState}
          className="text-[13px] font-semibold text-(--color-main) underline hover:no-underline"
        >
          {t('linkToLogin')}
        </button>
      </div>

      <button className="transition-custom min-w-[126px] rounded-[16px] bg-(--color-main) px-[9px] py-[8.5px] text-[20px] font-medium text-white hover:scale-105 active:scale-95">
        {t('signUp')}
      </button>
    </form>
  )
}
