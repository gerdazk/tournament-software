import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { SelectField } from '@/src/components/Input/SelectField'
import { Participant } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ErrorMessage } from '@/src/components/Labels/ErrorMessage'

import { buildInitialEntries, updateScore } from '../utils/scoreHandlers'

import { PlayerScoreRow } from './PlayerScoreRow'

type ScoreEntryDialogProps = {
  matchId: number
  players: Participant[]
  isOpen: boolean
  setOpen: (val: boolean) => void
  tournamentId: number
}

export const ScoreEntryDialog: React.FC<ScoreEntryDialogProps> = ({
  matchId,
  players = [],
  isOpen,
  setOpen,
  tournamentId
}) => {
  const [scoringUnits, setScoringUnits] = useState(
    buildInitialEntries({ players, matchId })
  )
  const [error, setError] = useState('')

  const form = useForm({
    defaultValues: {}
  })

  const playersOptions = players.map(({ user }) => ({
    text: user?.name,
    value: user?.id?.toString()
  }))

  const handleScoreChange = ({ participantId, index, score }) => {
    const entries = [...scoringUnits]
    console.log({ participantId, index, score })
    updateScore({
      entries,
      participantId,
      index,
      score
    })

    setScoringUnits(entries)
  }

  const onSubmit = async ({ winnerId }) => {
    const result = await fetch(
      `/api/tournament/${tournamentId}/matches/score`,
      {
        method: 'POST',
        body: JSON.stringify({ scoringUnits, winnerId, matchId })
      }
    )

    if (!result?.error) {
      setOpen(false)
    } else {
      setError('Failed to save match score. Please try again.')
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter score of this match</DialogTitle>
          <DialogDescription>
            Enter the score of this match. This action can not be undone.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <SelectField
              control={form.control}
              label="Winner of this match"
              description=""
              placeholder=""
              name="winnerId"
              items={playersOptions}
            />
            {players.map(({ user, id }) => (
              <PlayerScoreRow
                key={user.id}
                playerName={user.name}
                handleScoreChange={handleScoreChange}
                participantId={id}
              />
            ))}

            <DialogFooter>
              <Button type="submit">Submit</Button>
              {error && <ErrorMessage message={error} />}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
