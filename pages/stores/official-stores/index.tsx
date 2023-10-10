import { IFormInput } from "@/types/form"
import Datatable from "../../../components/datatable"
import FormHook from "../../../components/form-hook"
import Modal from "../../../components/form-hook/modal"
import Fadein from "../../../components/transition/fade-in"
import { useModal } from "@/store/useModal"
import { axiosAuth } from "@/lib/axios"
import { useDeletePopup } from "@/store/useDeletePopup"
import toast, { Toaster } from 'react-hot-toast';

OfficialStores.auth = {}

export default function OfficialStores() {

    const { close: closeModal } = useModal()
    const { open: showDeletePopup, setDelete } = useDeletePopup()

    const handleSubmit = async (data: IFormInput) => {
        await axiosAuth.post("/official-stores", data)
        toast.success('Official Store has been added!', {
            position: 'top-center',
        });
        closeModal()
    }

    const deleteItem = async (id: string) => {
        await axiosAuth.delete(`/official-stores/${id}`)
        toast.success('Official Store has been deleted!', {
            position: 'top-center',
        });
    }

    const handleDelete = (id: string) => {
        setDelete(() => deleteItem(id))
        showDeletePopup()
    }

    return (
        <Fadein>
            <Toaster />
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