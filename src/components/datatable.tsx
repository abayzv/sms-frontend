'use client'
import { useState, useEffect } from "react"
import swr from "swr"
import axios from "axios"
import Pagination from "@/components/pagination"
import { useSearchParams, useRouter, usePathname } from "next/navigation"


export default function Datatable({ url, filter, header }: { url?: string, filter: Array<string>, header: Array<string> }) {
    const [totalPage, setTotalPage] = useState(0)
    const [dataPage, setPage] = useState(0)
    const searchParams = useSearchParams()
    const page = searchParams.get("page")
    const router = useRouter()
    const path = usePathname()

    const query = {} as any

    if(page) query["page"] = page

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MzBkZDJiZC0yZmJkLTQxNjMtODUzMS0yZmQwNWI5NDZjNjMiLCJyb2xlIjoxLCJpYXQiOjE2ODc0MjA0MDcsImV4cCI6MTY4NzQyNDAwN30.1LiotWQwSfQC4S9sx12pH76u0n8EkAw0rLacbRU4HMY"

    const { data, error, isLoading } = swr(url, async (url) => {
        const res = await axios.get(url, {
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: query
        })
        const data = await res.data
        setTotalPage(+data.totalPage)
        setPage(+data.page)
        return {
            dataSet: data.data,
            totalPage: data.totalPage,
            page: data.page
        }
    })

    const headerElement = header

    const renderHeader = () => {

        return headerElement.map((item, index) => {
            return <th key={index} className="text-center bg-sky-100 p-3">{item.toUpperCase()}</th>
        })

    }

    const renderBody = () => {
        // each header element will be the key of the data
        if (isLoading) return <tr><td colSpan={headerElement.length} className="border-b border-gray-200 text-center p-3">Loading...</td></tr>
        if(!data) return <tr><td colSpan={headerElement.length} className="border-b border-gray-200 text-center p-3">No Data</td></tr>

        const { dataSet } = data as any

        return dataSet.map((item: Array<any>, index: number) => {
            return (
                <tr key={index}>
                    {headerElement.map((key: any, index) => {
                        return <td key={index} className="border-b border-gray-200 text-center p-3">{item[key]}</td>
                    })}
                </tr>
            )
        })

    }

    return (
        <div className="w-full bg-white p-5 border-b-4 border-sky-300">
            <table className="w-full">
                <thead>
                    <tr>
                        {renderHeader()}
                    </tr>
                </thead>
                <tbody>
                    {renderBody()}
                    {/* {!!data && <pre>{JSON.stringify(data.data, null, 4)}</pre>} */}
                </tbody>
            </table>
            <Pagination totalPage={totalPage} page={dataPage} />
        </div>
    )
}