import Crud from "../../components/crud"
import formatPrice from "@/utils/formatPrice"

ProductsPage.auth = {}

export default function ProductsPage() {

    return (
        <Crud
            template={[
                {
                    header: "Product",
                    key: "name",
                    render: (item: any) => (
                        <div className="flex gap-2 items-center">
                            <img src={item.media_url} className="w-14 h-14 rounded-md border" />
                            {item.name}
                        </div>
                    ),
                    itemAlign: "left",
                },
                {
                    header: "price",
                    key: "price",
                    itemAlign: "center",
                    render: (item: any) => <>{formatPrice(item.price)}</>
                },
                {
                    header: "category",
                    key: "category",
                    itemAlign: "center",
                },
                {
                    header: "action",
                    key: "action",
                    itemAlign: "center",
                }
            ]}
            title="Products"
            url="/products"
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
            canViewDetails={true}
            canDeleteData={true}
        />
    )
}   