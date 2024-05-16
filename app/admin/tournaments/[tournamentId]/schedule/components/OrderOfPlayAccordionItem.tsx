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
  locationId,
  name,
  date,
  schedule,
  tournamentId,
  shouldAllowEditing
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const handlePublishButtonClick = async () => {
    const res = await fetch(`/api/tournament/${tournamentId}/schedules`, {
      method: 'PATCH',
      body: JSON.stringify({
        isPublished: !schedule[0].isPublished,
        id: schedule[0].id
      })
    })
  }

  return (
    <>
      {shouldAllowEditing && (
        <AssignMatchToScheduleDialog
          isOpen={isDialogOpen}
          setOpen={setDialogOpen}
          tournamentId={tournamentId}
          locationId={locationId}
          locationName={name}
          date={date}
        />
      )}
      <AccordionItem value={locationId + date} key={locationId + date}>
        <AccordionTrigger>{name}</AccordionTrigger>
        <AccordionContent>
          {shouldAllowEditing && (
            <div className="flex gap-3">
              <Button
                className="mb-3"
                variant="outline"
                onClick={() => {
                  setDialogOpen(true)
                }}
              >
                Add a match
              </Button>
              <Button
                className="mb-3"
                variant="outline"
                onClick={handlePublishButtonClick}
              >
                {schedule[0]?.isPublished ? 'Unpublish' : 'Publish'}
              </Button>
            </div>
          )}
          {hasMatches ? (
            <MatchesTable
              matches={schedule[0]?.matches}
              shouldAllowEditing={shouldAllowEditing}
            />
          ) : (
            <div>No matches available for selected location and time.</div>
          )}
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
