export function formatDate(isoString) {
  const date = new Date(isoString)

  const options = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }

  const formatted = new Intl.DateTimeFormat('en-US', options).format(date)

  return formatted.replace(',', ' at')
}
