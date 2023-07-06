import { create } from 'zustand'

export const useUserStore = create((set) => ({
  userStore: { name: '', color: ''},
  setUserStore: (name, color) => set(() => ({ name: name, color: color }))
}))