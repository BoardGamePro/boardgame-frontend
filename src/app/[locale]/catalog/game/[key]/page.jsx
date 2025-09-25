import PageLayout from '@/components/layouts/PageLayout'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function GamePage({ params }) {
  const { locale, key } = await params
  const t = await getTranslations({ locale, namespace: 'gamePage' })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GAMES_API_URL}/games/${encodeURIComponent(key)}?language=${locale}`,
    {
      next: { revalidate: 300 },
    }
  )

  if (!res.ok) {
    return (
      <PageLayout>
        <h1>{t('gameNotFound')}</h1>
      </PageLayout>
    )
  }

  const game = await res.json()

  return (
    <PageLayout>
      <div className="flex gap-[30px] items-center mb-[20px]">
        <Link href={`/${locale}/catalog`}>
          <Image
            src="/icons/arrow-back.svg"
            width={24}
            height={24}
            alt="back"
          />
        </Link>
        <h1 className="font-bold text-3xl">
          {game.title}, {game.releaseYear}
        </h1>
      </div>

      <div className="flex gap-[100px] mb-[40px]">
        <div>
          {game.img ? (
            <Image
              src={game.img}
              alt={game.canonicalName}
              width={300}
              height={300}
              className="w-[300px] h-[300px] object-cover"
            />
          ) : (
            <div className="w-[300px] h-[300px]" />
          )}
        </div>

        <div>
          <h2 className="mb-[5px] font-semibold text-lg">
            {t('informationTitle')}
          </h2>
          <p>{game.minimumAge} +</p>
          <p>
            {t('playersCount', {
              playerFrom: game.minimumPlayers,
              playerTo: game.maximumPlayers,
            })}
          </p>
          {game.sources?.map(({ site, siteKey, siteUrl, siteRating }) => (
            <div className="flex" key={siteKey}>
              <p className="mr-[15px]">
                {site} {t('rating')}:
              </p>
              <Link
                href={siteUrl}
                className="text-[#0070c0] underline decoration-[#0070c0] hover:no-underline"
                target="_blank"
              >
                {siteRating}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <h2 className="mb-[5px] font-semibold text-lg">{t('gameDescription')}</h2>
      <p>{game.description}</p>
    </PageLayout>
  )
}
