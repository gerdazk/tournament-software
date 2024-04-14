'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { TextField } from '@/src/components/Input/TextField'
import { CalendarField } from '@/src/components/Input/CalendarField'
import { updateUserData } from '@/src/utils/users/updateUserData'
import { useState } from 'react'
import { ErrorMessage } from '@/src/components/Labels/ErrorMessage'
import { User } from '@prisma/client'

const FormSchema = z.object({
  email: z.string().email().min(2),
  name: z.string().min(1),
  date_of_birth: z.date()
})

type PersonalDataFormProps = {
  defaultValues: User
}

export const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  defaultValues
}) => {
  const [error, setError] = useState('')
  const [isSubmitted, setSubmitted] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...defaultValues,
      date_of_birth: new Date(defaultValues?.date_of_birth)
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await updateUserData({ ...defaultValues, ...data })
      setSubmitted(true)
    } catch (e) {
      setError('Failed to save data.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <TextField control={form.control} name="email" label="Email" />
        <TextField control={form.control} name="name" label="Name" />
        <CalendarField
          control={form.control}
          name="date_of_birth"
          label="Date of birth"
        />
        {isSubmitted ? (
          <div>Successfully updated user data</div>
        ) : (
          <Button type="submit">Submit</Button>
        )}
        {error && <ErrorMessage message={error} />}
      </form>
    </Form>
  )
}
