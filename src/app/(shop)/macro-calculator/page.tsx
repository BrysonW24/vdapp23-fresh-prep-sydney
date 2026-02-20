'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, Flame, Drumstick, Wheat, Droplets } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Gender = 'male' | 'female'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
type Goal = 'lose' | 'maintain' | 'gain'

interface MacroResult {
  tdee: number
  targetCalories: number
  protein: number
  carbs: number
  fat: number
}

const ACTIVITY_LEVELS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
  { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
  { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
  { value: 'active', label: 'Active', desc: 'Hard exercise 6-7 days/week' },
  { value: 'very-active', label: 'Very Active', desc: 'Very hard exercise, physical job' },
]

const GOALS: { value: Goal; label: string; desc: string }[] = [
  { value: 'lose', label: 'Lose Weight', desc: '20% calorie deficit' },
  { value: 'maintain', label: 'Maintain', desc: 'Match your TDEE' },
  { value: 'gain', label: 'Build Muscle', desc: '15% calorie surplus' },
]

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
}

function calculateMacros(
  gender: Gender,
  age: number,
  height: number,
  weight: number,
  activity: ActivityLevel,
  goal: Goal
): MacroResult {
  // Mifflin-St Jeor equation
  let bmr: number
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  }

  const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[activity])

  // Apply goal modifier
  let targetCalories: number
  switch (goal) {
    case 'lose':
      targetCalories = Math.round(tdee * 0.8)
      break
    case 'gain':
      targetCalories = Math.round(tdee * 1.15)
      break
    default:
      targetCalories = tdee
  }

  // Macro split based on goal
  let proteinPct: number, carbPct: number, fatPct: number
  if (goal === 'lose') {
    proteinPct = 0.4; carbPct = 0.3; fatPct = 0.3
  } else if (goal === 'gain') {
    proteinPct = 0.3; carbPct = 0.4; fatPct = 0.3
  } else {
    proteinPct = 0.3; carbPct = 0.4; fatPct = 0.3
  }

  return {
    tdee,
    targetCalories,
    protein: Math.round((targetCalories * proteinPct) / 4),
    carbs: Math.round((targetCalories * carbPct) / 4),
    fat: Math.round((targetCalories * fatPct) / 9),
  }
}

export default function MacroCalculatorPage() {
  const [gender, setGender] = useState<Gender>('male')
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(175)
  const [weight, setWeight] = useState(75)
  const [activity, setActivity] = useState<ActivityLevel>('moderate')
  const [goal, setGoal] = useState<Goal>('maintain')
  const [result, setResult] = useState<MacroResult | null>(null)

  function handleCalculate() {
    setResult(calculateMacros(gender, age, height, weight, activity, goal))
  }

  return (
    <div className="bg-warm-white min-h-screen">
      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/10">
            <Calculator className="h-6 w-6 text-sage" />
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Macro Calculator
          </h1>
          <p className="mt-2 text-charcoal/60">
            Calculate your daily calorie and macro targets based on your body
            composition and goals.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
            {/* Gender */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-charcoal">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['male', 'female'] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={cn(
                      'rounded-lg border py-2.5 text-sm font-medium transition-colors',
                      gender === g
                        ? 'border-sage bg-sage/10 text-sage'
                        : 'border-border text-charcoal/60 hover:border-sage/50'
                    )}
                  >
                    {g === 'male' ? 'Male' : 'Female'}
                  </button>
                ))}
              </div>
            </div>

            {/* Age, Height, Weight */}
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-charcoal">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  min={15}
                  max={100}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm text-charcoal focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-charcoal">
                  Height <span className="text-charcoal/40">(cm)</span>
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min={100}
                  max={250}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm text-charcoal focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-charcoal">
                  Weight <span className="text-charcoal/40">(kg)</span>
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  min={30}
                  max={250}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm text-charcoal focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/30"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-charcoal">
                Activity Level
              </label>
              <div className="space-y-2">
                {ACTIVITY_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setActivity(level.value)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors',
                      activity === level.value
                        ? 'border-sage bg-sage/5'
                        : 'border-border hover:border-sage/30'
                    )}
                  >
                    <div
                      className={cn(
                        'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                        activity === level.value ? 'border-sage' : 'border-border'
                      )}
                    >
                      {activity === level.value && (
                        <div className="h-2 w-2 rounded-full bg-sage" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">{level.label}</p>
                      <p className="text-xs text-charcoal/50">{level.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div className="mb-8">
              <label className="mb-2 block text-sm font-semibold text-charcoal">
                Goal
              </label>
              <div className="grid grid-cols-3 gap-3">
                {GOALS.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setGoal(g.value)}
                    className={cn(
                      'rounded-lg border px-3 py-3 text-center transition-colors',
                      goal === g.value
                        ? 'border-sage bg-sage/10'
                        : 'border-border hover:border-sage/30'
                    )}
                  >
                    <p className="text-sm font-medium text-charcoal">{g.label}</p>
                    <p className="mt-0.5 text-[10px] text-charcoal/50">{g.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate button */}
            <button
              onClick={handleCalculate}
              className="w-full rounded-lg bg-sage py-3 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
            >
              Calculate My Macros
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 rounded-2xl border border-sage/20 bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-heading text-xl font-bold text-charcoal">
                Your Daily Targets
              </h2>
              <p className="mt-1 text-sm text-charcoal/50">
                TDEE: {result.tdee} cal/day • Target: {result.targetCalories} cal/day
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl bg-sage/5 p-4 text-center">
                  <Flame className="mx-auto h-5 w-5 text-sage" />
                  <p className="mt-2 text-2xl font-bold text-charcoal">
                    {result.targetCalories}
                  </p>
                  <p className="text-xs text-charcoal/50">Calories</p>
                </div>
                <div className="rounded-xl bg-sage/5 p-4 text-center">
                  <Drumstick className="mx-auto h-5 w-5 text-sage" />
                  <p className="mt-2 text-2xl font-bold text-charcoal">
                    {result.protein}g
                  </p>
                  <p className="text-xs text-charcoal/50">Protein</p>
                </div>
                <div className="rounded-xl bg-sage/5 p-4 text-center">
                  <Wheat className="mx-auto h-5 w-5 text-sage" />
                  <p className="mt-2 text-2xl font-bold text-charcoal">
                    {result.carbs}g
                  </p>
                  <p className="text-xs text-charcoal/50">Carbs</p>
                </div>
                <div className="rounded-xl bg-sage/5 p-4 text-center">
                  <Droplets className="mx-auto h-5 w-5 text-sage" />
                  <p className="mt-2 text-2xl font-bold text-charcoal">
                    {result.fat}g
                  </p>
                  <p className="text-xs text-charcoal/50">Fat</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 rounded-xl bg-sage/5 p-4 text-center">
                <p className="text-sm text-charcoal/70">
                  Browse our meals matched to your macro targets
                </p>
                <Link
                  href="/meals"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
                >
                  Shop Meals
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
