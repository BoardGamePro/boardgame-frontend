export function formatDate(isoString, locale = 'ru') {
  const date = new Date(isoString)

  const options = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: undefined,
  }

  const localeCode = locale === 'ru' ? 'ru-RU' : 'en-US'

  const formatted = new Intl.DateTimeFormat(localeCode, options).format(date)

  if (locale === 'ru') {
    return formatted.replace(/,?\s*г\.?,?\s*/, ' г. в ')
  } else {
    return formatted.replace(',', ' at')
  }
}
