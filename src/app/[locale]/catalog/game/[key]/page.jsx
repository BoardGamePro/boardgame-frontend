import PageLayout from '@/components/layouts/PageLayout'
import GameHeader from '@/components/ui/GameHeader/GameHeader'
import GameNav from '@/components/ui/GameNav'
import GameSection from '@/components/ui/GameSection'
import SourceCard from '@/components/ui/SourceCard'
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

  const imagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_GAMES_API_URL}/games/${encodeURIComponent(key)}/images`,
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
  const images = await imagesRes.json()

  const preview = images.result[0].content.original.url

  const gallery = images.result
    .map((imageInfo) => imageInfo.content.original.url)
    .filter((_, index) => index !== 0)

  game.categories = ['fantasy', 'mythology', 'battle']
  game.rating = 3.4

  return (
    <PageLayout>
      <div className="w-full max-w-[894px]">
        <GameHeader preview={preview} gameinfo={game} />
        <GameNav />
        <GameSection title={t('gameDescription')} sectionId="Description">
          <p>{game.description}</p>
        </GameSection>
        <GameSection title="Sources" sectionId="Sources">
          {game.sources?.map((source) => (
            <SourceCard sourceInfo={source} key={source.siteKey} />
          ))}
        </GameSection>

        <div className="flex gap-[15px] flex-wrap">
          {gallery.map((item, index) => (
            <Image
              src={item}
              width={150}
              height={150}
              alt="gallery-item"
              key={index}
              className="object-cover w-[150px] h-[150px]"
            />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
