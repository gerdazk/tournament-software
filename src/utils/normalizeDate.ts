import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const normalizeDate = (date: string | Date) => {
  return dayjs(date).utc().format('YYYY-MM-DD')
}
