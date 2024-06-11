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
import { Location } from '@prisma/client'
import { useState } from 'react'

type CreateLocationDialogProps = {
  tournamentId: number
  open: boolean
  onOpenChange: (state: boolean) => void
}

export const CreateLocationDialog: React.FC<CreateLocationDialogProps> = ({
  tournamentId,
  open,
  onOpenChange
}) => {
  const form = useForm({
    defaultValues: {}
  })
  const [isLoading, setLoading] = useState(false)

  const onSubmit = async (props: Partial<Location>) => {
    setLoading(true)
    await fetch(`/api/tournament/${tournamentId}/locations`, {
      method: 'POST',
      body: JSON.stringify(props)
    })
    setLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="self-end">
        <Button variant="outline">Create new location</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a location</DialogTitle>
          <DialogDescription>
            Create a location for this tournament.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TextField
              control={form.control}
              label="Name"
              description=""
              placeholder="Name of the location (e.g. Court 2)"
              name="name"
            />
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
