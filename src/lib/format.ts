export function formatDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
  }).format(date)
}
