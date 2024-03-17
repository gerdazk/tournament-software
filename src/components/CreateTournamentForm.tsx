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

import { createTournament } from "../utils/createTournament"

import { TextField } from "./Input/TextField"
import { DoubleCalendarField } from "./Input/DoubleCalendarField"
import { PageHeader } from "./PageHeader"


const formSchema = z.object({
  name: z.string(),
  description: z.string().default(""),
  no_of_courts: z.string(),
  country: z.string(),
  city: z.string(),
  address_additional_info: z.string(),
  address_name: z.string()
})

export function CreateTournamentForm() {
  const [mainDrawDates, setMainDrawDates] = useState({from: '', to: ''})
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
      })
     
      function onSubmit(values: z.infer<typeof formSchema>) {
        const start_date = mainDrawDates?.from
        const end_date = mainDrawDates?.to

        createTournament({...values, start_date, end_date, no_of_courts: Number(values.no_of_courts)})
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
        
          <DoubleCalendarField date={mainDrawDates} setDate={setMainDrawDates} name="dates" label="Tournament date" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </Card>
    </div>
  )
}
