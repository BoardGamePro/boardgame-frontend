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
      <div className="flex flex-col gap-[26px] mt-[55px] mb-[18px] w-full">
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

      <div className="flex text-center gap-[5px] mb-[29px]">
        <p className="font-semibold text-[13px">{t('registerHint')}</p>
        <button
          type="button"
          onClick={changeAuthState}
          className="font-semibold text-[13px] text-[var(--color-main)] underline hover:no-underline"
        >
          {t('linkToRegister')}
        </button>
      </div>

      <button className="font-medium text-[20px] text-white bg-[var(--color-main)] rounded-[16px] py-[8.5px] px-[9px] min-w-[126px] hover:scale-105 active:scale-95 transition-custom">
        {t('login')}
      </button>
    </form>
  )
}
