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
  email: z.string().email().min(2).max(191),
  name: z.string().min(1).max(191),
  date_of_birth: z.date(),
  password: z
    .string()
    .optional()
    .refine(password => !password || password.length >= 8, {
      message: 'Password must be at least 8 characters long'
    }),
  passwordRepeat: z
    .string()
    .optional()
    .refine(password => !password || password.length >= 8, {
      message: 'Password must be at least 8 characters long'
    })
})

type PersonalDataFormProps = {
  defaultValues: User
}

export const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  defaultValues: { date_of_birth, name, email, id }
}) => {
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
      email,
      date_of_birth: new Date(date_of_birth),
      password: undefined,
      passwordRepeat: undefined
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setError('')
    setLoading(true)
    const { password, passwordRepeat, ...dataRest } = data
    if (password && passwordRepeat !== password) {
      setError('Passwords must match')
      setLoading(false)
      return
    }
    const res = await updateUserData({
      ...dataRest,
      id,
      password
    })

    if (res?.error) {
      setError('Failed to save data.')
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <TextField control={form.control} name="email" label="Email" />
        <TextField control={form.control} name="name" label="Name" />
        <TextField
          control={form.control}
          name="password"
          label="Password"
          type="password"
        />
        <TextField
          control={form.control}
          name="passwordRepeat"
          label="Repeat password"
          type="password"
        />
        <CalendarField
          control={form.control}
          name="date_of_birth"
          label="Date of birth"
        />
        {isSubmitted ? (
          <div>Successfully updated user data</div>
        ) : (
          <Button isLoading={isLoading} type="submit">
            Submit
          </Button>
        )}
        {error && <ErrorMessage message={error} />}
      </form>
    </Form>
  )
}
