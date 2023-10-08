import { useForm, SubmitHandler } from "react-hook-form"
import { IFormInput } from "@/types/form";

interface IFormHooks {
    data: Array<IInput>;
    onSubmit: (data: IFormInput) => void;
}

interface IInput {
    name: string;
    defaultValue?: string | number;
    type: string;
    title?: string;
    placeholder?: string;
    description?: string;
}


export default function FormHook({ data, onSubmit }: IFormHooks) {
    const { register, watch, formState: { errors }, handleSubmit } = useForm<IFormInput>();


    const onsubmit = (data: IFormInput) => {
        onSubmit(data);
    }

    function Input({ name, defaultValue, type, title, placeholder, description }: IInput) {
        return (
            <div className="flex flex-col gap-2">
                {title && <label htmlFor={name} className="text-slate-600">{title}</label>}
                <input type={type} defaultValue={defaultValue} placeholder={placeholder} {...register(name, { required: true })} className="rounded-xl p-3 bg-primary-500 bg-opacity-5 border-primary-500 focus:ring-primary-500 text-slate-700" />
                {description && <span className="text-slate-400 text-sm">Notes: {description}</span>}
                {errors[name] && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
        )

    }

    return (
        <form onSubmit={handleSubmit(onsubmit)} className="p-2">
            {data.map((item, index) => {
                return (
                    <Input key={index} name={item.name} defaultValue={item.defaultValue} placeholder={item.placeholder} type={item.type} title={item.title} description={item.description} />
                )
            })}
            <div className="text-end">
                <button type="submit" className="bg-primary-500 hover:bg-opacity-80 text-white p-3 px-5 rounded-xl mt-5">Submit</button>
            </div>
        </form>
    )

}