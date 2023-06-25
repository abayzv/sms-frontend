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

export default function Icon({ name = "" }: { name?: string }) {

    const renderIcon = (name: string) => {
        switch (name) {
            case "home":
                return <FaHouseUser />
            case "users":
                return <FaUser />
            case "menu":
                return <FaBars />
            case "chevron-right":
                return <FaChevronRight />
            case "chevron-down":
                return <FaChevronDown />
            case "envelope":
                return <FaEnvelope />
            case "bell":
                return <FaBell />
            case "sign-out":
                return <FaSignOutAlt />
            case "refresh" :
                return <FaRedoAlt />
            case "key":
                return <FaKey />
            case "check":
                return <FaCheckCircle />
            case "times":
                return <FaTimes />
            case "times-circle":
                return <FaTimesCircle />
            case "exclamation-triangle":
                return <FaExclamationTriangle />
            case "user-cog":
                return <FaUserCog />
            case "history":
                return <FaHistory />

        }
    }

    return (
        <>
            {renderIcon(name)}
        </>
    )
}