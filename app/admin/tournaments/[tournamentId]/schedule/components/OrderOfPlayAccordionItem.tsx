import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

import { MatchesTable } from '../../matches/components/MatchesTable'

import { AssignMatchToScheduleDialog } from './AssignMatchToScheduleDialog'

export const OrderOfPlayAccordionItem = ({
  hasMatches,
  id,
  name,
  date,
  schedule,
  tournamentId
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  return (
    <>
      <AssignMatchToScheduleDialog
        isOpen={isDialogOpen}
        setOpen={setDialogOpen}
        tournamentId={tournamentId}
        locationId={id}
        locationName={name}
        date={date}
      />
      <AccordionItem value={id + date} key={id + date}>
        <AccordionTrigger>{name}</AccordionTrigger>
        <AccordionContent>
          <Button
            className="mb-3"
            variant="outline"
            onClick={() => {
              setDialogOpen(true)
            }}
          >
            Add a match
          </Button>
          {hasMatches ? (
            <MatchesTable
              matches={schedule[0].matches}
              shouldDisplayHeader={false}
            />
          ) : (
            <div>No matches available for selected location and time.</div>
          )}
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
