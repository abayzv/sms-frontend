import { useEffect, useState } from "react"
import Card from "../../components/card"
import FormHook from "../../components/form-hook"
import Image from "next/image"
import { AiFillCheckCircle } from "react-icons/ai"
import { BsBoxSeam } from "react-icons/bs"
import { FaTimesCircle } from "react-icons/fa"
import { BiMemoryCard } from "react-icons/bi"
import { HiOutlineServer, HiOutlineDatabase } from "react-icons/hi"
import { Button } from "../../components/button"
import { IFormInput } from "@/types/form"
import axios from "@/lib/axios"
import Layout from "../../components/layout/main"

export default function Server() {
    const [data, setData] = useState([])

    enum ServerName {
        "scraper-local-development" = "Products Service",
        "redis/redis-stack:latest" = "Redis",
        "mongo:latest" = "Mongo DB",
        "midtrans-services-api" = "Midtrans Services",
        "abayzv/postgres" = "Postgres Sql",
        "abayzv/auth-service-api" = "Auth Services",
        "abayzv/wa-services-api:latest" = "Whatsapp Services"
    }

    const renderStatus = (status: string) => {
        if (status === "running") {
            return (
                <div className="text-center text-green-500 flex flex-col items-center gap-1">
                    <AiFillCheckCircle size={32} />
                    <span className="text-sm">Available</span>
                </div>
            )
        } else {
            return (
                <div className="text-center text-red-500 flex flex-col items-center gap-1">
                    <FaTimesCircle size={32} />
                    <span className="text-sm">Unavailable</span>
                </div>
            )
        }

    }

    const renderIcon = (name: string) => {
        switch (name) {
            case "scraper-local-development":
                return <BsBoxSeam size={28} className="text-gray-600" />
            case "redis/redis-stack:latest":
                return <BiMemoryCard size={28} className="text-gray-600" />
            case "mongo:latest":
                return <HiOutlineDatabase size={28} className="text-gray-600" />
            case "abayzv/postgres":
                return <HiOutlineDatabase size={28} className="text-gray-600" />
            case "midtrans-services-api":
                return <HiOutlineServer size={28} className="text-gray-600" />
            case "abayzv/auth-service-api":
                return <HiOutlineServer size={28} className="text-gray-600" />
            case "abayzv/wa-services-api:latest":
                return <HiOutlineServer size={28} className="text-gray-600" />
        }
    }

    const handleLogin = async (data: IFormInput) => {
        try {
            const res = await axios.post("https://api-mahestore.mahesadev.com/api/v1/server/status", data)
            setData(res.data.data)
        } catch (error) {
            alert("Login Failed")
        }
    }

    if (data.length === 0)
        return (
            <Layout>
                <div className="w-1/2 mx-auto h-[calc(100vh-14rem)]">
                    <Card className="w-full">
                        <div className="text-center flex flex-col gap-2">
                            <h1 className="text-2xl font-bold text-primary-500">Server Login</h1>
                            <p className="text-gray-500">Please login to access the server</p>
                        </div>
                        <FormHook data={[
                            {
                                name: "username",
                                type: "text",
                                title: "Username",
                            },
                            {
                                name: "password",
                                type: "password",
                                title: "Password",
                            }
                        ]}
                            onSubmit={handleLogin}
                        />
                    </Card>
                </div>
            </Layout>
        )

    return (
        <Layout>
            <Card className="flex flex-col items-center gap-2">
                <Image src="/static/images/server.png" width={1000} height={600} alt="server" className="w-[300px] xl:w-[400px]" />
                <div className="flex flex-col gap-3 items-center">
                    <h1 className="text-xl xl:text-3xl font-semibold text-center">All Services Are Up and Running</h1>
                    <p className="text-gray-500">Last updated Today, 14.45 WIB</p>
                </div>
                <ul className="grid xl:grid-cols-3 gap-5 w-full mt-5">
                    {data.map(({ name, status, state }, index) => {
                        return (
                            <li key={index} className="p-3 border flex justify-between">
                                <div className="flex gap-3 items-center">
                                    {renderIcon(name)}
                                    <div>
                                        <h3 className="text-lg font-medium">{ServerName[name]}</h3>
                                        <p className="text-sm text-gray-400">{status}</p>
                                    </div>
                                </div>
                                {renderStatus(state)}
                            </li>
                        )
                    })}
                </ul>
                {/* <a href="/"><Button className="mt-5 px-10">Back To Home</Button></a> */}
            </Card>
        </Layout>
    )
}