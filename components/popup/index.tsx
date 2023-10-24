import React, { useState } from "react";
import { usePopup } from "@/store/usePopup";
import { GoAlert } from "react-icons/go";
import { HiCheckCircle } from "react-icons/hi"

interface PopUpProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    showButton?: boolean;
}

const PopUp: React.FC<PopUpProps> = ({ trigger, children, showButton = true }) => {
    const { isOpen, open, close, type, onConfirm } = usePopup();

    const onClose = () => {
        if (typeof onConfirm === "function") {
            onConfirm()
            close()
        } else {
            close()
        }
    }

    const renderIcon = () => {
        switch (type) {
            case "success":
                return <HiCheckCircle size={50} className="text-primary-500" />
            case "error":
                return <GoAlert size={50} color="#DC2626" />
        }
    }

    return (
        <>
            {showButton && (
                <button className="bg-sky-500 text-white px-3 py-2 rounded-md"
                    onClick={open}>{trigger}</button>
            )}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
                    <div className="bg-white p-5 py-10 rounded-xl min-w-[500px]">
                        <div className="w-full flex flex-col items-center">
                            {renderIcon()}
                            {children}
                        </div>
                        <div className="text-center">
                            <button onClick={onClose} className="mt-5 bg-primary-500 text-white px-5 py-2 rounded-xl">Ok</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PopUp;
