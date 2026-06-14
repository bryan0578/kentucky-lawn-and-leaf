import { z } from 'zod'

export const QUOTE_SERVICES = [
  'Lawn Care',
  'Leaf Removal',
  'Landscaping',
  'Seasonal Cleanup',
  'Mulch Installation',
  'Trimming & Edging',
  'Other',
] as const

export const PROPERTY_TYPES = [
  'Residential',
  'Commercial',
  'Rental Property',
  'Other',
] as const

export const CONTACT_METHODS = ['Phone', 'Text', 'Email'] as const

const phonePattern = /^[\d\s().+-]{10,}$/

const quoteRequestBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name.')
    .max(100, 'Name must be 100 characters or fewer.'),
  phone: z.string().trim(),
  email: z.string().trim(),
  addressOrZip: z
    .string()
    .trim()
    .min(1, 'Please enter your address or ZIP code.')
    .max(200, 'Address must be 200 characters or fewer.'),
  serviceNeeded: z.enum(QUOTE_SERVICES, {
    errorMap: () => ({ message: 'Please select a service.' }),
  }),
  propertyType: z.enum(PROPERTY_TYPES).optional(),
  preferredContactMethod: z.enum(CONTACT_METHODS, {
    errorMap: () => ({ message: 'Please select a contact method.' }),
  }),
  message: z
    .string()
    .trim()
    .max(1000, 'Message must be 1000 characters or fewer.')
    .optional()
    .or(z.literal('')),
})

export const quoteRequestSchema = quoteRequestBaseSchema.superRefine(
  (data, ctx) => {
    if (data.preferredContactMethod === 'Email') {
      if (!data.email) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter your email address.',
          path: ['email'],
        })
      } else if (!z.string().email().safeParse(data.email).success) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter a valid email address.',
          path: ['email'],
        })
      }
    }

    if (
      data.preferredContactMethod === 'Phone' ||
      data.preferredContactMethod === 'Text'
    ) {
      if (!data.phone) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter your phone number.',
          path: ['phone'],
        })
      } else if (!phonePattern.test(data.phone)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter a valid phone number.',
          path: ['phone'],
        })
      }
    }
  },
)

export type QuoteRequestValues = z.infer<typeof quoteRequestSchema>

export const quoteRequestDefaultValues: QuoteRequestValues = {
  name: '',
  phone: '',
  email: '',
  addressOrZip: '',
  serviceNeeded: 'Lawn Care',
  propertyType: 'Residential',
  preferredContactMethod: 'Phone',
  message: '',
}
