'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { TextField } from '@/src/components/Input/TextField'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { MultipleSelectField } from '@/src/components/Input/MultipleSelectField'

import { createDraw } from '../utils/createDraw'

export const CreateDrawDialog = ({ tournamentId }) => {
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: {}
  })

  const onSubmit = async ({ name, numOfTeams, ...rest }) => {
    console.log({ rest })
    // await createDraw({
    //   tournamentId,
    //   name,
    //   numOfTeams: Number(numOfTeams)
    // })
    // setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create new draw</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a draw</DialogTitle>
          <DialogDescription>
            Create a draw for this tournament.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TextField
              control={form.control}
              label="Name"
              description=""
              placeholder="Name of the draw"
              name="name"
            />
            <TextField
              control={form.control}
              label="Number of participants"
              description=""
              placeholder=""
              name="numOfTeams"
              type="number"
              min="1"
            />
            <MultipleSelectField
              control={form.control}
              label="Select players:"
              name="players"
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
