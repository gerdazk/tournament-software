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
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ErrorMessage } from '@/src/components/Labels/ErrorMessage'

import { updateScore } from '../utils/scoreHandlers'

import { PlayerScoreRow } from './PlayerScoreRow'

type ScoreEditDialogProps = {
  matchId: number
  isOpen: boolean
  setOpen: (val: boolean) => void
  tournamentId: number
}

export const ScoreEditDialog: React.FC<ScoreEditDialogProps> = ({
  matchId,
  isOpen,
  setOpen,
  tournamentId
}) => {
  const [scoringUnits, setScoringUnits] = useState([])
  const [players, setPlayers] = useState([])
  const [initialWinnerId, setInitialWinnerId] = useState()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getMatch = async () => {
    const res = await fetch(`/api/tournament/1/matches/${matchId}`)
    const body = await res.json()
    body?.match?.ScoreUnit && setScoringUnits(body.match.ScoreUnit)
    body?.match?.participants && setPlayers(body.match.participants)
    body?.match?.winnerId && setInitialWinnerId(body.match.winnerId)
  }

  useEffect(() => {
    getMatch()
  }, [])

  const form = useForm({
    defaultValues: {}
  })

  const playersOptions =
    players?.map(({ user }) => ({
      text: user?.name,
      value: user?.id?.toString()
    })) || []

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
              defaultValue={initialWinnerId?.toString()}
            />
            {players?.length &&
              players.map(({ user, id }) => {
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
