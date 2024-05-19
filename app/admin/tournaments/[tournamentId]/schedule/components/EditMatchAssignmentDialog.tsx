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
import { Location } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type EditMatchAssignmentDialogProps = {
  isOpen: boolean
  setOpen: (val: boolean) => void
  tournamentId: number
  date: Date
  matchId: number
}

// TODO: add date field and combine with time field somehow?
// TODO: should accept matchId as a prop
// TODO: move to appropriate place in draws

export const EditMatchAssignmentDialog: React.FC<
  EditMatchAssignmentDialogProps
> = ({ isOpen, setOpen, tournamentId, date: tournamentDate, matchId }) => {
  const form = useForm({
    defaultValues: {}
  })

  const [locations, setLocations] = useState<Location[]>([])
  const [date, setDate] = useState(new Date(tournamentDate))

  const getLocations = async () => {
    const res = await fetch(`/api/tournament/${tournamentId}/locations`)
    const body = await res.json()
    body?.locations && setLocations(body.locations)
  }

  useEffect(() => {
    getLocations()
  }, [isOpen])

  const onSubmit = async (values: any) => {
    const result = await fetch(
      `/api/tournament/${tournamentId}/matches/addToSchedule`,
      {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          tournamentId,
          matchId,
          date
        })
      }
    )

    if (result?.error) {
      console.error('Submit failed:', result?.error)
    } else {
      setOpen(false)
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit match </DialogTitle>
          <DialogDescription>
            Edit match placement in schedule
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {!!locations?.length && (
              <SelectField
                control={form.control}
                label="Location"
                description=""
                placeholder=""
                name="locationId"
                items={locations.map(({ id, name }) => ({
                  text: name,
                  value: id?.toString()
                }))}
              />
            )}
            <FormLabel className="mt-3">Time of the match</FormLabel>
            <TimePicker date={date} setDate={setDate} />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
