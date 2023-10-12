import { useEffect, useState } from "react"
import swr, { useSWRConfig } from "swr"
import useAxios from "@/lib/useAxios"
import Pagination from "./pagination"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import Action from "./tableAction"
import FormatDate from "@/utils/formatDate"
import Icon from "./icon"
import SideModal from "./sideModal"
import { useAlertStore } from "../lib/store"
import { DataForm } from "./sideModal"
import { DropdownActions } from "./tableAction"
import { Confirmation } from "./modal"
import { useSession } from "next-auth/react"
import { MdOutlineFilterList } from "react-icons/md"
import { useDataTable } from "@/store/useDatatable"
import { FaSearch } from "react-icons/fa"
import formatPrice from "@/utils/formatPrice"
import { IDataTable, ITemplate } from "@/types/datatable"

const actionDropwdown: Array<DropdownActions> = []

export default function Datatable({ url, filter, template, title, allowCreate = true, action = actionDropwdown, dataForm = [] }: IDataTable) {
    const axiosAuth = useAxios()
    const [totalPage, setTotalPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [dataPage, setPage] = useState(0)
    const [colapseFilter, setColapseFilter] = useState(false)
    const [isShowModal, setShowModal] = useState(false)
    const [isShowConfirmation, setShowConfirmation] = useState(false)
    const [isRequesting, setRequesting] = useState(false)
    const [dataFilter, setFilter] = useState<any>(() => {
        const data = {} as any
        filter?.forEach((item) => {
            if (item === "startDate" || item === "endDate") {
                data[item] = new Date()
            }

            data[item] = ""
        })
        return data
    })
    const { setAlert } = useAlertStore()
    const searchParams = useSearchParams()
    const page = searchParams?.get("page")
    const show = searchParams?.get("show") || 5
    const router = useRouter()
    const path = usePathname() as string
    const { mutate } = useSWRConfig()
    const { data: session } = useSession()
    const { setUrl } = useDataTable()

    // Form Data
    const [formData, setFormData] = useState({} as any)
    const [formError, setFormError] = useState([] as any)
    const [deleteId, setDeleteId] = useState("")
    // End Form Data

    const queryString = {} as any

    searchParams?.forEach((value, key) => {
        queryString[key] = value
    })

    enum RoleColor {
        "superadmin" = "bg-yellow-100 border-yellow-200",
        "admin" = "bg-red-100 border-red-200",
        "teacher" = "bg-green-100 border-green-200",
        "student" = "bg-blue-100 ue-200"
    }

    const { data, error, isLoading } = swr(url, async (url) => {
        const res = await axiosAuth.get(url, {
            params: {
                page,
                limit: show,
                ...queryString
            }
        })
        const data = await res.data
        setTotalPage(+data.totalPages)
        setPage(+data.page)
        setTotalRecords(+data.totalRecords)
        return {
            dataSet: data.data,
            totalPage: data.totalPages,
            page: data.page
        }
    })

    const headerElement = template.map((item) => {
        return item.header
    })

    const dataKey = template.map((item) => {
        return item.key
    })

    // Unused, if you want to use this, you need to change the return of renderHeader and renderBody
    const RenderKey = (item: any) => {
        return dataKey.map((key: any, index) => {

            // if key has | then split it then return the first element
            // if (key.includes("|")) {
            //     const splitKey = key.split("|")
            //     key = splitKey[0]
            // }

            // if (key === "action") return (
            //     <td key={index} className="text-neutral-600 text-center p-3">
            //         {/* @ts-ignore */}
            //         <Action action={action} className="bg-primary-500 text-white rounded-lg p-2 px-5" id={item["_id"]} />
            //     </td>
            // )
            // if (key === "role") return (
            //     <td key={index} className="text-neutral-600 text-center p-3">
            //         {/* @ts-ignore */}
            //         <span className={`rounded-lg p-2 px-5 ${RoleColor[item[key]]}`}>{item[key]}</span>
            //     </td>
            // )

            // if (key === "price") return (
            //     <td key={index} className="text-neutral-600 text-center p-3">
            //         {formatPrice(item[key])}
            //     </td>
            // )

            // if (!item[key]) return (
            //     <td key={index} className="text-neutral-600 p-3">
            //         <span className="rounded-lg p-2 px-5 bg-red-100 border-red-200 text-red-500">Not Filled</span>
            //     </td>
            // )
            // if (key === "createdAt") return <td key={index} className="text-neutral-600 text-end p-3">{FormatDate(item[key])}</td>

            // if (["media_url", "image_url", "picture_url"].includes(key)) return (
            //     <td key={index} className="text-neutral-600 p-3 flex justify-center">
            //         <img src={item[key]} alt="" className="w-14 h-14 object-cover object-center rounded-xl" />
            //     </td>
            // )

            return <td key={index} className="text-neutral-600 p-3">{item[key]}</td>
        })
    }

    const RenderTemplate = ({ item }: any) => {
        return template.map(({ render, key, itemAlign = "center", header }: ITemplate, index) => {
            if (header === "action")
                return (
                    <td key={index} className="text-neutral-600 text-center p-3">
                        {/* @ts-ignore */}
                        <Action action={action} className="bg-primary-500 text-white rounded-lg p-2 px-5" id={item["_id"]} />
                    </td>
                )

            if (!render) return (
                <td key={index} className={`text-neutral-600 p-3 text-${itemAlign}`}>{item[key]}</td>
            )

            return (
                <td key={index} className={`text-neutral-600 p-3 text-${itemAlign}`}>{render(item)}</td>
            )
        })
    }

    function search() {
        // foreach dataFilter push route
        const filterMap = Object.entries(dataFilter).map(([key, value]) => {
            delete queryString[key]

            return `${key}=${value}`
        })
        const filterString = filterMap.join("&")
        // if queryString is empty then push route with filter
        if (Object.keys(queryString).length === 0) return router.push(`${path}?${filterString}`)

        // if queryString is not empty then push route with filter and query string
        queryString.page = 1
        return router.push(`${path}?${filterString}&${new URLSearchParams(queryString).toString()}`)
    }

    const renderHeader = () => {

        const renderTitle = (name: string) => {
            // // if name has | then split it then return the second element
            // if (name.includes("|")) {
            //     const splitName = name.split("|")
            //     return splitName[1] 
            // }
            return name
        }

        return headerElement.map((item, index) => {
            return <th key={index} className="text-center bg-primary-500 text-white p-3 font-semibold border-primary-500 first:rounded-l-xl last:rounded-r-xl">{renderTitle(item).toUpperCase()}</th>
        })

    }

    const renderBody = () => {
        // each header element will be the key of the data
        if (isLoading) return <tr><td colSpan={headerElement.length} className="text-center p-3">Loading...</td></tr>
        if (!data) return <tr><td colSpan={headerElement.length + 1} className="text-center p-3">No Data</td></tr>

        const { dataSet } = data as any
        if (dataSet.length === 0) return <tr><td colSpan={headerElement.length + 1} className="text-center p-3">No Data</td></tr>

        return dataSet.map((item: Array<any>, index: number) => {
            return (
                <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-white"}`}>
                    <td className="text-neutral-600 text-center p-3 ">{index + 1}.</td>
                    {/* <RenderKey item={item} /> */}
                    <RenderTemplate item={item} />
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

                        if (item === "endDate" || item === "startDate") return (
                            <div key={index} className="flex flex-col gap-2">
                                <label htmlFor={item} className="text-sm text-neutral-600">{item.toUpperCase()}</label>
                                <input name={item} type="date" value={dataFilter[item]} onChange={e => setFilter({ [item]: e.target.value })} className="border-gray-200 rounded-md text-neutral-600 outline-none p-2" placeholder={item} />
                            </div>
                        )

                        return (
                            <div key={index} className="flex flex-col gap-2">
                                <label htmlFor={item} className="text-sm text-neutral-600">{item.toUpperCase()}</label>
                                <input name={item} type="text" value={dataFilter[item]} onChange={e => setFilter({ [item]: e.target.value })} className="border-gray-200 rounded-md text-neutral-600 outline-none p-2" placeholder={item} />
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

    const submitCreate = async () => {
        try {
            setRequesting(true)
            const res = await axiosAuth.post(url, formData)
            if (res) {
                mutate(url)
                setFormData({})
                setFormError([])
                setAlert({
                    type: "success",
                    message: "Create User Success",
                    isShowAlert: true
                })
                setRequesting(false)
                setShowModal(false)
            }
        } catch (error: any) {
            setRequesting(false)
            setFormError(error.response.data.errors)
        }
    }

    const deleteData = async (id: string) => {
        try {
            setRequesting(true)
            const res = await axiosAuth.delete(`${url}/${id}`)
            if (res) {
                mutate(url)
                setAlert({
                    type: "success",
                    message: "Delete User Success",
                    isShowAlert: true
                })
                setRequesting(false)
                setShowConfirmation(false)
            }
        } catch (error: any) {
            setRequesting(false)
            setShowConfirmation(false)
            setAlert({
                type: "error",
                message: "Unexpected Error, Failed to delete data",
                isShowAlert: true
            })
        }
    }

    useEffect(() => {
        mutate(url)
        setUrl(url)

    }, [path, searchParams])

    // filter
    const handleChangeShow = (e: any) => {
        const show = e.target.value
        const params = {} as any
        searchParams?.forEach((value, key) => {
            params[key] = value
        }
        )
        // set new page
        params.show = show
        // set new params
        router.push(`${path}?${new URLSearchParams(params).toString()}`)
    }
    // End Filter

    if (error) {
        console.log(session)
        return <div>Error</div>
    }

    return (
        <div className="w-full bg-white p-5 rounded-xl 4 border-slate-300 relative">
            {/* <span className="absolute bg-primary-500 text-white top-0 left-6 p-2">{title}</span> */}
            {/* {allowCreate && (
                <button className="absolute bg-primary-500 hover:bg-primary-400 text-white top-0 left-6 p-2" onClick={() => setShowModal(true)}>+Add {title}</button>
            )} */}

            <div className="relative mb-5">
                {/* <div className={`relative mb-5 ${allowCreate && "mt-10"}`}> */}
                <div className="flex justify-between items-end border-gray-200 pb-3 gap-3">
                    <div>
                        <FaSearch className="absolute top-3 left-3 text-primary-500" />
                        <input value={dataFilter['name']} onChange={e => setFilter({ name: e.target.value })} type="text" placeholder="Search" className="border-primary-200 bg-primary-50 rounded-md text-neutral-600 outline-none p-2 pl-10" />
                    </div>
                    {filter && (
                        <div className="text-lg text-neutral-600 flex gap-5 items-center cursor-pointer" onClick={() => {
                            setColapseFilter(!colapseFilter)
                        }}>
                            <span>Filter</span>
                            <span className="text-xs"><Icon name="chevron-right" /></span>
                        </div>
                    )}
                    <select name="show" id="" onChange={handleChangeShow} className="ml-auto border-gray-200 outline-none rounded-md" defaultValue={show || 5}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    <button className="p-3 text-white rounded-md bg-primary-500 hover:bg-slate-700" onClick={resetFilter}><Icon name="refresh" color="white" /></button>
                    <button className="p-2 px-5 text-white rounded-md bg-primary-500 hover:bg-slate-700" onClick={() => search()}>Search</button>
                    <button className="p-2 px-5 text-white rounded-md bg-primary-500 hover:bg-slate-700"><MdOutlineFilterList size={24} /></button>
                </div>
                {renderFilter()}
            </div>

            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-center font-semibold bg-primary-500 text-white p-3 border-primary-500 first:rounded-l-xl last:rounded-r-xl">No</th>
                        {renderHeader()}
                    </tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            <Pagination
                totalRecords={totalRecords}
                totalPage={totalPage}
                page={dataPage} />
            <SideModal
                title="Add Data"
                dataForm={dataForm}
                action={() => submitCreate()}
                isShow={isShowModal}
                setShow={setShowModal}
                data={formData}
                setData={setFormData}
                error={formError}
                isLoading={isRequesting} />
            <Confirmation
                isShow={isShowConfirmation}
                icon="exclamation-triangle"
                title="Are you sure?"
                message="Do you really want to delete this records? This process cannot be undone"
                onConfirm={() => deleteData(deleteId)}
                onCancel={() => setShowConfirmation(false)}
                isLoading={isRequesting} />
        </div>
    )
}