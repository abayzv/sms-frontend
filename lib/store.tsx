import { create } from "zustand";
import { createAlertSlice, AlertSlice } from "./slices/createAlertSlice";

type AlertStore = AlertSlice;

export const useAlertStore = create<AlertStore>()((...a) => ({
    ...createAlertSlice(...a)
}))