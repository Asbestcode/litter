import { create } from 'zustand'

export const useUserColorStore = create((set) => ({
  userColor: "",
  setUserColor: (color) => set(() => ({ userColor: color })),
  userName: "",
  setUserName: (name) => set(() => ({ userName: name })),
}))