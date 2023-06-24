import swr from 'swr'
import useAxios from '@/lib/useAxios'

export default function Select({name, label, defaultValue, url, onChange, isError} : {name: string, label: string, defaultValue: string | number, url: string, onChange: React.ChangeEventHandler<HTMLSelectElement>, isError: any}){
    const axiosAuth = useAxios()
    const fetcher = (url: string) => axiosAuth.get(url).then(res => res.data)
    const { data: option, error, isLoading } = swr(url, fetcher)

    if(defaultValue === '') defaultValue = option?.data[0].value.toString()

    const renderOption = () => {
        if(isLoading) return <option>Loading...</option>
        if(error) return <option>Data not found</option>
        if(option) return option.data.map((item : {value: any, label: string}, index : any) => {
            return <option key={index} value={item.value}>{item.label}</option>
        })
    }

    const renderError = () => {
        if(isError) return "border-red-500"
    }

    return (
        <div className="grid gap-2">
            <label htmlFor={name} className='text-neutral-500'>{label}</label>
            <select name={name} className={`border border-gray-300 rounded-md p-3 w-full ${renderError()}`} placeholder={label} defaultValue={defaultValue} onChange={onChange}>
                {renderOption()}
            </select>
        </div>
    )
}