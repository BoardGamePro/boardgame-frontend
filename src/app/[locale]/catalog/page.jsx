import PageLayout from '@/components/layouts/PageLayout'
import FilterSidebar from '@/components/widgets/FilterSidebar'
import GamesGrid from '@/components/widgets/GamesGrid'
import { getTranslations } from 'next-intl/server'

export default async function CatalogPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'catalog' })

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
    <PageLayout>
      <h1 className="text-[32px] font-semibold text-black">{t('title')}</h1>
      <p className="text-[18px] text-[#595959]">Found {games?.total} games</p>

      <div className="mt-[30px] grid grid-cols-[280px_1fr] gap-[30px]">
        <FilterSidebar />
        {!games || games.result.length === 0 ? (
          <p>{t('gamesNotFound')}</p>
        ) : (
          <GamesGrid games={games} />
        )}
      </div>
    </PageLayout>
  )
}
