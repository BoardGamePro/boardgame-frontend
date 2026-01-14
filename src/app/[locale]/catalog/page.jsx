import PageLayout from '@/components/layouts/PageLayout'
import FilterSidebar from '@/components/widgets/FilterSidebar'
import GamesGrid from '@/components/widgets/GamesGrid'
import { getTranslations } from 'next-intl/server'

export default async function CatalogPage({ params, searchParams }) {
  const { locale } = await params
  const { page, sortBy, players, age, minYear, maxYear, search } =
    await searchParams
  // TODO: добавить сортировку по рейтингу, когда она появится в API
  const t = await getTranslations({ locale, namespace: 'filters' })
  const gamesPerPage = 9

  const currentOffset = gamesPerPage * (page - 1)

  const url = new URL(`${process.env.GAMES_API_URL}/games`)
  url.searchParams.set('language', locale)
  url.searchParams.set('limit', gamesPerPage)

  if (sortBy) url.searchParams.set('sort-by', sortBy)
  if (currentOffset) url.searchParams.set('offset', currentOffset)
  if (players) url.searchParams.set('filter-by-players', players)
  if (age) url.searchParams.set('filter-by-age', age)
  if (minYear || maxYear) {
    url.searchParams.set('filter-by-year', `${minYear || ''},${maxYear || ''}`)
  }
  if (search) {
    url.searchParams.set('filter-by-text', search)
  }

  const res = await fetch(url.toString(), { next: { revalidate: 300 } })

  if (!res.ok) {
    console.log(res)

    throw new Error('Failed to fetch games')
  }

  const games = await res.json()

  return (
    <PageLayout>
      <h1 className="text-[32px] font-semibold text-black">{t('title')}</h1>
      <p className="text-[18px] text-[#595959]">
        {' '}
        {t('foundcounter')} {games?.total} {t('gamecounter')}d
      </p>

      <div className="mt-[30px] grid grid-cols-[280px_1fr] gap-[30px]">
        <FilterSidebar />
        {!games || games.result.length === 0 ? (
          <p>{t('gamesNotFoundcounter')}</p>
        ) : (
          <GamesGrid games={games} sortBy={sortBy || ''} />
        )}
      </div>
    </PageLayout>
  )
}
