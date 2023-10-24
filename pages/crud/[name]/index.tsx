import { Button } from "../../../components/button";
import Card from "../../../components/card";
import Crud from "../../../components/crud";
import Layout from "../../../components/layout/main";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import Link from "next/link";
import { useEffect } from "react";

export default function CrudDetails() {
    const router = useRouter();
    const { name } = router.query;

    useEffect(() => {
        console.log(name)
    }, [name])

    if (!name) {
        return <></>
    }

    return (
        <Layout>
            <div className="flex justify-end mb-5 gap-2">
                <Link href={`/crud/${name}/data`}>
                    <Button color="purple" className="flex items-center">
                        <BsEyeFill className="mr-2" />
                        Show Data
                    </Button>
                </Link>
                <Button color="danger" className="flex items-center">
                    <FaTrash className="mr-2" />
                    Delete Crud
                </Button>
            </div>
            <Card title="Table Schema">
                <div className="p-2">
                    <Crud
                        template={[
                            {
                                header: 'field name',
                                key: 'name',
                            },
                            {
                                header: 'type',
                                key: 'type',
                            },
                            {
                                header: 'nullable',
                                key: 'nullable',
                                render: (item: any) => <>{item.nullable ? 'true' : 'false'}</>
                            },
                            {
                                header: 'default',
                                key: 'default',
                                render: (item: any) => <>{item.default ? item.default : 'not set'}</>
                            }
                        ]}
                        title="Crud Details"
                        tableOnly={true}
                        url={`http://localhost:8000/api/v1/crud/${name}`}
                    />
                </div>
            </Card>
        </Layout>
    )
}