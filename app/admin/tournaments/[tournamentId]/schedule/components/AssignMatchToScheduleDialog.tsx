import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Form, FormLabel } from '@/components/ui/form'
import { TimePicker } from '@/components/ui/time-picker-demo'
import { SelectField } from '@/src/components/Input/SelectField'
import { getAllTournamentMatches } from '@/src/utils/tournaments/getAllTournamentMatches'
import { zodResolver } from '@hookform/resolvers/zod'
import { Match } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  winnerId: z.string().min(1).max(191)
})

type AssignMatchToScheduleDialogProps = {
  isOpen: boolean
  setOpen: (val: boolean) => void
  tournamentId: number
  locationName: string
  locationId: number
  date: Date
  onUpdate: () => void
}

export const AssignMatchToScheduleDialog: React.FC<
  AssignMatchToScheduleDialogProps
> = ({
  isOpen,
  setOpen,
  tournamentId,
  locationName,
  locationId,
  date: tournamentDate,
  onUpdate
}) => {
  const form = useForm({
    defaultValues: {},
    resolver: zodResolver(formSchema)
  })

  const [matches, setMatches] = useState<Match[]>([])
  const [date, setDate] = useState(new Date(tournamentDate))
  const [isLoading, setLoading] = useState(false)

  const getMatches = async () => {
    const res = await getAllTournamentMatches({ id: tournamentId })
    res?.allMatches && setMatches(res.allMatches)
  }

  useEffect(() => {
    getMatches()
  }, [isOpen])

  const onSubmit = async (values: any) => {
    setLoading(true)
    const result = await fetch(
      `/api/tournament/${tournamentId}/matches/addToSchedule`,
      {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          tournamentId,
          date,
          locationId
        })
      }
    )
    setLoading(false)
    onUpdate()

    if (result?.error) {
      // console.error('Login failed:', result?.error)
    } else {
      setOpen(false)
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a match to {locationName} </DialogTitle>
          <DialogDescription>
            The selected match will be added to {locationName}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {!!matches?.length && (
              <SelectField
                control={form.control}
                label="Match"
                description=""
                placeholder=""
                name="matchId"
                items={matches.map(({ id, draw, participants }) => ({
                  text: `${draw.name} - ${participants[0]?.user?.name} vs ${participants[1]?.user?.name}`,
                  value: id?.toString()
                }))}
              />
            )}
            <FormLabel className="mt-3">Time of the match</FormLabel>
            <TimePicker date={date} setDate={setDate} />
            <DialogFooter>
              <Button isLoading={isLoading} type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
