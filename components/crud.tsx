import { IFormInput } from "@/types/form"
import Datatable from "./datatable"
import FormHook, { IInput } from "./form-hook"
import Modal from "./form-hook/modal"
import Fadein from "./transition/fade-in"
import { useModal } from "@/store/useModal"
import { axiosAuth } from "@/lib/axios"
import { useDeletePopup } from "@/store/useDeletePopup"
import toast, { Toaster } from 'react-hot-toast';
import { DropdownActions } from "./tableAction"
import { ITemplate } from "@/types/datatable"

enum Action {
    edit = "edit",
    delete = "delete",
    detail = "detail"
}

export interface ICrud {
    url: string;
    title: string;
    template: ITemplate[];
    canAddData?: boolean;
    canViewDetails?: boolean;
    canDeleteData?: boolean;
    canEditData?: boolean;
    addForm?: IInput[];
    tableOnly?: boolean;
    message?: {
        addData?: string;
        deleteData?: string;
        editData?: string;
    }
}

export default function Crud({ url, title, template, message, addForm = [], canAddData, canViewDetails = false, canEditData = false, canDeleteData = false, tableOnly = false }: ICrud) {

    const action = [Action.detail, Action.edit, Action.delete]

    const { close: closeModal } = useModal()
    const { open: showDeletePopup, setDelete } = useDeletePopup()

    const header = template.map((item) => item.header)

    const handleSubmit = async (data: IFormInput) => {
        await axiosAuth.post(url, data)
        toast.success(message?.addData ? message.addData : `${title} has been added!`, {
            position: 'top-center',
        });
        closeModal()
    }

    const deleteItem = async (id: string) => {
        await axiosAuth.delete(`${url}/${id}`)
        toast.success(message?.deleteData ? message.deleteData : `${title} has been deleted!`, {
            position: 'top-center',
        });
    }

    const handleDelete = (id: string) => {
        setDelete(() => deleteItem(id))
        showDeletePopup()
    }

    const renderAction = (): DropdownActions[] => {
        let actions: DropdownActions[] = []

        for (const item in action) {
            if (action[item] === Action.detail && canViewDetails) {
                actions.push({
                    name: "Detail",
                    route: `${url}`
                })
            }

            if (action[item] === Action.edit && canEditData) {
                actions.push({
                    name: "Edit",
                    route: `${url}/edit`
                })
            }

            if (action[item] === Action.delete && canDeleteData) {
                actions.push({
                    name: "Delete",
                    route: `${url}/:id`,
                    action: (id: string) => handleDelete(id)
                })
            }
        }

        return actions
    }

    return (
        <Fadein>
            <Toaster />
            <div>
                {canAddData && (
                    <div className="mb-5">
                        <Modal trigger="Add Official Store">
                            <FormHook data={addForm}
                                onSubmit={(data) => handleSubmit(data)}
                            />
                        </Modal>
                    </div>
                )}

                {header.includes("action") ?
                    <Datatable title={title} url={url} template={template} action={renderAction()} tableOnly={tableOnly} /> :
                    <Datatable title={title} url={url} template={template} tableOnly={tableOnly} />
                }
            </div>
        </Fadein>
    )
}   