import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const normalizeDate = (date: string | Date, includeTime?: boolean) => {
  return dayjs(date).format(includeTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD')
}
