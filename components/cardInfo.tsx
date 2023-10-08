import Icon from "./icon";
import { motion } from "framer-motion"

export default function CardInfo({ icon, name, values, className = "bg-white", iconColor = "black", variant = "style-1" }: { icon: string, name: string, values: string, className?: string, iconColor?: string, variant?: string }) {

    const variants = (variant: string) => {
        switch (variant) {
            case "style-2":
                return (
                    <>
                        <div className="w-[150px] h-[150px] bg-black rounded-full bg-opacity-10 absolute -top-16 right-10" />
                        <div className="w-[200px] h-[200px] bg-black rounded-full bg-opacity-10 absolute -top-20 -right-16" />
                        <div className="w-[150px] h-[150px] bg-black rounded-full bg-opacity-10 absolute -bottom-16 -left-4" />
                    </>
                )
            case "style-1":
                return (
                    <>
                        <div className="w-[150px] h-[150px] bg-white rounded-full bg-opacity-10 absolute -top-16 -right-16" />
                        <div className="w-[150px] h-[150px] bg-white rounded-full bg-opacity-10 absolute top-0 -right-16" />
                        <div className="w-[150px] h-[150px] bg-white rounded-full bg-opacity-10 absolute top-0 -right-16" />
                    </>
                )
        }

    }

    return (
        <motion.div
            className={`${className} p-5 rounded-xl relative overflow-clip`}>
            <div className="flex items-start justify-center gap-2 flex-col">
                <motion.div
                    className="text-2xl text-gray-500 bg-black bg-opacity-20 p-4 rounded-full">
                    <Icon name={icon} color={iconColor} size={20} />
                </motion.div>
                <div className="text-4xl font-bold">{values}</div>
                <div className="font-semibold opacity-70">{name}</div>
                {variants(variant)}
            </div>
        </motion.div>
    )
}