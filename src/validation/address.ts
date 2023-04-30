import { z } from "zod"
export const createValidation = z.object({
  label: z.string().optional(),
  unit: z.string().optional(),
  street: z.string().min(3),
  province: z.string().min(2),
  postalCode: z.string().min(6),
  phoneNumber: z.string(),
})

export const editValidation = createValidation.extend({ id: z.string() })
