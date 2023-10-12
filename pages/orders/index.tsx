import Crud from "../../components/crud"

Orders.auth = {}

export default function Orders() {

    return (
        <Crud
            template={[]}
            title="Order List"
            url="/orders"
            addForm={[
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
            canAddData={true}
            canEditData={true}
            canDeleteData={true}
        />
    )
}   