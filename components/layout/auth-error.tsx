export default function AuthError() {
    return (
        <div className="flex w-[100vw] h-[100vh] justify-center items-start">
            <div>
                <div className="text-2xl font-bold text-red-500">Error</div>
                <div className="text-xl font-bold text-gray-500">Something went wrong</div>
                <div className="text-gray-400">Please try again later</div>
            </div>
        </div>
    )
}