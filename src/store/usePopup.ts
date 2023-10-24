import { create } from 'zustand'

interface SuccessOptions {
    messaage: string
    onConfirm?: () => void
}

interface PopupState {
    isOpen: boolean
    type: string
    open: () => void
    close: () => void
    message: string
    setMessage: (message: string) => void
    success: (options: SuccessOptions) => void
    onConfirm?: () => void
}

export const usePopup = create<PopupState>((set) => ({
    isOpen: false,
    type: "",
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    message: '',
    setMessage: (message) => set({ message }),
    success: (options) => {
        set({
            isOpen: true,
            type: "success",
            message: options.messaage,
            onConfirm: options.onConfirm,
        })
    },
    onConfirm: undefined,
}))