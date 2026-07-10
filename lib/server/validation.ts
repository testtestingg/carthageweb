import { z } from "zod"

const localizedProductText = z.object({
  name: z.string().trim().max(200),
  subtitle: z.string().trim().max(300),
  description: z.string().trim().max(5000),
  features: z.array(z.string().trim().min(1).max(300)).max(20),
})

export const productInputSchema = z.object({
  id: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "ID must be a lowercase slug (letters, numbers, hyphens)"),
  price: z.number().positive().max(100000),
  image: z
    .string()
    .trim()
    .min(1)
    .max(500)
    .regex(/^\/[^\s]*$/, "Image must be a site-relative path"),
  categoryId: z.string().trim().min(1).max(100),
  badge: z.enum(["bestseller", "limited", "new"]).optional(),
  keywords: z.array(z.string().trim().min(1).max(100)).max(30),
  inStock: z.boolean(),
  featured: z.boolean(),
  translations: z.object({
    en: localizedProductText.refine((t) => t.name.length > 0, {
      message: "English name is required",
      path: ["name"],
    }),
    fr: localizedProductText,
    de: localizedProductText,
  }),
})

export type ProductInput = z.infer<typeof productInputSchema>

const localizedCategoryText = z.object({
  name: z.string().trim().max(200),
  description: z.string().trim().max(1000),
})

export const categoryInputSchema = z.object({
  id: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "ID must be a lowercase slug (letters, numbers, hyphens)"),
  icon: z.string().trim().min(1).max(50),
  translations: z.object({
    en: localizedCategoryText.refine((t) => t.name.length > 0, {
      message: "English name is required",
      path: ["name"],
    }),
    fr: localizedCategoryText,
    de: localizedCategoryText,
  }),
})

export type CategoryInput = z.infer<typeof categoryInputSchema>

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(500),
  newPassword: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .max(500)
    .refine((p) => /[a-zA-Z]/.test(p) && /[0-9]/.test(p), {
      message: "Password must contain letters and numbers",
    }),
})

export const loginSchema = z.object({
  username: z.string().trim().min(1).max(200),
  password: z.string().min(1).max(500),
})
