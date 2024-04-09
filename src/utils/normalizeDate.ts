import dayjs from 'dayjs'

export const normalizeDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD')
}
