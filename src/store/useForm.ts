import { create } from "zustand";

interface FormState {
    data: object
    setData: (data: any) => void
    reset: () => void
}

export const useForm = create<FormState>((set) => ({
    data: {},
    setData: (data) => set({ data }),
    reset: () => set({ data: {} }),
}))