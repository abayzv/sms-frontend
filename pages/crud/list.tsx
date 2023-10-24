import Card from "../../components/card";
import Layout from "../../components/layout/main";
import { useCruds } from "@/hooks/crud/useCruds";

export default function CrudListPage() {
    const { data, isLoading } = useCruds()

    if (isLoading) return <p>Loading...</p>

    if (data.length === 0) return <p>No crud found</p>

    const { data: cruds } = data
    return (
        <Layout>
            <Card>
                {
                    cruds.map((crud: any, index: number) => (
                        <div key={index} className="flex flex-col gap-2">
                            <p className="text-gray-500">{crud}</p>
                        </div>
                    ))
                }
            </Card>
        </Layout>
    )
}