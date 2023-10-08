import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface Menu {
    name: string
    route: string
    icon?: string
    child?: Menu[]
}

interface SidebarState {
    menu: Menu[]
    isCollapsed: boolean
    collapse: () => void
    expand: () => void
}

const menu: Menu[] = [
    {
        name: "Dashboard",
        route: "/",
        icon: "home",
    },
    {
        name: "Products",
        route: "/users",
        icon: "users",
        child: [
            {
                name: "All Products",
                route: "/users",
            },
        ],
    },
];

export const useSidebar = create<SidebarState>()(
    devtools(
        persist(
            (set) => ({
                menu: menu,
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