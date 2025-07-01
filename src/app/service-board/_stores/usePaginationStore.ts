import { create } from "zustand";

interface PaginationState {
  page: number;
  setPage: (page: number) => void;
}

export const usePaginationStore = create<PaginationState>((set, get) => ({
  page: 1,
  setPage: (page) => set({ page }),
}));
