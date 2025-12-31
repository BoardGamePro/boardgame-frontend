import React, { useState } from 'react'
import Input from '../Input'
import InputPassword from '../InputPassword'
import { useTranslations } from 'next-intl'
import { useLogin } from '@/api/authApi/authApi'

export default function AuthLoginPopup({ changeAuthState, handleClosePopup }) {
  const t = useTranslations('loginPopup')

  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })

  const loginMutation = useLogin()

  const setData = (data, type) =>
    setUserData((prev) => ({ ...prev, [type]: data }))

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
    <div className="w-full">
      {/* Title */}
      <h2 className="h-[25px] text-center text-[18px] font-bold">
        {t('login')}
      </h2>
      <p className="mt-[30px] h-[24px] text-center text-[15px] text-(--color-text-gray)">
        {t('loginHint')}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-[30px] flex flex-col gap-[30px]"
      >
        {/* Username */}
        <div>
          <label className="mb-[5px] block h-[17px] text-[14px] font-semibold text-(--foreground)">
            {t('username')}
          </label>
          <Input
            placeholder={t('Enter your email or username')}
            value={userData.username}
            setValue={(value) => setData(value, 'username')}
            icon="/icons/envelope.svg"
          />
        </div>

        {/* Password + Forgot password */}
        <div className="flex flex-col">
          <label className="mb-[5px] block h-[17px] text-[14px] font-semibold text-(--foreground)">
            {t('password')}
          </label>

          <InputPassword
            placeholder={t('Enter your password')}
            value={userData.password}
            setValue={(value) => setData(value, 'password')}
            icon="/icons/fi-rs-lock.svg"
          />

          <button
            type="button"
            className="mt-[10px] h-[16px] self-end text-[13px] font-semibold text-(--foreground)"
          >
            {t('Forgot password?')}
          </button>
        </div>

        {/* Button */}
        <button className="mt-[34px] flex h-[35px] w-[180px] items-center justify-center self-center rounded-[4px] bg-(--color-accent) px-[16px] py-[4px] text-[14px] font-medium text-white">
          {t('signIn')}
        </button>

        {/* Bottom switch */}
        <div className="h-[24px] text-center text-[14px] text-(--color-text-gray)">
          {t('registerHint')}{' '}
          <button
            type="button"
            onClick={changeAuthState}
            className="font-semibold text-(--color-text-default)"
          >
            {t('linkToRegister')}
          </button>
        </div>
      </form>
    </div>
  )
}
