import {motion} from "framer-motion"

export default function Fadein({children}: {children: React.ReactNode}) {
    return (
        <motion.div
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
}