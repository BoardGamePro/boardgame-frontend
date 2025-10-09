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
      <div className="flex flex-col gap-[26px] mt-[55px] mb-[18px] w-full">
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

      <div className="flex text-center gap-[5px] mb-[29px]">
        <p className="font-semibold text-[13px]">{t('loginHint')}</p>
        <button
          type="button"
          onClick={changeAuthState}
          className="font-semibold text-[13px] text-[var(--color-main)] underline hover:no-underline"
        >
          {t('linkToLogin')}
        </button>
      </div>

      <button className="font-medium text-[20px] text-white bg-[var(--color-main)] rounded-[16px] py-[8.5px] px-[9px] min-w-[126px] hover:scale-105 active:scale-95 transition-custom">
        {t('signUp')}
      </button>
    </form>
  )
}
