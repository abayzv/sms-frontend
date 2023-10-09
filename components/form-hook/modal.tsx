import React from "react";
import { useModal } from "@/store/useModal";
import { TiTimes } from 'react-icons/ti'
import { motion } from "framer-motion";

interface ModalProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ trigger, children }) => {
    const { isOpen, open, close } = useModal();

    return (
        <>
            <button className="bg-primary-500 text-white p-3 rounded-xl hover:bg-opacity-80"
                onClick={open}>{trigger}</button>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
                    <motion.div
                        animate={
                            {
                                opacity: [0, 1],
                                scale: [0.5, 1]
                            }
                        }
                        className="bg-white p-5 py-10 rounded-xl min-w-[500px] relative">
                        <button className="absolute top-5 right-5 text-red-500" onClick={close}>
                            <TiTimes size={25} />
                        </button>
                        {children}
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default Modal;
