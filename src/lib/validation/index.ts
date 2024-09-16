import { z } from "zod"

export const SignupValidation = z.object({
  firstName: z.string().min(2, { message: 'Too Short' }).max(50),
  lastName: z.string().min(2, { message: 'Too Short' }).max(50),
  username: z.string().min(2, { message: 'Too Short' }).max(50),
  email: z.string().email(),
  password: z.string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[\W_]/, { message: 'Password must contain at least one special character' }),
  password2: z.string()
      .min(8, { message: 'Confirm Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Confirm Password must contain at least one uppercase letter' })
      .regex(/[\W_]/, { message: 'Confirm Password must contain at least one special character' }),
}).refine(data => data.password === data.password2, {
  message: "Passwords don't match",
  path: ['password2'], // Path to the field to display the error
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[\W_]/, { message: 'Password must contain at least one special character' }),
});


export const ResetPinValidation = z.object({
  currentPin: z.string().min(4, { message: 'Pin must be at least 4 characters' }),
  newPin: z.string()
    .min(4, { message: 'Pin must be at least 4 characters' })
    .regex(/^\d+$/, { message: 'Pin must only contain numbers' }),
  confirmNewPin: z.string()
    .min(4, { message: 'Pin must be at least 4 characters' })
    .regex(/^\d+$/, { message: 'Pin must only contain numbers' }),
}).refine(data => data.newPin === data.confirmNewPin, {
  message: "New Pin and Confirm New Pin must match",
  path: ['confirmNewPin'], // Point the error to confirmNewPin field
});