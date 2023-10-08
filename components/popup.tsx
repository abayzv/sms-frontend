import React, { useState } from "react";

interface PopUpProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    showButton?: boolean;
}

const PopUp: React.FC<PopUpProps> = ({ trigger, children, showButton = true }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopUp = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {showButton && (
                <button className="bg-sky-500 text-white px-3 py-2 rounded-md"
                    onClick={togglePopUp}>{trigger}</button>
            )}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
                    <div className="bg-white p-5 py-10 rounded-xl min-w-[500px]">
                        {children}
                        <div className="text-center">
                            <button onClick={togglePopUp} className="mt-5 bg-[#3085C3] text-white px-5 py-2 rounded-xl">Ok</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PopUp;
