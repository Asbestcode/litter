import { create } from 'zustand'

export const useDaysLeftStore = create((set) => ({
  days: 14,
  setDaysLeft: (daysLeft) => set(() => ({ days: daysLeft }))
}))