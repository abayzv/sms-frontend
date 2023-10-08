import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface Menu {
    name: string
    route: string
    icon?: string
    child?: Menu[]
}

interface SidebarState {
    isCollapsed: boolean
    collapse: () => void
    expand: () => void
}

interface MenuState {
    menu: Menu[]
}

const menu: Menu[] = [
    {
        name: "Dashboard",
        route: "/",
        icon: "dashboard",
    },
    {
        name: "Products",
        route: "/products",
        icon: "box",
        child: [
            {
                name: "All Products",
                route: "/products",
            },
        ],
    },
];

export const useSidebar = create<SidebarState>()(
    devtools(
        persist(
            (set) => ({
                isCollapsed: false,
                collapse: () => set({ isCollapsed: true }),
                expand: () => set({ isCollapsed: false }),
            }),
            {
                name: 'sidebar-storage',
            }
        )
    )
)

export const useMenu = create<MenuState>(() => ({
    menu
}))