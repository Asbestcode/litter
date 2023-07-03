import { create } from 'zustand'

export const useDaysLeftStore = create((set) => ({
  days: 1,
  setDaysLeft: (daysLeft) => set(() => ({ days: daysLeft }))
}))