import { create } from 'zustand'

interface useSearchTextState {
  search: string | undefined
  setSearch: (search: string) => void
}

export const useSearchTextStore = create<useSearchTextState>((set) => ({
  search: undefined,
  setSearch: (search: string) => set({ search }),
}))
