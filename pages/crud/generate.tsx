import axios from "axios";
import { Button } from "../../components/button";
import Card from "../../components/card";
import FormHook from "../../components/form-hook";
import Layout from "../../components/layout/main";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { usePopup } from "@/store/usePopup";
import { useRouter } from "next/router";

interface IField {
    name: string;
    type: string;
    input: string;
    nullable?: string;
    default?: string;
}

export default function GenerateCrudPage() {
    const [fields, setFields] = useState<IField[]>([])
    const { success } = usePopup()

    const router = useRouter()

    const submitField = async (data: any) => {
        setFields([...fields, data])
    }

    const generateCrud = async (data: any) => {

        if (fields.length === 0) {
            return alert("Please add at least one field")
        }

        const dataFields = fields.map((field) => {
            // if field.nullable is "true" then set it to true, else set it to false
            const data: IField = {
                name: field.name,
                type: field.type,
                input: field.input,
            }

            const nullable = field.nullable === "true" ? true : false
            const defaultData = field.default === "null" ? null : field.default

            nullable && (data["nullable"] = "true")
            defaultData && (data["default"] = defaultData)

            return data
        }
        )

        data["fields"] = [...dataFields]

        axios.post("http://localhost:8000/api/v1/crud/generate", data).then((res) => {
            toast.success("Crud has been generated!", {
                position: 'top-center',
            });
            success({
                messaage: "Crud has been generated!",
                onConfirm: () => {
                    router.push("/crud/list")
                }
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Layout>
            <Toaster />
            <div className="grid grid-cols-2 gap-5">
                <Card title="Crud Information">
                    <div>
                        <FormHook data={[
                            {
                                name: "name",
                                type: "text",
                                title: "Table Name",
                                description: "This will be the name of the table in the database, replace spaces with underscore (_), use a plural, example: users, posts, categories"
                            },
                            {
                                name: "model_name",
                                type: "text",
                                title: "Model Name",
                                description: "This will be the name of the model, use a singular, example: User, Post, Category"
                            },
                        ]}
                            onSubmit={generateCrud}
                            submitText="Generate Crud"
                        />
                    </div>
                </Card>
                <Card title="Crud Input">
                    <div>
                        <FormHook data={[
                            {
                                name: "name",
                                type: "text",
                                title: "Field Name",
                                description: "This will be the name of the field in the database, replace spaces with underscore (_)"
                            },
                            {
                                name: "type",
                                type: "select",
                                title: "Data Type",
                                description: "This will be the type of the field in the database",
                                options: [
                                    {
                                        label: "String",
                                        value: "string"
                                    },
                                ],
                                defaultValue: "string"
                            },
                            {
                                name: "input",
                                type: "select",
                                title: "Input Type",
                                description: "This will be the type of the input in the form",
                                options: [
                                    {
                                        label: "Text",
                                        value: "text"
                                    },
                                    {
                                        label: "File",
                                        value: "file"
                                    }
                                ],
                                defaultValue: "text"
                            },
                            {
                                name: "nullable",
                                type: "select",
                                title: "Nullable",
                                description: "Is this field nullable?",
                                options: [
                                    {
                                        label: "Yes",
                                        value: "true"
                                    },
                                    {
                                        label: "No",
                                        value: "false"
                                    }
                                ],
                                defaultValue: "false"
                            },
                            {
                                name: "default",
                                type: "text",
                                title: "Default Value",
                                defaultValue: "null",
                                description: "This will be the default value of the field in the database"
                            },
                        ]}
                            onSubmit={submitField}
                            submitText="Add Field"
                        />
                    </div>
                </Card>
            </div>
            <div className="mt-5">
                <Card title="Crud Preview">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-3 text-white bg-primary-500">Field Name</th>
                                <th className="p-3 text-white bg-primary-500">Data Type</th>
                                <th className="p-3 text-white bg-primary-500">Input Type</th>
                                <th className="p-3 text-white bg-primary-500">Nullable</th>
                                <th className="p-3 text-white bg-primary-500">Default Value</th>
                                <th className="p-3 text-white bg-primary-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.length === 0 && <tr>
                                <td className="text-center border-b border-b-gray-100 p-5" colSpan={6}>No fields added</td>
                            </tr>}
                            {fields.map((field: any, index) => (
                                <tr key={index}>
                                    <td className="text-center border-b border-b-gray-100 p-2">{field.name}</td>
                                    <td className="text-center border-b border-b-gray-100 p-2">{field.type}</td>
                                    <td className="text-center border-b border-b-gray-100 p-2">{field.input}</td>
                                    <td className="text-center border-b border-b-gray-100 p-2">{field.nullable}</td>
                                    <td className="text-center border-b border-b-gray-100 p-2">{field.default}</td>
                                    <td className="text-center border-b border-b-gray-100 p-2">
                                        <Button className="mr-1" color="danger" onClick={() => {
                                            setFields(fields.filter((item, i) => i !== index))
                                        }}>
                                            <FaTrash size={12} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </Layout>
    )
}