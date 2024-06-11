import { z } from 'zod'

export const tournamentSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(''),
  no_of_courts: z.number().min(0),
  country: z.string().min(1),
  city: z.string().min(1),
  address_additional_info: z.string(),
  address_name: z.string().min(1),
  is_visible: z.boolean(),
  is_registration_open: z.boolean()
})
