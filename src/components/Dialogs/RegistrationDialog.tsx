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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { TextField } from '@/src/components/Input/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { registerUser } from '@/src/utils/users/registerNewUser'
import { CalendarField } from '@/src/components/Input/CalendarField'

import { SelectField } from '../Input/SelectField'
import { ErrorMessage } from '../Labels/ErrorMessage'

const roleOptions = [
  {
    text: '...',
    value: null
  },
  {
    text: 'Referee',
    value: 'referee'
  },
  {
    text: 'Tournament organiser',
    value: 'organiser'
  }
]

const formSchema = z.object({
  email: z.string().email().min(1).max(191),
  name: z.string().min(5).max(191),
  password: z.string().min(8).max(191),
  date_of_birth: z.date(),
  proposed_role: z.string().optional()
})

export const RegistrationDialog = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      proposed_role: undefined
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const result = await registerUser({ ...values })
    setLoading(false)

    if (!result?.error) {
      setSuccessMessage('Sign up successful. You can now log in.')
    } else {
      setErrorMessage('Sign up failed.')
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>Create an account for login</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TextField
              control={form.control}
              label="Name"
              description=""
              placeholder=""
              name="name"
            />
            <CalendarField
              control={form.control}
              name="date_of_birth"
              label="Date of birth"
              description=""
              defaultValue="1999-01-01"
            />
            <TextField
              control={form.control}
              label="Email"
              description=""
              placeholder=""
              name="email"
              type="email"
            />
            <TextField
              control={form.control}
              label="Password"
              description=""
              placeholder=""
              name="password"
              type="password"
            />
            <SelectField
              control={form.control}
              label="Do you want to register as one of these roles?"
              name="proposed_role"
              description="You will need approval from administrator for this action"
              items={roleOptions}
            />
            <DialogFooter>
              {successMessage ? (
                <div>{successMessage}</div>
              ) : (
                <Button isLoading={isLoading} type="submit">
                  Submit
                </Button>
              )}
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
