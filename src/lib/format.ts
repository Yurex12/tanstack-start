export function formateDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
  }).format(date)
}
