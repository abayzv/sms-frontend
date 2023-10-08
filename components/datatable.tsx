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

const actionDropwdown: Array<DropdownActions> = [
]

export default function Datatable({ url, filter, header, title, allowCreate = true, action = actionDropwdown, dataForm = [] }: { url: string, filter?: Array<string>, header: Array<string>, title: string, allowCreate?: boolean, action?: Array<DropdownActions>, dataForm?: Array<DataForm> }) {
    const axiosAuth = useAxios()
    const [totalPage, setTotalPage] = useState(0)
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
    const show = searchParams?.get("show")
    const router = useRouter()
    const path = usePathname() as string
    const { mutate } = useSWRConfig()
    const { data: session } = useSession()

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
        "superadmin" = "bg-yellow-100 border border-yellow-200",
        "admin" = "bg-red-100 border border-red-200",
        "teacher" = "bg-green-100 border border-green-200",
        "student" = "bg-blue-100 border border-blue-200"
    }

    const { data, error, isLoading } = swr(url, async (url) => {
        const res = await axiosAuth.get(url, {
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

        const renderTitle = (name: string) => {
            // if name has | then split it then return the second element
            if (name.includes("|")) {
                const splitName = name.split("|")
                return splitName[1]
            }
            return name
        }

        return headerElement.map((item, index) => {
            if (item === "createdAt") return <th key={index} className="text-center bg-primary-100 border p-3 font-semibold">CREATED AT</th>
            return <th key={index} className="text-center bg-slate-900 text-white p-3 font-semibold border-slate-900">{renderTitle(item).toUpperCase()}</th>
        })

    }

    const renderBody = () => {
        // each header element will be the key of the data
        if (isLoading) return <tr><td colSpan={headerElement.length} className="border-b border-gray-200 text-center p-3">Loading...</td></tr>
        if (!data) return <tr><td colSpan={headerElement.length + 1} className="border-b border-gray-200 text-center p-3">No Data</td></tr>

        const { dataSet } = data as any
        if (dataSet.length === 0) return <tr><td colSpan={headerElement.length + 1} className="border-b border-gray-200 text-center p-3">No Data</td></tr>

        return dataSet.map((item: Array<any>, index: number) => {
            return (
                <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                    <td className="border text-neutral-600 border-gray-200 text-center p-3">{index + 1}.</td>
                    {headerElement.map((key: any, index) => {
                        // if key has | then split it then return the first element
                        if (key.includes("|")) {
                            const splitKey = key.split("|")
                            key = splitKey[0]
                        }

                        if (key === "action") return (
                            <td key={index} className="border text-neutral-600 border-gray-200 text-center p-3">
                                {/* @ts-ignore */}
                                <Action action={action} className="bg-primary-500 text-white rounded-lg p-2 px-5" id={item.id} />
                            </td>
                        )
                        if (key === "role") return (
                            <td key={index} className="border text-neutral-600 border-gray-200 text-center p-3">
                                {/* @ts-ignore */}
                                <span className={`rounded-lg p-2 px-5 ${RoleColor[item[key]]}`}>{item[key]}</span>
                            </td>
                        )
                        if (!item[key]) return (
                            <td key={index} className="border text-neutral-600 border-gray-200 p-3">
                                <span className="rounded-lg p-2 px-5 bg-red-100 border border-red-200 text-red-500">Not Filled</span>
                            </td>
                        )
                        if (key === "createdAt") return <td key={index} className="border text-neutral-600 border-gray-200 text-end p-3">{FormatDate(item[key])}</td>

                        if (["media_url", "image_url", "picture_url"].includes(key)) return (
                            <td key={index} className="border text-neutral-600 border-gray-200 p-3">
                                <img src={item[key]} alt="" className="w-20 h-20 object-cover object-center border rounded-xl" />
                            </td>
                        )

                        return <td key={index} className="border text-neutral-600 border-gray-200 p-3">{item[key]}</td>
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

                        if (item === "endDate" || item === "startDate") return (
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

    // add delete action
    action = [
        ...action,
        {
            name: "Delete",
            route: "/users/delete",
            action: (id: string) => {
                setShowConfirmation(true)
                setDeleteId(id)
            }
        },
    ]
    // End add delete action

    useEffect(() => {
        mutate(url)

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
        <div className="w-full bg-white p-5 rounded-xl border-b-4 border-slate-300 relative">
            {/* <span className="absolute bg-primary-500 text-white top-0 left-6 p-2">{title}</span> */}
            {/* {allowCreate && (
                <button className="absolute bg-primary-500 hover:bg-primary-400 text-white top-0 left-6 p-2" onClick={() => setShowModal(true)}>+Add {title}</button>
            )} */}

            <div className="relative mb-5">
                {/* <div className={`relative mb-5 ${allowCreate && "mt-10"}`}> */}
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
                    <button className="p-2 px-5 text-white rounded-md bg-slate-900 hover:bg-slate-700" onClick={() => search()}>Search</button>
                </div>
                {renderFilter()}
            </div>

            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-center font-semibold bg-slate-900 text-white p-3 border-slate-900">No</th>
                        {renderHeader()}
                    </tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            <Pagination
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