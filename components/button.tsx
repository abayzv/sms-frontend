import { useLoading } from "@/store/useLoading";

interface IButton {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    onClick?: () => void;
    title?: string;
    color?: "primary" | "secondary" | "danger" | "warning" | "success" | "purple";
}

export const Button: React.FC<IButton> = ({ children, className, onClick, type = "button", title, color = "primary" }) => {
    const { isLoading } = useLoading();

    enum Color {
        primary = "bg-primary-500 hover:bg-opacity-80 text-white",
        secondary = "bg-slate-600 hover:bg-opacity-80 text-white",
        danger = "bg-red-500 hover:bg-opacity-80 text-white",
        warning = "bg-yellow-300 hover:bg-opacity-80 text-white",
        success = "bg-green-400 hover:bg-opacity-80 text-white",
        purple = "bg-purple-500 hover:bg-opacity-80 text-white",
    };

    return (
        <button title={title} onClick={onClick} type={type} className={`${Color[color]} p-3 rounded-xl ${className} disabled:bg-slate-600`} disabled={isLoading}>{children}</button>
    );
};