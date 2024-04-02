"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { PageHeader } from "@/src/components/PageHeader"
import { TextField } from "@/src/components/Input/TextField"
import { DoubleCalendarField } from "@/src/components/Input/DoubleCalendarField"
import { SuccessMessage } from "@/src/components/Labels/SuccessMessage"
import { ErrorMessage } from "@/src/components/Labels/ErrorMessage"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { TrashIcon } from "@radix-ui/react-icons"
import { SwitchField } from "@/src/components/Input/SwithField"
import { deleteTournament } from "@/src/utils/deleteTournament"


const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(""),
  no_of_courts: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  address_additional_info: z.string(),
  address_name: z.string().min(1)
})

export function EditTournamentForm({ defaultValues }: { defaultValues: any }) {
    console.log({defaultValues})
  const [mainDrawDates, setMainDrawDates] = useState({from: '', to: ''})
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>) {
        const start_date = mainDrawDates?.from
        const end_date = mainDrawDates?.to
        const no_of_courts = Number(values.no_of_courts)
        const areValuesValid = no_of_courts && end_date && start_date

        if(!areValuesValid) {
          setErrorMessage('Failed to create tournament. Please enter valid date for tournament start and end.')
          return
        }

        // const data = await createTournament({...values, start_date, end_date, no_of_courts})

        // if(data.success) {
        //   setErrorMessage('')
        //   setSuccessMessage('Tournament created successfully.')
        // } else {
        //   setErrorMessage('Failed to create tournament.')
        // }
      }

  return (
    <div className="w-full">
<PageHeader title="Edit tournament" subtitle="Form for all tournament data" />
      <Card className="w-full p-8">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextField control={form.control} label="Name" description="Display name of the tournament" placeholder="" name="name" />
        <TextField control={form.control} label="Description" description="Display name of the tournament" placeholder="" name="description" />
        <TextField control={form.control} label="No of courts" description="" placeholder="" name="no_of_courts" type="number" min="1" />
        <TextField control={form.control} label="Country" description="" placeholder="" name="country" />
        <TextField control={form.control} label="City" description="" placeholder="" name="city" />
        <TextField control={form.control} label="Additional address info" description="" placeholder="" name="address_additional_info"  />
        <TextField control={form.control} label="Venue name" description="" placeholder="" name="address_name" />
        
          <DoubleCalendarField date={mainDrawDates} setDate={setMainDrawDates} name="dates" label="Tournament date" />

          <Separator />
          <Label>Optional parameters</Label>
          <TextField control={form.control} label="Maximum number of participants" description="Registration will be closed when this number is reached" placeholder="" name="no_of_participants" type="number" min="1" />
          <SwitchField name="is_visible" title="Is tournament visible for users" control={form.control} />
          <SwitchField name="is_registration_open" title="Is registration open" control={form.control} />
          <div className="flex gap-3" onClick={() => deleteTournament({id: 1})}>
          <TrashIcon className="w-6 h-6" />
            Delete tournament
          </div>
          <Separator />
        {successMessage ? <SuccessMessage message={successMessage} /> : <Button type="submit">Submit</Button>}
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </form>
    </Form>
    </Card>
    </div>
  )
}