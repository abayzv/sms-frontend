import { useEffect, useState } from "react"
import swr, { useSWRConfig } from "swr"
import useAxios from "@/lib/useAxios"
import Pagination from "./pagination"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import Dropdown from "./dropdown"
import FormatDate from "@/utils/formatDate"
import Icon from "./icon"

export default function Datatable({ url, filter, header }: { url: string, filter?: Array<string>, header: Array<string> }) {
    const axiosAuth = useAxios()
    const [totalPage, setTotalPage] = useState(0)
    const [dataPage, setPage] = useState(0)
    const [colapseFilter, setColapseFilter] = useState(false)
    const [dataFilter, setFilter] = useState<any>(() => {
        const data = {} as any
        filter?.forEach((item) => {
            if(item === "startDate" || item === "endDate") {
                data[item] = new Date()
            }

            data[item] = ""
        })
        return data
    })
    const searchParams = useSearchParams()
    const page = searchParams?.get("page")
    const show = searchParams?.get("show")
    const router = useRouter()
    const path = usePathname() as string
    const { mutate } = useSWRConfig()

    const queryString = {} as any

    searchParams?.forEach((value, key) => {
        queryString[key] = value
    })

    enum RoleColor {
        "superadmin" = "bg-yellow-100 border border-yellow-200",
        "admin" = "bg-red-100 border border-red-200",
        "teacher" = "bg-green-100 border border-green-200",
        "student" = "bg-blue-100 border border-blue-200"
    }

    const { data, error, isLoading } = swr(url, async (url) => {
        const res = await axiosAuth.get( url, {
            params: {
                page,
                show,
                ...queryString
            }
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

    function search() {
        // foreach dataFilter push route
        const filterMap = Object.entries(dataFilter).map(([key, value]) => {
            return `${key}=${value}`
        })
        const filterString = filterMap.join("&")
        router.push(`${path}?${filterString}`)
    }

    const renderHeader = () => {

        return headerElement.map((item, index) => {
            if (item === "createdAt") return <th key={index} className="text-center bg-primary-100 p-3">CREATED AT</th>
            return <th key={index} className="text-center bg-primary-100 p-3">{item.toUpperCase()}</th>
        })

    }

    const renderBody = () => {
        // each header element will be the key of the data
        if (isLoading) return <tr><td colSpan={headerElement.length} className="border-b border-gray-200 text-center p-3">Loading...</td></tr>
        if (!data) return <tr><td colSpan={headerElement.length} className="border-b border-gray-200 text-center p-3">No Data</td></tr>

        const { dataSet } = data as any

        return dataSet.map((item: Array<any>, index: number) => {
            return (
                <tr key={index}>
                    {headerElement.map((key: any, index) => {
                        if (key === "action") return (
                            <td key={index} className="border-b text-neutral-600 border-gray-200 text-center p-3">
                                <Dropdown className="bg-primary-500 text-white rounded-lg p-2 px-5" />
                            </td>
                        )
                        if (key === "role") return (
                            <td key={index} className="border-b text-neutral-600 border-gray-200 text-center p-3">
                                {/* @ts-ignore */}
                                <span className={`rounded-lg p-2 px-5 ${RoleColor[item[key]]}`}>{item[key]}</span>
                            </td>
                        )
                        if (!item[key]) return (
                            <td key={index} className="border-b text-neutral-600 border-gray-200 text-center p-3">
                                <span className="rounded-lg p-2 px-5 bg-red-100 border border-red-200 text-red-500">Not Filled</span>
                            </td>
                        )
                        if (key === "createdAt") return <td key={index} className="border-b text-neutral-600 border-gray-200 text-center p-3">{FormatDate(item[key])}</td>
                        return <td key={index} className="border-b text-neutral-600 border-gray-200 text-center p-3">{item[key]}</td>
                    })}
                </tr>
            )
        })

    }

    const renderFilter = () => {
        if (!filter) return null

        return (
            <div className={`bg-primary-50 p-5 gap-5 items-end ${colapseFilter ? 'flex' : 'hidden'}`}>
                {/* Filter */}
                <div className="grid gap-5 grid-cols-6 w-full">
                    {/* Filter Items */}
                    {filter?.map((item, index) => {

                        if(item === "endDate" || item === "startDate") return (
                            <div key={index} className="flex flex-col gap-2">
                                <label htmlFor={item} className="text-sm text-neutral-600">{item.toUpperCase()}</label>
                                <input name={item} type="date" value={dataFilter[item]} onChange={e => setFilter({ [item]: e.target.value })} className="border border-gray-200 rounded-md text-neutral-600 outline-none p-2" placeholder={item} />
                            </div>
                        )

                        return (
                            <div key={index} className="flex flex-col gap-2">
                                <label htmlFor={item} className="text-sm text-neutral-600">{item.toUpperCase()}</label>
                                <input name={item} type="text" value={dataFilter[item]} onChange={e => setFilter({ [item]: e.target.value })} className="border border-gray-200 rounded-md text-neutral-600 outline-none p-2" placeholder={item} />
                            </div>
                        )
                    })}
                    {/* End Filter Items */}
                </div>
                {/* End Filter */}
            </div>
        )
    }

    const resetFilter = () => {
        const emptyFilter = {} as any
        const resetFilter = Object.entries(dataFilter).map(([key, value]) => {
            return emptyFilter[key] = " "
        })
        setFilter(emptyFilter)
        router.push(path)
    }

    useEffect(() => {
        mutate(url)

    }, [path, searchParams])

    // filter
    const handleChangeShow = (e: any) => {
        const show = e.target.value
        router.push("?show=" + show)
    }
    // End Filter

    return (
        <div className="w-full bg-white p-5 border-b-4 border-primary-300 relative">
            <span className="absolute bg-primary-500 text-white top-0 left-6 p-2">Users Data</span>

            <div className="relative mt-10 mb-5">
                <div className="flex justify-between items-end border-b border-gray-200 pb-3 px-5 gap-3">
                    {filter && (
                        <div className="text-lg text-neutral-600 flex gap-5 items-center cursor-pointer" onClick={() => {
                            setColapseFilter(!colapseFilter)
                        }}>
                            <span>Filter</span>
                            <span className="text-xs"><Icon name="chevron-right" /></span>
                        </div>
                    )}
                    <select name="show" id="" onChange={handleChangeShow} className="border ml-auto border-gray-200 outline-none rounded-md" defaultValue={show || 10}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                    <button className="p-3 border border-gray-200 text-neutral-600 hover:bg-gray-200 rounded-md" onClick={resetFilter}>
                        <Icon name="refresh" />
                    </button>
                    <button className="p-2 px-5 text-white rounded-md bg-sky-500 hover:bg-sky-400" onClick={() => search()}>Search</button>
                </div>
                {renderFilter()}
            </div>

            <table className="w-full">
                <thead>
                    <tr>
                        {renderHeader()}
                    </tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            <Pagination totalPage={totalPage} page={dataPage} />
        </div>
    )
}