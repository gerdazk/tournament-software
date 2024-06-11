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
import { normalizeDate } from '@/src/utils/normalizeDate'
import { Location } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { ErrorMessage } from '@/src/components/Labels/ErrorMessage'

type EditMatchAssignmentDialogProps = {
  isOpen: boolean
  setOpen: (val: boolean) => void
  tournamentId: number
  date: Date
  matchId: number
  dates: Date[]
  initialLocationId: number
}

export const EditMatchAssignmentDialog: React.FC<
  EditMatchAssignmentDialogProps
> = ({
  isOpen,
  setOpen,
  tournamentId,
  date,
  matchId,
  dates,
  initialLocationId,
  onUpdate
}) => {
  const form = useForm({
    defaultValues: {}
  })

  const [locations, setLocations] = useState<Location[]>([])
  const [startTime, setStartTime] = useState(new Date(date))
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getLocations = async () => {
    const res = await fetch(`/api/tournament/${tournamentId}/locations`)
    const body = await res.json()
    body?.locations && setLocations(body.locations)
  }

  useEffect(() => {
    getLocations()
  }, [isOpen])

  const onSubmit = async ({ day, locationId }) => {
    setLoading(true)
    if (
      !(day || normalizeDate(date)) ||
      !startTime ||
      !(locationId || initialLocationId)
    ) {
      setError('Please fill all form fields')
      setLoading(false)
      return
    }
    const dateFromDay = dayjs(day || normalizeDate(date))
    const hours = startTime.getHours()
    const minutes = startTime.getMinutes()

    const combinedDate = dateFromDay
      .hour(hours)
      .minute(minutes)
      .second(0)
      .millisecond(0)

    const result = await fetch(
      `/api/tournament/${tournamentId}/matches/addToSchedule`,
      {
        method: 'POST',
        body: JSON.stringify({
          locationId: locationId || initialLocationId,
          tournamentId,
          matchId,
          date: combinedDate
        })
      }
    )

    setLoading(false)
    onUpdate()

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
                defaultValue={initialLocationId?.toString()}
                items={locations.map(({ id, name }) => ({
                  text: name,
                  value: id?.toString()
                }))}
              />
            )}
            {!!dates?.length && (
              <SelectField
                control={form.control}
                label="Day of the match"
                description=""
                placeholder=""
                name="day"
                defaultValue={normalizeDate(date)}
                items={dates.map(date => ({
                  text: normalizeDate(date),
                  value: normalizeDate(date)
                }))}
              />
            )}
            <FormLabel className="mt-3">Time of the match</FormLabel>
            <TimePicker date={startTime} setDate={setStartTime} />
            <DialogFooter className="flex flex-col sm:flex sm:flex-col items-end gap-2">
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
