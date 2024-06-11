import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email().min(1).max(191),
  password: z.string().min(8).max(191)
})
