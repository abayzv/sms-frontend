import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className }) => {
    return (
        <div className={`${className} bg-white rounded-xl`}>
            {title && (
                <div className="flex items-center justify-between border-b border-slate-300 p-5">
                    <div className="font-semibold text-neutral-700">{title}</div>
                </div>
            )}
            <div className='p-5'>
                {children}
            </div>
        </div>
    );
};

export default Card;
