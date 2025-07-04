import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { VIEW_TYPE, ViewType } from '@/constants/viewType'

interface useViewTypeState {
  viewType: ViewType
  setViewType: (viewType: ViewType) => void
}

export const useViewTypeStore = create<useViewTypeState>()(
  persist(
    (set) => ({
      viewType: VIEW_TYPE.LIST,
      setViewType: (viewType: ViewType) => set({ viewType }),
    }),
    {
      name: 'view-type-storage', // localStorage key
    },
  ),
)
