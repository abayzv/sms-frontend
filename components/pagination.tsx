import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export default function Pagination({ totalPage, page }:{totalPage: number, page: number}) {
    const [currentPage, setCurrentPage] = useState(page)
    const router = useRouter()
    const searchParams = useSearchParams()
    const path = usePathname() as string

    const goToPage = (page: number) => {
        setCurrentPage(page)
        // get curent params
        const params = {} as any
        searchParams?.forEach((value, key) => {
            params[key] = value
        }
        )
        // set new page
        params.page = page
        // set new params
        router.push(`${path}?${new URLSearchParams(params).toString()}`)
    }

    const renderPage = () => {
        const dataPage = []
        for (let i = 1; i <= totalPage; i++) {
            dataPage.push(i)
        }
        return dataPage.map((item,index) => {
            return (
                <button key={index} onClick={() => {
                    goToPage(item)
                }} className={`bg-gray-100 p-3 rounded-md ${currentPage === item ? "bg-primary-200" : ""}`}>{item}</button>
            )
        })
    }

    return (
        <div className="flex justify-end gap-5 mt-5">
            <button className="bg-primary-100 p-3 rounded-md">Prev</button>
            {renderPage()}
            <button className="bg-primary-100 p-3 rounded-md">Next</button>
        </div>
    )
}
