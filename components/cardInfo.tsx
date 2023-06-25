import Icon from "./icon";
import {motion} from "framer-motion"

export default function CardInfo({icon, name, number, className = "bg-white"} : {icon: string, name: string, number: number, className?: string}){

    return(
        <motion.div
        whileHover={{ scale: 1.05, borderBottomColor: "#bfe6ff" }}
        transition={{ duration: 0.2 }}
        className={`p-7 border border-gray-200 border-b-4 border-b-primary-300 flex justify-between gap-3 ${className}`}>
            <div className="flex items-center justify-center gap-2 flex-col w-1/2">
                <motion.div
                whileHover={{ scale: 1.3 }}
                className="text-2xl text-gray-500 bg-gray-200 p-5 rounded-full">
                    <Icon name={icon} />
                </motion.div>
                <div>{name}</div>
            </div>
            <motion.div
            whileHover={{ scale: 1.05, color: "#00a3ff" }}
            className="flex items-center justify-center gap-5 w-1/2 text-5xl text-gray-500 font-bold">
                {number}
            </motion.div>
        </motion.div>
    )
}