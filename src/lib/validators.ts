import { z } from 'zod';

/**
 * Reusable Zod validators for form validation
 * Can be used with react-hook-form resolver
 */

// Email validation
export const emailSchema = z
  .string({ required_error: 'Email is required' })
  .email('Invalid email address')
  .toLowerCase();

// Password validation - at least 8 chars, 1 uppercase, 1 number, 1 special char
export const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[!@#$%^&*]/,
    'Password must contain at least one special character (!@#$%^&*)'
  );

// Strong password (for signup)
export const strongPasswordSchema = passwordSchema;

// Weak password (for password field)
export const weakPasswordSchema = z
  .string({ required_error: 'Password is required' })
  .min(6, 'Password must be at least 6 characters');

// Name validation
export const nameSchema = z
  .string({ required_error: 'Name is required' })
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must not exceed 50 characters')
  .regex(
    /^[a-zA-Z\s'-]+$/,
    'Name can only contain letters, spaces, hyphens, and apostrophes'
  );

// Phone validation
export const phoneSchema = z
  .string({ required_error: 'Phone is required' })
  .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number');

// URL validation
export const urlSchema = z.string().url('Invalid URL');

// Search query validation
export const searchSchema = z
  .string()
  .min(1, 'Search query required')
  .max(100, 'Search query too long');

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Common form schemas

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: strongPasswordSchema,
  confirmPassword: z.string({ required_error: 'Confirm password is required' }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: strongPasswordSchema,
  confirmPassword: z.string({ required_error: 'Confirm password is required' }),
  token: z.string({ required_error: 'Reset token is required' }),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const updateProfileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

// Helper function to get field error message
export function getFieldError(
  errors: z.ZodFormattedError<any>,
  fieldPath: string
): string | undefined {
  const parts = fieldPath.split('.');
  let current: any = errors;

  for (const part of parts) {
    if (current[part]) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return current._errors?.[0];
}

// ---------------------------------------------------------------------------
// Fresh Prep Sydney — Domain Validators
// ---------------------------------------------------------------------------

export const addressSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  street: z.string().min(3, 'Street address is required').max(200),
  unit: z.string().max(50).optional(),
  suburb: z.string().min(2, 'Suburb is required').max(100),
  state: z.string().default('NSW'),
  postcode: z.string().regex(/^\d{4}$/, 'Must be a valid 4-digit postcode'),
  phone: z.string().optional(),
  label: z.string().max(50).optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export const cartItemSchema = z.object({
  mealId: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
});

export type CartItemFormData = z.infer<typeof cartItemSchema>;

export const checkoutSchema = z.object({
  addressId: z.string().min(1, 'Please select a delivery address'),
  deliveryDate: z.string().min(1, 'Please select a delivery date'),
  deliverySlot: z.enum(['Morning', 'Evening']).optional(),
  notes: z.string().max(500).optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const postcodeCheckSchema = z.object({
  postcode: z.string().regex(/^\d{4}$/, 'Enter a valid 4-digit postcode'),
});

export type PostcodeCheckFormData = z.infer<typeof postcodeCheckSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

export const mealSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().min(10).max(2000),
  shortDescription: z.string().max(200).optional(),
  price: z.number().min(0),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  ingredients: z.string().min(5),
  reheatingInstructions: z.string().optional(),
  servingSize: z.string().optional(),
  shelfLife: z.string().optional(),
  nutrition: z.object({
    calories: z.number().int().min(0),
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
    fibre: z.number().min(0).optional(),
    sodium: z.number().min(0).optional(),
    sugar: z.number().min(0).optional(),
  }),
  allergens: z.array(z.string()).optional(),
});

export type MealFormData = z.infer<typeof mealSchema>;

export const recipeSchema = z.object({
  prepTime: z.number().int().min(0).optional(),
  cookTime: z.number().int().min(0).optional(),
  servings: z.number().int().min(1).optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  ingredients: z.array(z.object({
    amount: z.string().min(1),
    item: z.string().min(1),
  })).min(1, 'At least one ingredient is required'),
  instructions: z.array(z.object({
    step: z.number().int().min(1),
    text: z.string().min(1),
  })).min(1, 'At least one instruction is required'),
  calories: z.number().int().min(0).optional(),
  protein: z.number().min(0).optional(),
  carbs: z.number().min(0).optional(),
  fat: z.number().min(0).optional(),
  storageInstructions: z.string().optional(),
  makeAheadTips: z.string().optional(),
  mealPrepNotes: z.string().optional(),
  cuisine: z.string().optional(),
  recipeCategory: z.string().optional(),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;

export const blogPostSchema = z.object({
  title: z.string().min(3).max(200),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(50),
  metaDescription: z.string().max(160).optional(),
  featuredImage: z.string().optional(),
  featuredImageAlt: z.string().max(200).optional(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  recipe: recipeSchema.optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
