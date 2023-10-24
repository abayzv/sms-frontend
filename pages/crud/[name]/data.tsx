import axios, { axiosAuth } from "@/lib/axios";
import Card from "../../../components/card";
import Crud from "../../../components/crud";
import Layout from "../../../components/layout/main";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSchema } from "@/hooks/crud/useSchema";

export default function CrudData() {
    const router = useRouter();
    const { name } = router.query;
    const [template, setTemplate] = useState<any>([]);
    const [addForm, setAddForm] = useState<any>([]);

    const { data, isLoading } = useSchema(name as string);

    useEffect(() => {

        if (data) {
            const { data: schema } = data;
            const temp: any = [];
            const tempAddForm: any = [];
            schema.forEach((item: any) => {
                temp.push({
                    header: item.name,
                    key: item.name,
                })

                tempAddForm.push({
                    name: item.name,
                    type: item.type,
                    // title: item.name,
                })
            })
            setTemplate(temp)
            setAddForm(tempAddForm)
        }

    }, [name, data])



    return (
        <Layout>
            <Card title={`${name} data`}>
                <div className="p-2">
                    <Crud
                        template={template}
                        title="Crud Details"
                        addForm={addForm}
                        tableOnly={true}
                        url={`http://localhost:8000/api/v1/${name}`}
                        canAddData={true}
                    />
                </div>
            </Card>
        </Layout>
    )
}