import { useState } from "react"
import Icon from "./icon"
import { Transition } from "@headlessui/react"

export default function Alert({ message, type }: { message: string, type: string }) {
    const [isShow, setShow] = useState(true)

    const renderAlert = () => {
        if (type === "success")
            return (
                <div className="bg-white p-5 mb-5 flex items-center shadow-sm">
                    <div className="text-4xl px-4 py-2 border-l-4 border-emerald-400 text-emerald-400">
                        <Icon name="check" />
                    </div>
                    <div>
                        <div className="font-semibold">Success</div>
                        <p className="text-neutral-500">{message}</p>
                    </div>
                    <button className="ml-auto text-neutral-300 px-3" onClick={() => setShow(false)}>
                        <Icon name="times" />
                    </button>
                </div>
            )

    }
    return (
        <Transition
            show={isShow}
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