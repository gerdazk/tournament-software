import { normalizeDate } from '@/src/utils/normalizeDate'

type GetDaysBetweenDatesProps = {
  start_date: Date
  end_date: Date
}

export const getDaysBetweenDates = ({
  start_date,
  end_date
}: GetDaysBetweenDatesProps): string[] => {
  const daysBetween: Date[] = []
  const currentDate = new Date(start_date)
  const endDate = new Date(end_date)

  while (currentDate <= endDate) {
    daysBetween.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return daysBetween.map(date => normalizeDate(date))
}
