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
        // if total page less than 5
        if (totalPage <= 5) {
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

        // if total page more than 5 render paginataion with format 1 2 3 ... 10
        if(totalPage > 5) {
            const dataPage = []
            if(currentPage <= 3){
                for (let i = 1; i <= 3; i++) {
                    dataPage.push(i)
                }
                dataPage.push("...")
                dataPage.push(totalPage)
                return dataPage.map((item,index) => {
                    return (
                        <button key={index} onClick={() => {
                            if(item !== "...") goToPage(+item)
                        }} className={`bg-gray-100 p-3 rounded-md ${currentPage === item ? "bg-primary-200" : ""}`}>{item}</button>
                    )
                })
            }
            if(currentPage > 3 && currentPage < totalPage - 2){
                dataPage.push(1)
                dataPage.push("...")
                dataPage.push(currentPage - 1)
                dataPage.push(currentPage)
                dataPage.push(currentPage + 1)
                dataPage.push("...")
                dataPage.push(totalPage)
                return dataPage.map((item,index) => {
                    return (
                        <button key={index} onClick={() => {
                            if(item !== "...") goToPage(+item)
                        }} className={`bg-gray-100 p-3 rounded-md ${currentPage === item ? "bg-primary-200" : ""}`}>{item}</button>
                    )
                })
            }
            if(currentPage >= totalPage - 2){
                dataPage.push(1)
                dataPage.push("...")
                for (let i = totalPage - 2; i <= totalPage; i++) {
                    dataPage.push(i)
                }
                return dataPage.map((item,index) => {
                    return (
                        <button key={index} onClick={() => {
                            if(item !== "...") goToPage(+item)
                        }} className={`bg-gray-100 p-3 rounded-md ${currentPage === item ? "bg-primary-200" : ""}`}>{item}</button>
                    )
                })
            }
        }
    }

    const nextPage = () => {
        if(currentPage < totalPage){
            goToPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        // if current page more than 1
        if(currentPage > 1){
            goToPage(currentPage - 1)
        }
    }

    return (
        <div className="flex justify-end gap-5 mt-5">
            <button onClick={()=>prevPage()} className="bg-primary-100 p-3 rounded-md">Prev</button>
            {renderPage()}
            <button onClick={()=>nextPage()} className="bg-primary-100 p-3 rounded-md">Next</button>
        </div>
    )
}
