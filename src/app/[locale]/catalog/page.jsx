import PageLayout from '@/components/layouts/PageLayout'
import GameCard from '@/components/widgets/GameCard'
import { getTranslations } from 'next-intl/server'

export default async function CatalogPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'catalog' })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GAMES_API_URL}/games?language=${locale}`,
    {
      next: { revalidate: 300 },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch games')
  }

  const games = await res.json()

  return (
    <PageLayout>
      <h1 className="font-bold text-2xl">{t('title')}</h1>

      {!games || games.result.length === 0 ? (
        <p className="mt-4">{t('gamesNotFound')}</p>
      ) : (
        <div className="flex gap-[30px] mt-[30px] flex-wrap">
          {games.result.map((game) => (
            <GameCard key={game.canonicalName || game.id} gameInfo={game} />
          ))}
        </div>
      )}
    </PageLayout>
  )
}
