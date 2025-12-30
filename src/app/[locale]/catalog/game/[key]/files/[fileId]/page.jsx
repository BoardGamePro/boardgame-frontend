import PdfViewer from '@/components/widgets/PdfViewer'
import { rules } from '@/mocks/rules-mocks'
import Header from '@/components/ui/Header'

export default async function FilePage({ params }) {
  const { key, fileId } = await params

  const rule = rules
    .find((game) => game.game === key)
    ?.rules.find((rule) => rule.id === Number(fileId))

  if (!rule) {
    return <div>Файл не найден</div>
  }

  return (
    <>
      <Header />
      <main className="px-[30px]">
        <PdfViewer fileUrl={rule.file} title={rule.name} gameName={key} />
      </main>
    </>
  )
}
