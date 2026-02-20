'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Plus, Trash2, Save, Eye } from 'lucide-react'
import { toast } from 'sonner'

const CATEGORIES = [
  { value: 'RECIPE', label: 'Recipe' },
  { value: 'NUTRITION', label: 'Nutrition' },
  { value: 'LIFESTYLE', label: 'Lifestyle' },
  { value: 'MEAL_PREP_TIPS', label: 'Meal Prep Tips' },
  { value: 'NEWS', label: 'News' },
]

const DIFFICULTIES = [
  { value: 'EASY', label: 'Easy' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HARD', label: 'Hard' },
]

interface Ingredient {
  amount: string
  item: string
}

interface Instruction {
  step: number
  text: string
}

export default function AdminBlogNewPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Blog post fields
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [featuredImageAlt, setFeaturedImageAlt] = useState('')
  const [category, setCategory] = useState('RECIPE')
  const [tags, setTags] = useState('')
  const [isPublished, setIsPublished] = useState(false)

  // Recipe toggle
  const [hasRecipe, setHasRecipe] = useState(true)

  // Recipe fields
  const [prepTime, setPrepTime] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [servings, setServings] = useState('')
  const [difficulty, setDifficulty] = useState('EASY')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [storageInstructions, setStorageInstructions] = useState('')
  const [makeAheadTips, setMakeAheadTips] = useState('')
  const [mealPrepNotes, setMealPrepNotes] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [recipeCategory, setRecipeCategory] = useState('')

  // Dynamic ingredients and instructions
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ amount: '', item: '' }])
  const [instructions, setInstructions] = useState<Instruction[]>([{ step: 1, text: '' }])

  // Ingredient handlers
  const addIngredient = () => setIngredients([...ingredients, { amount: '', item: '' }])
  const removeIngredient = (idx: number) => setIngredients(ingredients.filter((_, i) => i !== idx))
  const updateIngredient = (idx: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients]
    updated[idx] = { ...updated[idx], [field]: value }
    setIngredients(updated)
  }

  // Instruction handlers
  const addInstruction = () =>
    setInstructions([...instructions, { step: instructions.length + 1, text: '' }])
  const removeInstruction = (idx: number) => {
    const updated = instructions.filter((_, i) => i !== idx).map((inst, i) => ({ ...inst, step: i + 1 }))
    setInstructions(updated)
  }
  const updateInstruction = (idx: number, value: string) => {
    const updated = [...instructions]
    updated[idx] = { ...updated[idx], text: value }
    setInstructions(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const body: Record<string, unknown> = {
        title,
        excerpt,
        content,
        metaDescription: metaDescription || undefined,
        featuredImage: featuredImage || undefined,
        featuredImageAlt: featuredImageAlt || undefined,
        category,
        tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        isPublished,
      }

      if (hasRecipe) {
        const validIngredients = ingredients.filter((i) => i.amount.trim() && i.item.trim())
        const validInstructions = instructions.filter((i) => i.text.trim())

        if (validIngredients.length === 0) {
          toast.error('Add at least one ingredient')
          setIsSubmitting(false)
          return
        }
        if (validInstructions.length === 0) {
          toast.error('Add at least one instruction')
          setIsSubmitting(false)
          return
        }

        body.recipe = {
          prepTime: prepTime ? parseInt(prepTime) : undefined,
          cookTime: cookTime ? parseInt(cookTime) : undefined,
          servings: servings ? parseInt(servings) : undefined,
          difficulty,
          ingredients: validIngredients,
          instructions: validInstructions.map((inst, idx) => ({ step: idx + 1, text: inst.text })),
          calories: calories ? parseInt(calories) : undefined,
          protein: protein ? parseFloat(protein) : undefined,
          carbs: carbs ? parseFloat(carbs) : undefined,
          fat: fat ? parseFloat(fat) : undefined,
          storageInstructions: storageInstructions || undefined,
          makeAheadTips: makeAheadTips || undefined,
          mealPrepNotes: mealPrepNotes || undefined,
          cuisine: cuisine || undefined,
          recipeCategory: recipeCategory || undefined,
        }
      }

      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!data.success) {
        toast.error(data.error?.message || 'Failed to create post')
        setIsSubmitting(false)
        return
      }

      toast.success(isPublished ? 'Post published!' : 'Draft saved!')
      router.push('/admin/blog')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/50'
  const labelClass = 'block text-sm font-medium text-foreground mb-1.5'

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-foreground">New Recipe Post</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ── Blog Post Details ─────────────────────────────── */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Post Details</h2>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Teriyaki Chicken Meal Prep: Ready in 30 Minutes"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Excerpt *</label>
              <textarea
                className={`${inputClass} h-20`}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary that appears in blog listings and social shares..."
                required
              />
            </div>

            <div>
              <label className={labelClass}>Meta Description (SEO)</label>
              <input
                className={inputClass}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Under 160 characters for Google search results"
                maxLength={160}
              />
              <p className="mt-1 text-xs text-muted-foreground">{metaDescription.length}/160</p>
            </div>

            <div>
              <label className={labelClass}>Content * (Markdown supported)</label>
              <textarea
                className={`${inputClass} h-64 font-mono text-xs`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Write your recipe post here using ## headers to create sections:

There is nothing quite like a perfectly cooked piece of salmon...

## Understanding Your Components

1. **Atlantic Salmon:** The star of the show...
2. **Raw Honey:** Adds a natural sweetness...

## Tips

**Oil Temperature:** Maintain oil at 350°F...

**Drain Properly:** Let fried items drain on a wire rack...`}
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Use ## for section headers. Use ** for bold text. Use - for bullet lists.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category *</label>
                <select
                  className={inputClass}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Tags</label>
                <input
                  className={inputClass}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="meal-prep, chicken, high-protein, 30-minute"
                />
                <p className="mt-1 text-xs text-muted-foreground">Comma-separated</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Featured Image URL</label>
                <input
                  className={inputClass}
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className={labelClass}>Image Alt Text (SEO)</label>
                <input
                  className={inputClass}
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                  placeholder="Teriyaki chicken meal prep bowls with rice and vegetables"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Recipe Toggle ────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setHasRecipe(!hasRecipe)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              hasRecipe ? 'bg-sage' : 'bg-muted'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                hasRecipe ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-sm font-medium text-foreground">Include Recipe Card</span>
        </div>

        {/* ── Recipe Details ───────────────────────────────── */}
        {hasRecipe && (
          <>
            {/* Cooking Info */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Recipe Info</h2>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <label className={labelClass}>Prep Time (min)</label>
                  <input
                    className={inputClass}
                    type="number"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className={labelClass}>Cook Time (min)</label>
                  <input
                    className={inputClass}
                    type="number"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className={labelClass}>Servings</label>
                  <input
                    className={inputClass}
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    placeholder="4"
                  />
                </div>
                <div>
                  <label className={labelClass}>Difficulty</label>
                  <select
                    className={inputClass}
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    {DIFFICULTIES.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Cuisine</label>
                  <input
                    className={inputClass}
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    placeholder="Asian-Australian, Mediterranean..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Recipe Category</label>
                  <input
                    className={inputClass}
                    value={recipeCategory}
                    onChange={(e) => setRecipeCategory(e.target.value)}
                    placeholder="Dinner, Lunch, Breakfast..."
                  />
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Ingredients</h2>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center gap-1 rounded-lg bg-sage/10 px-3 py-1.5 text-sm font-medium text-sage hover:bg-sage/20 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>

              <div className="space-y-2">
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      className={`${inputClass} w-32`}
                      value={ing.amount}
                      onChange={(e) => updateIngredient(idx, 'amount', e.target.value)}
                      placeholder="2 tbsp"
                    />
                    <input
                      className={`${inputClass} flex-1`}
                      value={ing.item}
                      onChange={(e) => updateIngredient(idx, 'item', e.target.value)}
                      placeholder="Soy sauce (or tamari for gluten-free)"
                    />
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(idx)}
                        className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Instructions</h2>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="flex items-center gap-1 rounded-lg bg-sage/10 px-3 py-1.5 text-sm font-medium text-sage hover:bg-sage/20 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add Step
                </button>
              </div>

              <div className="space-y-3">
                {instructions.map((inst, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-xs font-bold text-white mt-1.5">
                      {idx + 1}
                    </span>
                    <textarea
                      className={`${inputClass} h-16`}
                      value={inst.text}
                      onChange={(e) => updateInstruction(idx, e.target.value)}
                      placeholder={`Step ${idx + 1}: Describe what to do...`}
                    />
                    {instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(idx)}
                        className="p-1.5 text-red-400 hover:text-red-600 transition-colors mt-1.5"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Nutrition per Serving</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <label className={labelClass}>Calories</label>
                  <input
                    className={inputClass}
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="420"
                  />
                </div>
                <div>
                  <label className={labelClass}>Protein (g)</label>
                  <input
                    className={inputClass}
                    type="number"
                    step="0.1"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    placeholder="36"
                  />
                </div>
                <div>
                  <label className={labelClass}>Carbs (g)</label>
                  <input
                    className={inputClass}
                    type="number"
                    step="0.1"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    placeholder="18"
                  />
                </div>
                <div>
                  <label className={labelClass}>Fat (g)</label>
                  <input
                    className={inputClass}
                    type="number"
                    step="0.1"
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                    placeholder="22"
                  />
                </div>
              </div>
            </div>

            {/* Meal Prep Extras */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Meal Prep Details</h2>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Storage & Reheating Instructions</label>
                  <textarea
                    className={`${inputClass} h-24`}
                    value={storageInstructions}
                    onChange={(e) => setStorageInstructions(e.target.value)}
                    placeholder="Fridge: Store in airtight containers for up to 4 days.&#10;&#10;Freezer: Freeze individual portions for up to 3 months.&#10;&#10;Reheat: Microwave for 2-3 minutes or oven at 180°C for 10 minutes."
                  />
                </div>

                <div>
                  <label className={labelClass}>Make Ahead Tips</label>
                  <textarea
                    className={`${inputClass} h-24`}
                    value={makeAheadTips}
                    onChange={(e) => setMakeAheadTips(e.target.value)}
                    placeholder="Marinate the chicken up to 24 hours ahead.&#10;&#10;Cook the rice the night before and store in the fridge."
                  />
                </div>

                <div>
                  <label className={labelClass}>Meal Prep Guide</label>
                  <textarea
                    className={`${inputClass} h-24`}
                    value={mealPrepNotes}
                    onChange={(e) => setMealPrepNotes(e.target.value)}
                    placeholder="This recipe makes 4 generous portions.&#10;&#10;Use glass containers with snap-lock lids for best results.&#10;&#10;Prep on Sunday, eat Monday to Thursday."
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Actions ──────────────────────────────────────── */}
        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPublished(!isPublished)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isPublished ? 'bg-green-500' : 'bg-muted'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  isPublished ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm text-foreground">
              {isPublished ? 'Will publish immediately' : 'Save as draft'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-sage px-4 py-2 text-sm font-medium text-white hover:bg-sage/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                'Saving...'
              ) : isPublished ? (
                <>
                  <Eye className="h-4 w-4" /> Publish
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Save Draft
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
