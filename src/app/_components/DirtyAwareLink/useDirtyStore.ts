import { create } from 'zustand'

type DirtyStore = {
  isDirty: boolean
  setIsDirty: (val: boolean) => void
}

export const useDirtyStore = create<DirtyStore>((set) => ({
  isDirty: false,
  setIsDirty: (val) => set({ isDirty: val }),
}))
