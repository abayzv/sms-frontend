import { create } from 'zustand'

interface DataTableState {
    url: string
    setUrl: (url: string) => void
}

export const useDataTable = create<DataTableState>((set) => ({
    url: '',
    setUrl: (url) => set({ url }),
}))