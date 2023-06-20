import { FaHouseUser, FaUser, FaBars, FaChevronRight, FaChevronDown, FaEnvelope, FaBell, FaSignOutAlt } from "react-icons/fa";

export default function Icon({name = ""} : {name?: string}){

    const renderIcon = (name : string) => {
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

        }
    }

    return (
        <>
        {renderIcon(name)}
        </>
    )
}