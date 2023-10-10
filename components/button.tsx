import { useLoading } from "@/store/useLoading";

interface IButton {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    onClick?: () => void;
}

export const Button: React.FC<IButton> = ({ children, className, onClick, type = "button" }) => {
    const { isLoading } = useLoading();

    return (
        <button onClick={onClick} type={type} className={`bg-primary-500 hover:bg-opacity-80 text-white p-3 rounded-xl ${className} disabled:bg-slate-600`} disabled={isLoading}>{children}</button>
    );
};