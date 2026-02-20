'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Check, Sparkles, Mail } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Quiz data                                                         */
/* ------------------------------------------------------------------ */

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  multiSelect?: boolean
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your primary goal?",
    options: ['Weight Loss', 'Muscle Gain', 'Healthy Eating', 'Convenience'],
  },
  {
    id: 2,
    question: 'Any dietary requirements?',
    options: ['None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
    multiSelect: true,
  },
  {
    id: 3,
    question: 'How many meals per week?',
    options: ['3-5', '6-8', '9-12', '13+'],
  },
  {
    id: 4,
    question: 'What is your activity level?',
    options: ['Sedentary', 'Moderate', 'Active', 'Very Active'],
  },
]

interface MealSuggestion {
  name: string
  description: string
  category: string
  calories: number
  price: string
  slug: string
}

const recommendedMeals: MealSuggestion[] = [
  {
    name: 'Lemon Herb Chicken & Greens',
    description:
      'Zesty grilled chicken with broccolini, spinach & sweet potato.',
    category: 'High Protein',
    calories: 420,
    price: '$14.95',
    slug: 'lemon-herb-chicken-greens',
  },
  {
    name: 'Teriyaki Salmon Bowl',
    description:
      'Teriyaki-glazed salmon on jasmine rice with edamame & pickled ginger.',
    category: 'High Protein',
    calories: 510,
    price: '$16.95',
    slug: 'teriyaki-salmon-bowl',
  },
  {
    name: 'Mediterranean Lamb Bowl',
    description:
      'Slow-cooked lamb on herbed couscous with tzatziki & roasted veg.',
    category: 'High Protein',
    calories: 540,
    price: '$17.95',
    slug: 'mediterranean-lamb-bowl',
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitting, setEmailSubmitting] = useState(false)
  const [emailError, setEmailError] = useState('')

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const selectedForCurrent = answers[question?.id] ?? []

  function selectOption(option: string) {
    const qId = question.id

    if (question.multiSelect) {
      setAnswers((prev) => {
        const current = prev[qId] ?? []
        if (option === 'None') {
          return { ...prev, [qId]: ['None'] }
        }
        const withoutNone = current.filter((o) => o !== 'None')
        const isAlreadySelected = withoutNone.includes(option)
        return {
          ...prev,
          [qId]: isAlreadySelected
            ? withoutNone.filter((o) => o !== option)
            : [...withoutNone, option],
        }
      })
    } else {
      setAnswers((prev) => ({ ...prev, [qId]: [option] }))
    }
  }

  function isSelected(option: string) {
    return selectedForCurrent.includes(option)
  }

  function canContinue() {
    return selectedForCurrent.length > 0
  }

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1)
    } else {
      // Show email capture step before results
      setShowEmailCapture(true)
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1)
    }
  }

  function handleRestart() {
    setAnswers({})
    setCurrentQuestion(0)
    setShowResults(false)
    setShowEmailCapture(false)
    setEmail('')
    setEmailError('')
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEmailError('')

    if (!email.trim()) {
      setEmailError('Please enter your email address.')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }

    setEmailSubmitting(true)
    try {
      // Submit email + quiz answers to newsletter API
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'quiz',
          quizAnswers: answers,
        }),
      })
    } catch {
      // Silently continue — don't block results for API failure
    } finally {
      setEmailSubmitting(false)
      setShowEmailCapture(false)
      setShowResults(true)
    }
  }

  function handleSkipEmail() {
    setShowEmailCapture(false)
    setShowResults(true)
  }

  /* ---------- Email capture view ---------- */
  if (showEmailCapture) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/10">
            <Mail className="h-7 w-7 text-sage" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Almost There!
          </h1>
          <p className="mt-2 text-charcoal/60">
            Enter your email to see your personalised meal recommendations and
            get a <span className="font-semibold text-sage">10% discount</span>{' '}
            on your first order.
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="mt-8">
          <div>
            <label
              htmlFor="quiz-email"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Email Address
            </label>
            <input
              id="quiz-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoFocus
              className="w-full rounded-lg border border-border px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
            />
            {emailError && (
              <p className="mt-1.5 text-xs text-red-500">{emailError}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={emailSubmitting}
            className="mt-4 w-full bg-sage py-3 text-white hover:bg-sage/90"
          >
            {emailSubmitting ? 'Submitting...' : 'See My Results'}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>

          <button
            type="button"
            onClick={handleSkipEmail}
            className="mt-3 block w-full text-center text-sm text-charcoal/40 hover:text-charcoal/60 transition-colors"
          >
            Skip — show my results without email
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-charcoal/30">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    )
  }

  /* ---------- Results view ---------- */
  if (showResults) {
    const goalAnswer = answers[1]?.[0] ?? 'Healthy Eating'
    const categoryMap: Record<string, string> = {
      'Weight Loss': 'Calorie-Smart',
      'Muscle Gain': 'High Protein',
      'Healthy Eating': 'Balanced',
      Convenience: 'Quick & Easy',
    }
    const recommendedCategory = categoryMap[goalAnswer] ?? 'Balanced'

    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Results header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/10">
            <Sparkles className="h-7 w-7 text-sage" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Your Personalised Plan
          </h1>
          <p className="mt-2 text-muted-foreground">
            Based on your answers, we recommend our{' '}
            <span className="font-semibold text-sage">
              {recommendedCategory}
            </span>{' '}
            meals.
          </p>
        </div>

        {/* Suggested meals */}
        <div className="grid gap-4 sm:grid-cols-3">
          {recommendedMeals.map((meal) => (
            <Link key={meal.slug} href={`/meals/${meal.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col gap-2 p-5">
                  <div className="mb-1 flex h-28 items-center justify-center rounded-md bg-cream">
                    <span className="text-3xl">🍽</span>
                  </div>
                  <h3 className="font-heading text-base font-semibold text-charcoal">
                    {meal.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {meal.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                      {meal.calories} cal
                    </span>
                    <span className="font-semibold text-sage">{meal.price}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/meals">
            <Button className="bg-sage text-white hover:bg-sage/90">
              Browse Full Menu
            </Button>
          </Link>
          <Button variant="outline" onClick={handleRestart}>
            Retake Quiz
          </Button>
        </div>
      </div>
    )
  }

  /* ---------- Quiz view ---------- */
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-cream">
          <div
            className="h-full rounded-full bg-sage transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h1 className="font-heading mb-2 text-2xl font-bold text-charcoal">
        {question.question}
      </h1>
      {question.multiSelect && (
        <p className="mb-6 text-sm text-muted-foreground">
          Select all that apply
        </p>
      )}
      {!question.multiSelect && (
        <p className="mb-6 text-sm text-muted-foreground">
          Choose one option
        </p>
      )}

      {/* Options */}
      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => (
          <Button
            key={option}
            type="button"
            variant="outline"
            onClick={() => selectOption(option)}
            className={cn(
              'h-auto justify-start px-4 py-3.5 text-left text-sm font-medium transition-colors',
              isSelected(option)
                ? 'border-sage bg-sage/10 text-sage hover:bg-sage/15'
                : 'border-gray-200 text-charcoal hover:border-sage/40 hover:bg-sage/5'
            )}
          >
            <span
              className={cn(
                'mr-2.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs',
                isSelected(option)
                  ? 'border-sage bg-sage text-white'
                  : 'border-gray-300'
              )}
            >
              {isSelected(option) && <Check className="h-3 w-3" />}
            </span>
            {option}
          </Button>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className="text-charcoal"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canContinue()}
          className="bg-sage text-white hover:bg-sage/90"
        >
          {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
