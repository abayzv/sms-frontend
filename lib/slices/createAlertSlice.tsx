import { StateCreator } from "zustand";

export interface Alert {
    isShowAlert: boolean;
    type?: string;
    message?: string;
}

export interface AlertSlice{
    alert: Alert;
    setAlert: (alert: Alert) => void;
}

export const createAlertSlice: StateCreator<AlertSlice> = (set) => ({
    alert: {
        isShowAlert: false,
        type: "",
        message: ""
    },
    setAlert: (alert: Alert) => set({alert})
})
