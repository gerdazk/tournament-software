import { Accordion } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { normalizeDate } from '@/src/utils/normalizeDate'

import { getDaysBetweenDates } from '../utils/getDaysBetweenDates'

import { OrderOfPlayAccordionItem } from './OrderOfPlayAccordionItem'

export const OrderOfPlay = ({
  schedules,
  tournament,
  tournamentId,
  shouldAllowEditing
}) => {
  const dates = getDaysBetweenDates({ ...tournament })
  return (
    <>
      <Tabs defaultValue={dates[0]}>
        <TabsList className="flex gap-2 justify-start w-fit mb-6">
          {dates.map(date => (
            <TabsTrigger key={date} value={date}>
              {date}
            </TabsTrigger>
          ))}
        </TabsList>
        {dates.map(date => (
          <TabsContent key={date} value={date}>
            <Accordion type="single" collapsible className="w-full">
              {tournament.Location.map(({ id, name }) => {
                const schedule = schedules.filter(
                  ({ locationId, date: scheduleDate }: any) => {
                    return (
                      id === locationId && normalizeDate(scheduleDate) === date
                    )
                  }
                )
                const hasMatches =
                  schedule?.[0] && !!schedule[0].matches?.length
                return (
                  <OrderOfPlayAccordionItem
                    key={id}
                    hasMatches={hasMatches}
                    locationId={id}
                    name={name}
                    date={date}
                    schedule={schedule}
                    tournamentId={tournamentId}
                    shouldAllowEditing={shouldAllowEditing}
                  />
                )
              })}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
