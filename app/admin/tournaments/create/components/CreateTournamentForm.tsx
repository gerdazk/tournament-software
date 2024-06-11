'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTournament } from '@/src/utils/tournaments/createTournament'
import { TextField } from '@/src/components/Input/TextField'
import { DoubleCalendarField } from '@/src/components/Input/DoubleCalendarField'
import { PageHeader } from '@/src/components/PageHeader'
import { SuccessMessage } from '@/src/components/Labels/SuccessMessage'
import { ErrorMessage } from '@/src/components/Labels/ErrorMessage'
import { useSession } from 'next-auth/react'

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(''),
  no_of_courts: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  address_additional_info: z.string(),
  address_name: z.string().min(1)
})

export function CreateTournamentForm() {
  const [mainDrawDates, setMainDrawDates] = useState({ from: '', to: '' })
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const { data: sessionData } = useSession()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const start_date = mainDrawDates?.from
    const end_date = mainDrawDates?.to
    const no_of_courts = Number(values.no_of_courts)
    const areValuesValid = no_of_courts && end_date && start_date

    if (!areValuesValid) {
      setErrorMessage(
        'Failed to create tournament. Please enter valid date for tournament start and end.'
      )
      return
    }

    const data = await createTournament({
      ...values,
      start_date,
      end_date,
      no_of_courts,
      organizerId: sessionData?.user?.id
    })

    setLoading(false)

    if (data.success) {
      setErrorMessage('')
      setSuccessMessage('Tournament created successfully.')
    } else {
      setErrorMessage('Failed to create tournament.')
    }
  }

  return (
    <div className="w-full">
      <PageHeader
        title="Create new tournament"
        subtitle="Form for all tournament data"
      />
      <Card className="w-full p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TextField
              control={form.control}
              label="Name"
              description="Display name of the tournament"
              placeholder=""
              name="name"
            />
            <TextField
              control={form.control}
              label="Description"
              description="Display name of the tournament"
              placeholder=""
              name="description"
            />
            <TextField
              control={form.control}
              label="No of courts"
              description=""
              placeholder=""
              name="no_of_courts"
              type="number"
              min="1"
            />
            <TextField
              control={form.control}
              label="Country"
              description=""
              placeholder=""
              name="country"
            />
            <TextField
              control={form.control}
              label="City"
              description=""
              placeholder=""
              name="city"
            />
            <TextField
              control={form.control}
              label="Additional address info"
              description=""
              placeholder=""
              name="address_additional_info"
            />
            <TextField
              control={form.control}
              label="Venue name"
              description=""
              placeholder=""
              name="address_name"
            />

            <DoubleCalendarField
              date={mainDrawDates}
              setDate={setMainDrawDates}
              name="dates"
              label="Tournament date"
            />
            {successMessage ? (
              <SuccessMessage message={successMessage} />
            ) : (
              <Button isLoading={isLoading} type="submit">
                Submit
              </Button>
            )}
            {errorMessage && <ErrorMessage message={errorMessage} />}
          </form>
        </Form>
      </Card>
    </div>
  )
}
