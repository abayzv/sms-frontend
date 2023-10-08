import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className }) => {
    return (
        <div className={`${className} bg-white p-5 rounded-xl`}>
            {title && (
                <div className="flex items-center justify-between mb-5">
                    <div className="font-semibold text-neutral-700">{title}</div>
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
