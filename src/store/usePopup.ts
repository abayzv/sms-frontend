import { create } from 'zustand'

interface PopupState {
    isOpen: boolean
    open: () => void
    close: () => void
    message: string
    setMessage: (message: string) => void
}

export const usePopup = create<PopupState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    message: '',
    setMessage: (message) => set({ message }),
}))