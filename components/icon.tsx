import {
    FaHouseUser,
    FaUser,
    FaBars,
    FaChevronRight,
    FaChevronDown,
    FaEnvelope,
    FaBell,
    FaSignOutAlt,
    FaKey,
    FaRedoAlt,
    FaCheckCircle,
    FaTimes,
    FaTimesCircle,
    FaExclamationTriangle,
    FaUserCog,
    FaHistory
} from "react-icons/fa";

import { BsBoxSeam } from "react-icons/bs";
import { RxDashboard } from 'react-icons/rx'

export default function Icon({ name = "", color = "black", style = {}, className = "", size = 16 }: { name?: string, color?: string, style?: React.CSSProperties, className?: string, size?: number }) {

    const renderIcon = (name: string, props: { color: string, style: React.CSSProperties, className: string, size: number }) => {
        switch (name) {
            case "home":
                return <FaHouseUser {...props} />
            case "users":
                return <FaUser {...props} />
            case "menu":
                return <FaBars {...props} />
            case "chevron-right":
                return <FaChevronRight {...props} />
            case "chevron-down":
                return <FaChevronDown {...props} />
            case "envelope":
                return <FaEnvelope {...props} />
            case "bell":
                return <FaBell {...props} />
            case "sign-out":
                return <FaSignOutAlt {...props} />
            case "refresh":
                return <FaRedoAlt {...props} />
            case "key":
                return <FaKey {...props} />
            case "check":
                return <FaCheckCircle {...props} />
            case "times":
                return <FaTimes {...props} />
            case "times-circle":
                return <FaTimesCircle {...props} />
            case "exclamation-triangle":
                return <FaExclamationTriangle  {...props} />
            case "user-cog":
                return <FaUserCog  {...props} />
            case "history":
                return <FaHistory {...props} />
            case "box":
                return <BsBoxSeam {...props} />
            case "dashboard":
                return <RxDashboard {...props} />

        }
    }

    return (
        <>
            {renderIcon(name, { color, style, className, size })}
        </>
    )
}