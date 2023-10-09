import { IFormInput } from "@/types/form"
import Datatable from "../../../components/datatable"
import FormHook from "../../../components/form-hook"
import Modal from "../../../components/form-hook/modal"
import Fadein from "../../../components/transition/fade-in"
import { axiosAuth } from "@/lib/axios"

OfficialStores.auth = {}

export default function OfficialStores() {

    const handleSubmit = (data: IFormInput) => {
        axiosAuth.post("/official-stores", data).then((res) => {
            alert("Success")
        })
    }

    const handleDelete = (id: string) => {
        axiosAuth.delete(`/official-stores/${id}`).then((res) => {
            alert("Success")
        })
    }

    return (
        <Fadein>
            <div>
                <div className="mb-5">
                    <Modal trigger="Add Official Store">
                        <FormHook data={[
                            {
                                name: "name",
                                type: "text",
                                title: "Name",
                                placeholder: "Enter Official Store Name",
                            },
                            {
                                name: "picture_url",
                                type: "text",
                                title: "Picture",
                                placeholder: "Insert Link URL",
                            }
                        ]}
                            onSubmit={(data) => handleSubmit(data)}
                        />
                    </Modal>
                </div>

                <Datatable title="Official Store" url="/official-stores" header={["picture_url|picture", "name", "action"]} action={[
                    {
                        name: "Detail",
                        route: "/official-stores/:id"
                    },
                    {
                        name: "Edit",
                        route: "/official-stores/edit/:id"
                    },
                    {
                        name: "Delete",
                        route: "/official-stores",
                        action: (id: string) => handleDelete(id)
                    }
                ]} />
            </div>
        </Fadein>
    )
}   