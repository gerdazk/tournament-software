import { Accordion } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { normalizeDate } from '@/src/utils/normalizeDate'
import { OrderOfPlay as OrderOfPlayType, Tournament } from '@prisma/client'

import { getDaysBetweenDates } from '../utils/getDaysBetweenDates'

import { OrderOfPlayAccordionItem } from './OrderOfPlayAccordionItem'

type OrderOfPlayProps = {
  schedules: OrderOfPlayType[]
  tournament: Tournament
  tournamentId: number
  shouldAllowEditing?: boolean
  onUpdate: () => void
}

export const OrderOfPlay: React.FC<OrderOfPlayProps> = ({
  schedules,
  tournament,
  tournamentId,
  shouldAllowEditing,
  onUpdate
}) => {
  const dates = getDaysBetweenDates({ ...tournament })

  return (
    !!dates?.length && (
      <Tabs defaultValue={dates[0]}>
        <TabsList className="flex gap-2 justify-start w-fit mb-6">
          {dates.map(date => (
            <TabsTrigger key={date} value={date}>
              {date}
            </TabsTrigger>
          ))}
        </TabsList>
        {dates.map(date => {
          const matchesAtThisDay = schedules.filter(
            ({ date: scheduleDate }: any) => {
              return normalizeDate(scheduleDate) === date
            }
          )
          return (
            <TabsContent key={date} value={date}>
              {matchesAtThisDay?.length || shouldAllowEditing ? (
                <Accordion type="single" collapsible className="w-full">
                  {tournament.Location.map(({ id, name }) => {
                    const filteredMatchesForLocationAndDate = schedules.filter(
                      ({ locationId, date: scheduleDate }: any) => {
                        return (
                          id === locationId &&
                          normalizeDate(scheduleDate) === date
                        )
                      }
                    )
                    const hasMatches =
                      filteredMatchesForLocationAndDate?.[0] &&
                      !!filteredMatchesForLocationAndDate[0].matches?.length
                    return (
                      <OrderOfPlayAccordionItem
                        key={id}
                        hasMatches={hasMatches}
                        locationId={id}
                        name={name}
                        date={date}
                        schedule={filteredMatchesForLocationAndDate}
                        tournamentId={tournamentId}
                        shouldAllowEditing={shouldAllowEditing}
                        onUpdate={onUpdate}
                      />
                    )
                  })}
                </Accordion>
              ) : (
                <div>There are no matches for selected date.</div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    )
  )
}
