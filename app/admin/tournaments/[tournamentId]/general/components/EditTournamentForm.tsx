'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/src/components/Input/TextField'
import { DoubleCalendarField } from '@/src/components/Input/DoubleCalendarField'
import { PageHeader } from '@/src/components/PageHeader'
import { SuccessMessage } from '@/src/components/Labels/SuccessMessage'
import { ErrorMessage } from '@/src/components/Labels/ErrorMessage'
import { editTournament } from '@/src/utils/tournaments/editTournament'
import { SwitchField } from '@/src/components/Input/SwitchField'
import { ConfirmationDialog } from '@/src/components/Dialogs/ConfirmationDialog'

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(''),
  no_of_courts: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  address_additional_info: z.string(),
  address_name: z.string().min(1),
  is_visible: z.boolean(),
  is_registration_open: z.boolean()
})

export function EditTournamentForm({ tournament }) {
  const [mainDrawDates, setMainDrawDates] = useState({
    from: tournament.start_date || '',
    to: tournament.end_date || ''
  })
  const [isLoading, setLoading] = useState(false)
  const [isDeleteLoading, setDeleteLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDeleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...tournament,
      no_of_courts: tournament.no_of_courts?.toString()
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const start_date = mainDrawDates?.from
    const end_date = mainDrawDates?.to
    const no_of_courts = Number(values.no_of_courts)
    const areValuesValid = no_of_courts && end_date && start_date

    if (!areValuesValid) {
      setErrorMessage(
        'Failed to edit tournament. Please enter valid date for tournament start and end.'
      )
      return
    }

    const data = await editTournament({
      ...values,
      start_date,
      end_date,
      no_of_courts,
      id: tournament.id
    })
    setLoading(false)

    if (data.success) {
      setErrorMessage('')
      setSuccessMessage('Tournament updated successfully.')
    } else {
      setErrorMessage('Failed to edit tournament.')
    }
  }

  const handleDelete = async () => {
    try {
      setDeleteLoading(true)
      await fetch(`/api/tournament?id=${tournament.id}`, {
        method: 'DELETE'
      })
      setDeleteConfirmationDialogOpen(false)
    } catch (e) {
      setErrorMessage('Failed to delete tournament.')
    }
    setDeleteLoading(false)
  }

  return (
    <>
      <div className="w-full">
        <PageHeader
          title="Edit the tournament"
          subtitle="Edit all tournament data"
          buttonText="Delete tournament"
          buttonVariant="destructive"
          onButtonClick={() => setDeleteConfirmationDialogOpen(true)}
          isSmall
        />
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
            <SwitchField
              control={form.control}
              name="is_visible"
              title="Tournament visibility"
              description="Make tournament visible/invisible to other users"
            />
            <SwitchField
              control={form.control}
              name="is_registration_open"
              title="Open registration"
              description="Open tournament registration. Users will be able to register."
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
      </div>
      {isDeleteConfirmationDialogOpen && (
        <ConfirmationDialog
          onSubmit={handleDelete}
          onCancel={() => setDeleteConfirmationDialogOpen(false)}
          title="Are you sure you want to delete this tournament?"
          subtitle="This action can not be undone."
          isOpen={isDeleteConfirmationDialogOpen}
          onOpenChange={setDeleteConfirmationDialogOpen}
          isLoading={isDeleteLoading}
        />
      )}
    </>
  )
}
