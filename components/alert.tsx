import { useState } from "react"
import Icon from "./icon"
import { Transition } from "@headlessui/react"
import { useAlertStore } from "../lib/store"

export default function Alert() {
    const { alert, setAlert } = useAlertStore()

    const renderAlert = () => {
        if (alert.type === "success")
            return (
                <div className="bg-white p-5 mb-5 flex items-center shadow-sm">
                    <div className="text-4xl px-4 py-2 border-l-4 border-emerald-400 text-emerald-400">
                        <Icon name="check" />
                    </div>
                    <div>
                        <div className="font-semibold">Success</div>
                        <p className="text-neutral-500">{alert.message}</p>
                    </div>
                    <button className="ml-auto text-neutral-300 px-3" onClick={() => setAlert({isShowAlert: false})}>
                        <Icon name="times" />
                    </button>
                </div>
            )
        if (alert.type === "error")
            return (
                <div className="bg-white p-5 mb-5 flex items-center shadow-sm">
                    <div className="text-4xl px-4 py-2 border-l-4 border-red-400 text-red-400">
                        <Icon name="times-circle" />
                    </div>
                    <div>
                        <div className="font-semibold">Error</div>
                        <p className="text-neutral-500">{alert.message}</p>
                    </div>
                    <button className="ml-auto text-neutral-300 px-3" onClick={() => setAlert({isShowAlert: false})}>
                        <Icon name="times" />
                    </button>
                </div>
            )
        if (alert.type === "warning")
            return (
                <div className="bg-white p-5 mb-5 flex items-center shadow-sm">
                    <div className="text-4xl px-4 py-1 border-l-4 border-yellow-300 text-yellow-300">
                        <Icon name="exclamation-triangle" />
                    </div>
                    <div>
                        <div className="font-semibold">Warning</div>
                        <p className="text-neutral-500">{alert.message}</p>
                    </div>
                    <button className="ml-auto text-neutral-300 px-3" onClick={() => setAlert({isShowAlert: false})}>
                        <Icon name="times" />
                    </button>
                </div>
            )

    }
    return (
        <Transition
            show={alert.isShowAlert}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 translate-y-2"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition ease-in duration-300"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 translate-y-2"
        >
            {renderAlert()}
        </Transition>
    )
}