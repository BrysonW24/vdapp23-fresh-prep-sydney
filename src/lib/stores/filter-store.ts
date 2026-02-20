import { create } from 'zustand'

interface FilterState {
  // Category filter
  category: string
  // Tag-based filters
  proteinType: string[]
  dietType: string[]
  // Macro range filters
  calorieRange: [number, number]
  proteinRange: [number, number]
  carbRange: [number, number]
  fatRange: [number, number]
  // Portion
  portionSize: string[]
  // Search & sort
  searchQuery: string
  sortBy: string
  // Allergen exclusions (from original)
  allergenExclusions: string[]

  // Actions
  setCategory: (cat: string) => void
  toggleProteinType: (type: string) => void
  toggleDietType: (diet: string) => void
  setCalorieRange: (range: [number, number]) => void
  setProteinRange: (range: [number, number]) => void
  setCarbRange: (range: [number, number]) => void
  setFatRange: (range: [number, number]) => void
  togglePortionSize: (size: string) => void
  toggleAllergenExclusion: (allergen: string) => void
  setSortBy: (sort: string) => void
  setSearch: (query: string) => void
  resetFilters: () => void
  getActiveFilterCount: () => number
}

const DEFAULT_CALORIE_RANGE: [number, number] = [0, 1000]
const DEFAULT_PROTEIN_RANGE: [number, number] = [0, 100]
const DEFAULT_CARB_RANGE: [number, number] = [0, 150]
const DEFAULT_FAT_RANGE: [number, number] = [0, 50]

const initialState = {
  category: 'ALL',
  proteinType: [] as string[],
  dietType: [] as string[],
  calorieRange: DEFAULT_CALORIE_RANGE as [number, number],
  proteinRange: DEFAULT_PROTEIN_RANGE as [number, number],
  carbRange: DEFAULT_CARB_RANGE as [number, number],
  fatRange: DEFAULT_FAT_RANGE as [number, number],
  portionSize: [] as string[],
  searchQuery: '',
  sortBy: 'name',
  allergenExclusions: [] as string[],
}

function toggleInArray(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((a) => a !== item) : [...arr, item]
}

export const useFilterStore = create<FilterState>()((set, get) => ({
  ...initialState,

  setCategory: (category) => set({ category }),

  toggleProteinType: (type) =>
    set((state) => ({ proteinType: toggleInArray(state.proteinType, type) })),

  toggleDietType: (diet) =>
    set((state) => ({ dietType: toggleInArray(state.dietType, diet) })),

  setCalorieRange: (calorieRange) => set({ calorieRange }),
  setProteinRange: (proteinRange) => set({ proteinRange }),
  setCarbRange: (carbRange) => set({ carbRange }),
  setFatRange: (fatRange) => set({ fatRange }),

  togglePortionSize: (size) =>
    set((state) => ({ portionSize: toggleInArray(state.portionSize, size) })),

  toggleAllergenExclusion: (allergen) =>
    set((state) => ({ allergenExclusions: toggleInArray(state.allergenExclusions, allergen) })),

  setSortBy: (sortBy) => set({ sortBy }),
  setSearch: (searchQuery) => set({ searchQuery }),

  resetFilters: () => set(initialState),

  getActiveFilterCount: () => {
    const s = get()
    let count = 0
    if (s.category !== 'ALL') count++
    count += s.proteinType.length
    count += s.dietType.length
    count += s.portionSize.length
    count += s.allergenExclusions.length
    if (s.calorieRange[0] !== DEFAULT_CALORIE_RANGE[0] || s.calorieRange[1] !== DEFAULT_CALORIE_RANGE[1]) count++
    if (s.proteinRange[0] !== DEFAULT_PROTEIN_RANGE[0] || s.proteinRange[1] !== DEFAULT_PROTEIN_RANGE[1]) count++
    if (s.carbRange[0] !== DEFAULT_CARB_RANGE[0] || s.carbRange[1] !== DEFAULT_CARB_RANGE[1]) count++
    if (s.fatRange[0] !== DEFAULT_FAT_RANGE[0] || s.fatRange[1] !== DEFAULT_FAT_RANGE[1]) count++
    if (s.searchQuery.trim()) count++
    return count
  },
}))

export {
  DEFAULT_CALORIE_RANGE,
  DEFAULT_PROTEIN_RANGE,
  DEFAULT_CARB_RANGE,
  DEFAULT_FAT_RANGE,
}
