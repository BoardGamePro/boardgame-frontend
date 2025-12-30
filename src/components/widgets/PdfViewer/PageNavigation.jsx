'use client'

export default function PageNavigation({ pageNavigationPluginInstance }) {
  const { CurrentPageInput, NumberOfPages } = pageNavigationPluginInstance

  return (
    <div className="my-[10px] flex items-center justify-center gap-[4px]">
      <CurrentPageInput />
      <span className="text-[16px]/1.5">
        / <NumberOfPages />
      </span>
    </div>
  )
}
