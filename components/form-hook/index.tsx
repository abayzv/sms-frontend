import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form"
import { IFormInput } from "@/types/form";
import { mutate } from "swr";
import { useDataTable } from "@/store/useDatatable";
import { Button } from "../button";
import InputTags from "./input-tags";

interface IFormHooks {
    data: Array<IInput>;
    onSubmit: (data: IFormInput) => Promise<void>;
    submitText?: string;
}

interface ISelectOption {
    value: string | number;
    label: string;
}

export interface IInput {
    /** Name for the input property */
    name: string;
    /** Default value for the input property */
    defaultValue?: string | number;
    /** Default value for the tags input property */
    defaultTags?: string[];
    /** Type must be one of the following: text, number, file, textarea, tags */
    type: string;
    /** Use options if type is select */
    options?: ISelectOption[];
    /** Label for the input property */
    title?: string;
    /** Placeholder for the input property */
    placeholder?: string;
    /** Desc for the input property */
    description?: string;
}

interface ITags {
    register: UseFormRegister<IFormInput>;
    name: string;
    defaultValue?: string[];
    placeholder?: string;
    required?: boolean;
    description?: string;
    title?: string;
}


export default function FormHook({ data, onSubmit, submitText = "Submit" }: IFormHooks) {
    const { register, watch, formState: { errors }, handleSubmit } = useForm<IFormInput>();
    const { url } = useDataTable()


    const onsubmit = (data: IFormInput) => {
        onSubmit(data).then(() => {
            mutate(url)
        })
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

    function Select({ name, defaultValue, type, title, placeholder, description, options }: IInput) {
        return (
            <div className="flex flex-col gap-2">
                {title && <label htmlFor={name} className="text-slate-600">{title}</label>}
                <select defaultValue={defaultValue} {...register(name, { required: true })} className="rounded-xl p-3 bg-primary-500 bg-opacity-5 border-primary-500 focus:ring-primary-500 text-slate-700">
                    {options?.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                {description && <span className="text-slate-400 text-sm">Notes: {description}</span>}
                {errors[name] && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
        )
    }

    function Password({ name, defaultValue, type, title, placeholder, description }: IInput) {
        return (
            <div className="flex flex-col gap-2">
                {title && <label htmlFor={name} className="text-slate-600">{title}</label>}
                <input type={type} defaultValue={defaultValue} placeholder={placeholder} {...register(name, { required: true })} className="rounded-xl p-3 bg-primary-500 bg-opacity-5 border-primary-500 focus:ring-primary-500 text-slate-700" />
                {description && <span className="text-slate-400 text-sm">Notes: {description}</span>}
                {errors[name] && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
        )
    }

    function InputFile({ name, defaultValue, type, title, placeholder, description }: IInput) {
        return (
            <div className="flex flex-col gap-2">
                {title && <label htmlFor={name} className="text-slate-600">{title}</label>}
                <input type={type} defaultValue={defaultValue} placeholder={placeholder} {...register(name, { required: true })} className="rounded-xl bg-primary-500 bg-opacity-5 border-primary-500 focus:ring-primary-500 text-slate-700" />
                {description && <span className="text-slate-400 text-sm">Notes: {description}</span>}
                {errors[name] && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
        )
    }

    function Textarea({ name, defaultValue, type, title, placeholder, description }: IInput) {
        return (
            <div className="flex flex-col gap-2">
                {title && <label htmlFor={name} className="text-slate-600">{title}</label>}
                <textarea defaultValue={defaultValue} placeholder={placeholder} {...register(name, { required: true })} className="rounded-xl bg-primary-500 bg-opacity-5 border-primary-500 focus:ring-primary-500 text-slate-700" rows={5} />
                {description && <span className="text-slate-400 text-sm">Notes: {description}</span>}
                {errors[name] && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
        )
    }

    function Tags({ name, defaultValue, title, placeholder, description }: ITags) {
        return (
            <div className="flex flex-col gap-2">
                {title && <label htmlFor={name} className="text-slate-600">{title}</label>}
                <InputTags name={name} defaultValue={defaultValue} register={register} placeholder={placeholder} />
                {description && <span className="text-slate-400 text-sm">Notes: {description}</span>}
                {errors[name] && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)} className="p-2">
            <div className="flex flex-col gap-3">
                {data.map((item, index) => {

                    switch (item.type) {
                        case "text":
                            return (
                                <Input key={index} name={item.name} defaultValue={item.defaultValue} placeholder={item.placeholder} type={item.type} title={item.title} description={item.description} />
                            )
                        case "password":
                            return (
                                <Password key={index} name={item.name} defaultValue={item.defaultValue} placeholder={item.placeholder} type={item.type} title={item.title} description={item.description} />
                            )
                        case "number":
                            return (
                                <Input key={index} name={item.name} defaultValue={item.defaultValue} placeholder={item.placeholder} type={item.type} title={item.title} description={item.description} />
                            )
                        case "file":
                            return (
                                <InputFile key={index} name={item.name} defaultValue={item.defaultValue} placeholder={item.placeholder} type={item.type} title={item.title} description={item.description} />
                            )
                        case "textarea":
                            return (
                                <Textarea key={index} name={item.name} defaultValue={item.defaultValue} placeholder={item.placeholder} type={item.type} title={item.title} description={item.description} />
                            )
                        case "tags":
                            return (
                                <Tags key={index} name={item.name} defaultValue={item.defaultTags} placeholder={item.placeholder} title={item.title} description={item.description} register={register} />
                            )
                        case "select":
                            return (
                                <Select key={index} name={item.name} defaultValue={item.defaultValue} placeholder={item.placeholder} type={item.type} title={item.title} description={item.description} options={item.options} />
                            )
                    }
                })}
            </div>
            <div className="text-end mt-5">
                <Button type="submit">{submitText}</Button>
            </div>
        </form>
    )

}