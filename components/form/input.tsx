export default function Input({name, label, defaultValue, type, onChange, isError} : {name: string, label: string, defaultValue: string | number, type: string, onChange: React.ChangeEventHandler<HTMLInputElement>, isError: any}){

    const renderError = () => {
        if(isError) return "border-red-500"
    }

    return (
        <div className="grid gap-2">
            <label htmlFor={name} className='text-neutral-500'>{label}</label>
            <input type={type} name={name} className={`border border-gray-300 rounded-md p-3 w-full ${renderError()}`} placeholder={label} defaultValue={defaultValue} onChange={onChange} />
        </div>
    )
}