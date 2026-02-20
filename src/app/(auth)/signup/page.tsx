'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, type SignupFormData } from '@/lib/validators'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  async function onSubmit(data: SignupFormData) {
    // TODO: integrate with signup API
    console.log('Signup:', data)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-2xl text-charcoal">
          Create your account
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Start your healthy meal prep journey
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-charcoal"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jane Smith"
              className={cn(
                'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage',
                errors.name && 'border-red-400 focus:ring-red-200'
              )}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-charcoal"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={cn(
                'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage',
                errors.email && 'border-red-400 focus:ring-red-200'
              )}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-charcoal"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Min 8 chars, uppercase, number, special"
              className={cn(
                'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage',
                errors.password && 'border-red-400 focus:ring-red-200'
              )}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-charcoal"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              className={cn(
                'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage',
                errors.confirmPassword && 'border-red-400 focus:ring-red-200'
              )}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Accept Terms */}
          <div className="space-y-1.5">
            <label className="flex items-start gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-sage"
                {...register('acceptTerms')}
              />
              <span>
                I agree to the{' '}
                <Link
                  href="/policies/terms"
                  className="font-medium text-sage hover:underline"
                  target="_blank"
                >
                  Terms &amp; Conditions
                </Link>{' '}
                and{' '}
                <Link
                  href="/policies/privacy"
                  className="font-medium text-sage hover:underline"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-xs text-red-500">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sage text-white hover:bg-sage/90"
          >
            {isSubmitting ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-sage hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
