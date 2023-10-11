import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "@/types/form";

interface InputTagsProps {
    /** React hook form register */
    register: UseFormRegister<IFormInput>;
    /** Name for the input property */
    name: string;
    /** Default value for the input property */
    defaultValue?: string[];
    /** Placeholder for the input property */
    placeholder?: string;
    /** Required for the input property */
    required?: boolean;
}

const InputTags = ({ defaultValue = [], register, placeholder, name, required = false }: InputTagsProps) => {
    const [tags, setTags] = useState<string[]>(defaultValue);

    const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const newTag = event.currentTarget.value.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                event.currentTarget.value = "";
            }
        }
    };

    const tagsToString = (tags: string[]) => tags.join(", ");

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
            <ul className="flex items-center gap-2 bg-primary-50 p-1 px-3 rounded-xl border border-primary-500 flex-wrap">
                {tags.map((tag) => (
                    <li key={tag} className="text-sm p-2 bg-gray-200 rounded-xl flex gap-3">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)}>x</button>
                    </li>
                ))}
                <li className="flex-grow">
                    <input type="text" onKeyDown={handleAddTag} className="border-none bg-transparent focus:ring-0 w-full" />
                </li>
            </ul>
            <input type="text" value={tagsToString(tags)} hidden {...register(name, { required })} placeholder={placeholder} />
        </div>
    );
};

export default InputTags;
