import Crud from "../../../components/crud"

OfficialStoresPage.auth = {}

export default function OfficialStoresPage() {

    return (
        <Crud
            template={[
                {
                    header: "store",
                    key: "name",
                    render: (item: any) => (
                        <div className="flex gap-2 items-center">
                            <img src={item.picture_url} className="w-14 h-14 rounded-md border" />
                            {item.name}
                        </div>
                    ),
                    itemAlign: "left",
                },
                {
                    header: "followers",
                    key: "followers_count",
                    itemAlign: "center",
                },
                {
                    header: "Store Id",
                    key: "_id",
                    itemAlign: "center",
                },
                {
                    header: "action",
                    key: "action",
                }
            ]}
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