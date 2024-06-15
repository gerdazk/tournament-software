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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { buildInitialEntries, updateScore } from '../utils/scoreHandlers'

import { PlayerScoreRow } from './PlayerScoreRow'

const formSchema = z.object({
  winnerId: z.string().min(1).max(191)
})

type ScoreEntryDialogProps = {
  matchId: number
  players: Participant[]
  isOpen: boolean
  setOpen: (val: boolean) => void
  tournamentId: number
  onUpdate: () => void
}

export const ScoreEntryDialog: React.FC<ScoreEntryDialogProps> = ({
  matchId,
  players = [],
  isOpen,
  setOpen,
  tournamentId,
  onUpdate
}) => {
  const [scoringUnits, setScoringUnits] = useState(
    buildInitialEntries({ players, matchId })
  )

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm({
    defaultValues: {},
    resolver: zodResolver(formSchema)
  })

  const playersOptions = players.map(({ user }) => ({
    text: user?.name,
    value: user?.id?.toString()
  }))

  const handleScoreChange = ({ participantId, index, score }) => {
    const entries = [...scoringUnits]
    updateScore({
      entries,
      participantId,
      index,
      score
    })

    setScoringUnits(entries)
  }

  const onSubmit = async ({ winnerId }) => {
    setLoading(true)
    const result = await fetch(
      `/api/tournament/${tournamentId}/matches/score`,
      {
        method: 'POST',
        body: JSON.stringify({ scoringUnits, winnerId, matchId })
      }
    )
    await onUpdate()
    setLoading(false)

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
            {players.map(({ user, id }) => {
              const playerScoringUnits = scoringUnits.filter(
                ({ participantId }) => participantId === id
              )

              return (
                <PlayerScoreRow
                  key={user.id}
                  playerName={user.name}
                  handleScoreChange={handleScoreChange}
                  participantId={id}
                  playerScoringUnits={playerScoringUnits}
                />
              )
            })}

            <DialogFooter>
              <Button isLoading={isLoading} type="submit">
                Submit
              </Button>
              {error && <ErrorMessage message={error} />}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
