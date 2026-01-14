import PageLayout from '@/components/layouts/PageLayout'
import FileCard from '@/components/ui/FileCard'
import GameHeader from '@/components/ui/GameHeader/GameHeader'
import GameImagesSection from '@/components/ui/GameImagesSection'
import GameNav from '@/components/ui/GameNav'
import GameSection from '@/components/ui/GameSection'
import SourceCard from '@/components/ui/SourceCard'
import { rules } from '@/mocks/rules-mocks'
import { getTranslations } from 'next-intl/server'

export default async function GamePage({ params }) {
  const { locale, key } = await params

  const tGamePage = await getTranslations({
    locale,
    namespace: 'gamePage',
  })

  const tNav = await getTranslations({
    locale,
    namespace: 'gamenavigation',
  })

  const files = rules

  const res = await fetch(
    `${process.env.GAMES_API_URL}/games/${encodeURIComponent(
      key
    )}?language=${locale}`,
    {
      next: { revalidate: 300 },
    }
  )

  const imagesRes = await fetch(
    `${process.env.GAMES_API_URL}/games/${encodeURIComponent(
      key
    )}/images?limit=100`,
    {
      next: { revalidate: 300 },
    }
  )

  if (!res.ok) {
    return (
      <PageLayout>
        <h1>{tGamePage('gameNotFound')}</h1>
      </PageLayout>
    )
  }

  const game = await res.json()
  const images = await imagesRes.json()

  const preview = images?.result[0]?.content.original.url

  const gallery = images.result
    .map((imageInfo) => imageInfo.content.original.url)
    .filter((_, index) => index !== 0)
    .map((img, index) => ({ img, id: index }))

  game.categories = ['fantasy', 'mythology', 'battle']
  game.rating = 3.4

  return (
    <PageLayout>
      <div className="w-full max-w-[1200px]">
        <GameHeader preview={preview} gameinfo={game} />
        <GameNav />

        <GameSection title={tNav('sectionDescription')} sectionId="Description">
          <p>{game.description}</p>
        </GameSection>

        {gallery.length > 0 && <GameImagesSection gallery={gallery} />}

        <GameSection title={tNav('sectionSources')} sectionId="Sources">
          <div className="flex gap-[40px]">
            {game.sources?.map((source) => (
              <SourceCard sourceInfo={source} key={source.siteKey} />
            ))}
          </div>
        </GameSection>

        {files.find((file) => file.game === key) && (
          <GameSection title={tNav('sectionFiles')} sectionId="Files">
            <div className="flex gap-[40px]">
              {files
                .find((file) => file.game === key)
                ?.rules.map((rule) => (
                  <FileCard fileData={rule} key={rule.id} />
                ))}
            </div>
          </GameSection>
        )}
      </div>
    </PageLayout>
  )
}
