import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import RecomendationSection from '@/components/ui/RecomendationSection'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import React from 'react'
import { getTranslations } from 'next-intl/server'

export default async function MainPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'mainPage' })

  const res = await fetch(
    `${process.env.GAMES_API_URL}/games?language=${locale}`,
    {
      next: { revalidate: 300 },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch games')
  }

  const games = await res.json()

  return (
    <>
      <Header />
      <main className="flex-1 bg-(--color-light-neutral)">
        <section className="flex gap-[60px] bg-[linear-gradient(279.63deg,#FEF7DF_0.16%,#E6F1FF_99.84%)] px-[calc((100%-979px)/2)] py-[98.5px]">
          <div>
            <h1 className="mb-[20px] !text-[48px]/[1.35] font-semibold">
              {t('heroTitle1')}
              <span className="text-(--color-accent)"> {t('heroTitle2')}</span>
            </h1>
            <p className="mb-[20px] !text-[18px]/[1.4] text-[#595959]">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-[20px]">
              <Link
                href="/ai"
                className="transition-custom rounded-[4px] bg-(--color-accent) bg-[image:url('/icons/ai-icon.svg')] bg-position-[left_12px_center] bg-no-repeat p-[9.5px_12px_9.5px_40px] text-[14px] font-medium text-white hover:opacity-85"
              >
                {t('btnAskAI')}
              </Link>
              <Link
                href=""
                className="transition-custom rounded-[4px] border border-[#E5E5E5] bg-white bg-[image:url('/icons/popular-icon.svg')] bg-position-[left_12px_center] bg-no-repeat p-[9.5px_12px_9.5px_40px] text-[14px] font-medium hover:opacity-80"
              >
                {t('btnPopular')}
              </Link>
              <Link
                href="/catalog"
                className="transition-custom rounded-[4px] border border-[#E5E5E5] bg-white bg-[image:url('/icons/filters-icon.svg')] bg-position-[left_12px_center] bg-no-repeat p-[9.5px_12px_9.5px_40px] text-[14px] font-medium hover:opacity-80"
              >
                {t('btnBrowse')}
              </Link>
            </div>
          </div>

          <Image
            src="/main.png"
            width={539}
            height={360}
            priority
            alt={t('mainImageAlt')}
            className="rounded-[10px] object-cover"
          />
        </section>

        <RecomendationSection games={games.result.slice(0, 12)} />

        <section className="bg-white py-[40px]">
          <div className="relative mx-auto flex h-[500px] w-[900px] justify-between overflow-hidden rounded-[20px] bg-[linear-gradient(90deg,#1B5CFB_0%,#9747FF_100%)] p-[52.5px_20px_52.5px_50px] before:absolute before:top-[-53px] before:left-[-50px] before:h-[106px] before:w-[106px] before:rounded-[50%] before:bg-[rgba(217,217,217,0.2)] after:absolute after:right-[-71px] after:bottom-[-63px] after:h-[171px] after:w-[171px] after:rounded-[50%] after:bg-[rgba(217,217,217,0.2)]">
            <div className="w-[390px]">
              <p className="mb-[10px] flex items-center text-(--color-warning)">
                <span className="mr-[7px] inline-block h-[20px] w-[17px] bg-(--color-warning) [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] [mask:url('/icons/ai-icon.svg')]"></span>
                {t('aiSectionLabel')}
              </p>

              <p className="mb-[20px] text-[32px] font-semibold text-white">
                {t('aiSectionTitle')}
              </p>

              <p className="mb-[20px] !text-[18px]/[1.4] text-white">
                {t('aiSectionText')}
              </p>

              <Link
                href="/ai"
                className="transition-custom relative mb-[20px] !flex w-fit items-center gap-[10px] rounded-[4px] bg-white p-[9.5px_20px] text-[14px] font-medium text-(--color-accent) hover:opacity-85"
              >
                <span className="inline-block h-[20px] w-[17px] bg-(--color-accent) [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] [mask:url('/icons/ai-icon.svg')]"></span>
                {t('btnTryAI')}
              </Link>

              <div className="flex flex-wrap gap-[10px]">
                <p className="relative overflow-hidden rounded-[100px] border border-white/20 bg-[rgba(201,200,211,0.2)] p-[7.5px_12px_7.5px_30px] text-[14px] font-medium text-white shadow-inner backdrop-blur-md before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_70%)] before:opacity-20 after:absolute after:top-[50%] after:left-[12px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rounded-full after:bg-[#05DF72]">
                  {t('chipInstant')}
                </p>

                <p className="relative overflow-hidden rounded-[100px] border border-white/20 bg-[rgba(201,200,211,0.2)] p-[7.5px_12px_7.5px_30px] text-[14px] font-medium text-white shadow-inner backdrop-blur-md before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_70%)] before:opacity-20 after:absolute after:top-[50%] after:left-[12px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rounded-full after:bg-[#51A2FF]">
                  {t('chipClarifications')}
                </p>

                <p className="relative overflow-hidden rounded-[100px] border border-white/20 bg-[rgba(201,200,211,0.2)] p-[7.5px_12px_7.5px_30px] text-[14px] font-medium text-white shadow-inner backdrop-blur-md before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_70%)] before:opacity-20 after:absolute after:top-[50%] after:left-[12px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rounded-full after:bg-[#C27AFF]">
                  {t('chipStrategy')}
                </p>
              </div>
            </div>

            <div className="mt-[31px] flex h-[275px] w-[430px] flex-col gap-[10px] rounded-[20px] border border-[rgba(229,229,229,0.4)] bg-[rgba(201,200,211,0.2)] p-[19px_12px_29.5px] text-white">
              <div className="w-fit rounded-[20px] bg-white p-[18.5px_38px_18.5px_20px]">
                <p className="mb-[5px] font-bold text-(--color-text-gray)">
                  {t('chatYou')}
                </p>
                <p className="text-(--color-text-default)">
                  {t('chatQuestion')}
                </p>
              </div>

              <div className="w-[304px] self-end rounded-[20px] bg-(--color-accent) p-[18.5px_20px]">
                <p className="font-bold">{t('chatAI')}</p>
                <p className="line-clamp-2">{t('chatAnswer')}</p>
              </div>
              <p className="mt-auto flex items-center self-end text-white">
                <span className="mr-[7px] inline-block h-[20px] w-[17px] bg-white [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] [mask:url('/icons/ai-icon.svg')]"></span>
                {t('chatThinking')}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
