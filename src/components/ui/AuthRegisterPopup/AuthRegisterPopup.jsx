import React, { useState } from 'react'
import Input from '../Input'
import InputPassword from '../InputPassword'
import { useTranslations } from 'next-intl'
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
    confirmPassword: '',
  })

  const registerMutation = useRegister()

  const setData = (data, type) =>
    setUserData((prev) => ({ ...prev, [type]: data }))

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
    <div className="w-full">
      {/* Title */}
      <h2 className="h-[25px] text-center text-[18px] font-semibold">
        {t('signUp')}
      </h2>
      <p className="mt-[30px] h-[24px] text-center text-[15px] font-normal text-(--color-text-gray)">
        {t('registerHint')}
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
            placeholder={t('Enter your username')}
            value={userData.username}
            setValue={(value) => setData(value, 'username')}
            icon="/icons/envelope.svg"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-[5px] block h-[17px] text-[14px] font-semibold text-(--foreground)">
            {t('email')}
          </label>
          <Input
            placeholder={t('Enter your email')}
            value={userData.email}
            setValue={(value) => setData(value, 'email')}
            icon="/icons/envelope.svg"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-[5px] block h-[17px] text-[14px] font-semibold text-(--foreground)">
            {t('password')}
          </label>
          <InputPassword
            placeholder={t('Enter your password')}
            value={userData.password}
            setValue={(value) => setData(value, 'password')}
            icon="/icons/lock.svg"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-[5px] block h-[17px] text-[14px] font-semibold text-(--foreground)">
            {t('Confirm your password')}
          </label>
          <InputPassword
            placeholder={t('Confirm your password')}
            value={userData.confirmPassword}
            setValue={(value) => setData(value, 'confirmPassword')}
            icon="/icons/lock.svg"
          />
        </div>

        {/* Button */}
        <button className="flex h-[35px] w-[180px] items-center justify-center self-center rounded-[4px] bg-(--color-accent) px-[16px] py-[4px] text-[14px] leading-[16px] font-medium text-white">
          {t('signUp')}
        </button>

        {/* Bottom switch */}
        <div className="h-[24px] text-center text-[14px] text-(--color-text-gray)">
          {t('loginHint')}{' '}
          <button
            type="button"
            onClick={changeAuthState}
            className="font-semibold text-(--color-text-default)"
          >
            {t('linkToLogin')}
          </button>
        </div>
      </form>
    </div>
  )
}
