import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { z } from 'zod'
import { SelectField } from '@/src/components/Input/SelectField'
import { ErrorMessage } from '@/src/components/Labels/ErrorMessage'

const formSchema = z.object({
  memberId: z.string().min(1).max(191)
})

export const AddStaffMemberDialog = ({
  open,
  onOpenChange,
  tournamentId,
  players = [],
  onUpdate
}) => {
  const form = useForm({
    defaultValues: {},
    resolver: zodResolver(formSchema)
  })
  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (props: Partial<Location>) => {
    setErrorMessage('')
    setLoading(true)

    const res = await fetch(`/api/tournament/${tournamentId}/staff`, {
      method: 'POST',
      body: JSON.stringify(props)
    })

    if (res?.ok) {
      setLoading(false)
      onOpenChange(false)
      onUpdate()
    } else {
      setLoading(false)
      setErrorMessage('Failed to save.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new member to your tournament staff.</DialogTitle>
          <DialogDescription>
            This member will be allowed to edit tournament score.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <SelectField
              control={form.control}
              name="memberId"
              label="New member:"
              items={players.map(({ name, id }) => ({
                text: name,
                value: id?.toString()
              }))}
            />
            <DialogFooter>
              <Button isLoading={isLoading} type="submit">
                Submit
              </Button>
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
