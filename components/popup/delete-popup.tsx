import React from "react";
import { useDeletePopup } from "@/store/useDeletePopup";
import { GoAlert } from "react-icons/go";
import { motion } from "framer-motion";
import { mutate } from "swr";


const DeletePopUp: React.FC = () => {
    const { isOpen, close, message, onDelete, url } = useDeletePopup();

    const handleSubmit = () => {
        onDelete().then(() => {
            mutate(url)
            close()
        })
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
                    <motion.div
                        animate={{
                            opacity: [0, 1],
                            scale: [0.5, 1],
                        }}
                        className="bg-white p-5 py-10 rounded-xl min-w-[500px]">
                        <div className="w-full flex flex-col items-center text-red-500">
                            <GoAlert size={42} />
                            <p className="w-2/3 text-center mt-5 text-gray-500">
                                {message}
                            </p>
                        </div>
                        <div className="flex gap-3 justify-center">
                            <button onClick={close} className="mt-5 bg-red-500 text-white px-5 py-2 rounded-xl">Cancel</button>
                            <button onClick={handleSubmit} className="mt-5 bg-primary-500 text-white px-5 py-2 rounded-xl">Ok</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default DeletePopUp;
