import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItemClient } from '@/types'

const MIN_ORDER_AMOUNT = 60

interface CartState {
  items: CartItemClient[]
  isOpen: boolean
  addItem: (item: Omit<CartItemClient, 'quantity'>, quantity?: number) => void
  removeItem: (mealId: string) => void
  updateQuantity: (mealId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setOpen: (open: boolean) => void
  getItemCount: () => number
  getSubtotal: () => number
  meetsMinimumSpend: () => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.mealId === item.mealId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.mealId === item.mealId
                  ? { ...i, quantity: Math.min(i.quantity + quantity, 20) }
                  : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity }] }
        })
      },
      removeItem: (mealId) =>
        set((state) => ({ items: state.items.filter((i) => i.mealId !== mealId) })),
      updateQuantity: (mealId, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.mealId !== mealId)
            : state.items.map((i) =>
                i.mealId === mealId ? { ...i, quantity: Math.min(quantity, 20) } : i
              ),
        })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (open) => set({ isOpen: open }),
      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      meetsMinimumSpend: () => get().getSubtotal() >= MIN_ORDER_AMOUNT,
    }),
    { name: 'fps-cart' }
  )
)

export { MIN_ORDER_AMOUNT }
