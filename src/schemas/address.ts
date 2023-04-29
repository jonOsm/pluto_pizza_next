import { z } from "zod"
export const createInput = z
  .object({
    label: z.string().optional(),
    unit: z.string().optional(),
    street: z.string().min(3),
    province: z.string().min(2),
    postalCode: z.string().min(6),
    phoneNumber: z.string(),
  })
  .strict()
