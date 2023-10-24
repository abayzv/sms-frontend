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
    menu: Menu[],
    setMenuChild: (index: number, child: Menu[]) => void
}

const menu: Menu[] = [
    {
        name: "Dashboard",
        route: "/",
        icon: "dashboard",
    },
    {
        name: "Crud",
        route: "/crud",
        icon: "box",
        child: [
            {
                name: "Generate Crud",
                route: "/crud/generate",
            },
        ],
    },
    {
        name: "Documentation",
        route: "/documentation",
        icon: "analytics",
    }
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

export const useMenu = create<MenuState>((set) => ({
    menu,
    setMenuChild: (index, child) => {
        set((state) => {
            const newMenu = [...state.menu]
            newMenu[index].child = [{
                name: "Generate Crud",
                route: "/crud/generate",
            }, ...child]
            return { menu: newMenu }
        })
    }
}))