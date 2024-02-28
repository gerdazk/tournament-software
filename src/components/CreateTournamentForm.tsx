"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { useState } from "react"
import { Card } from "@/components/ui/card"

import { TextField } from "./Input/TextField"
import { DoubleCalendarField } from "./Input/DoubleCalendarField"
import { PageHeader } from "./PageHeader"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  })
})

export function CreateTournamentForm() {
  const [mainDrawDates, setMainDrawDates] = useState({})
  const [withdrawalDates, setWithdrawalDates] = useState({})
  const [registrationDates, setRegistrationDates] = useState({})
  const [qualifyingDates, setQualifyingDates] = useState({})
    const form = useForm<z.infer<typeof formSchema>>({
        // resolver: zodResolver(formSchema),
        defaultValues: {
          // username: ""
        }
      })
     
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }

  return (
    <div className="w-full">
<PageHeader title="Create new tournament" subtitle="Form for all tournament data" />
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
        
          <DoubleCalendarField date={mainDrawDates} setDate={setMainDrawDates} name="main_draw_dates" label="Main draw dates" />
          <DoubleCalendarField date={qualifyingDates} setDate={setQualifyingDates} name="qualifying_draw_dates" label="Qualifying draw dates" />
        
        <DoubleCalendarField date={withdrawalDates} setDate={setWithdrawalDates} name="withdrawal_dates" label="Withdrawal dates" />
        <DoubleCalendarField date={registrationDates} setDate={setRegistrationDates} name="registration_dates" label="Registration dates" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </Card>
    </div>
  )
}
