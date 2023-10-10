import Crud from "../../../components/crud"

OfficialStores.auth = {}

export default function OfficialStores() {

    return (
        <Crud
            header={["picture_url|picture", "name", "action"]}
            title="Official Store"
            url="/official-stores"
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