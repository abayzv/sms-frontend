import { create } from 'zustand'

interface DeletePopupState {
    url: string
    setUrl: (url: string) => void
    isOpen: boolean
    open: () => void
    close: () => void
    message: string
    setMessage: (message: string) => void
    onDelete: () => Promise<void>
    setDelete: (onDelete: () => Promise<void>) => void
}

export const useDeletePopup = create<DeletePopupState>((set) => ({
    url: '',
    setUrl: (url) => set({ url }),
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    message: 'Are you sure you want to delete this data?',
    setMessage: (message) => set({ message }),
    onDelete: async () => { },
    setDelete: (onDelete) => set({ onDelete }),
}))