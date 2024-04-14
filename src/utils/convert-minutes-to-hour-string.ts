export function convertHourMinutesToHourString(minutesAmount: number = 0) {
  const hours = Math.floor(minutesAmount / 60)
  const minutes = minutesAmount % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}
