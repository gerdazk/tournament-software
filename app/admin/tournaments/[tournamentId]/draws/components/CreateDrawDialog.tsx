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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createDraw } from '../utils/createDraw'

const drawSchema = z.object({
  name: z.string().min(1).max(191),
  numOfTeams: z.string().min(1).max(191)
})

export const CreateDrawDialog = ({
  tournamentId,
  onUpdate
}: {
  tournamentId: number
  onUpdate: () => void
}) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const form = useForm({
    resolver: zodResolver(drawSchema),
    defaultValues: {}
  })

  const onSubmit = async ({ name, numOfTeams }) => {
    setLoading(true)
    try {
      await createDraw({
        tournamentId,
        name,
        numOfTeams: Number(numOfTeams)
      })
      setOpen(false)
      onUpdate()
    } catch {
      setError('Failed to create a draw.')
    }
    setLoading(false)
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
