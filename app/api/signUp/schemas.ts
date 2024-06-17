import { z } from 'zod'

export const registrationSchema = z.object({
  email: z.string().email().min(1).max(191),
  name: z.string().min(5).max(191),
  password: z.string().min(8).max(191),
  date_of_birth: z.string(),
  proposed_role: z.string().optional()
})
