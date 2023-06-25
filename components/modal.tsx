import { motion } from "framer-motion"
import Icon from "./icon";

export interface ConfirmationProps {
    isShow: boolean;
    icon: string;
    title?: string;
    message: string;
    onConfirm: Function;
    onCancel: Function;
    isLoading: boolean;
}

export function Confirmation({ icon, title, message, onConfirm, onCancel, isShow, isLoading }: ConfirmationProps) {

    if (!isShow) return null
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-0 left-0 z-50 bg-black h-screen w-screen bg-opacity-10 flex items-center justify-center">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                }}
                className="bg-white w-1/3 p-5 min-h-[300px] rounded-lg shadow-lg flex flex-col  items-center gap-3">
                <span className="text-7xl mt-2 text-yellow-300">
                    <Icon name={icon} />
                </span>
                <h1 className="text-neutral-500 text-2xl">{title}</h1>
                <p className="text-neutral-400">{message}</p>
                <div className="mt-5 flex gap-2 mx-auto">
                    <button className="p-3 bg-gray-400 hover:bg-gray-300 text-white rounded-lg min-w-[150px] disabled:bg-gray-300" onClick={() => onCancel()} disabled={isLoading}>Cancel</button>
                    <button className="p-3 bg-primary-400 hover:bg-primary-300 text-white rounded-lg min-w-[150px] disabled:bg-gray-300" onClick={() => onConfirm()} disabled={isLoading}>Confirm</button>
                </div>
            </motion.div>
        </motion.div>
    )
}