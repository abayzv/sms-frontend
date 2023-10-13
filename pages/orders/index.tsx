import formatPrice from "@/utils/formatPrice"
import Crud from "../../components/crud"
import FormatDate from "@/utils/formatDate"

Orders.auth = {}

export default function Orders() {

    const statusStyle = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-400 border-yellow-400"
        }
    }

    return (
        <Crud
            template={[
                {
                    header: "Order Id",
                    key: "_id",
                    itemAlign: "left",
                },
                {
                    header: "Reference number",
                    key: "reference_number",
                },
                {
                    header: "status",
                    key: "status",
                    render: (item: any) => (
                        <span className={`rounded-xl text-sm p-2 px-5 border ${statusStyle(item.status)}`}>
                            {item.status}
                        </span>
                    ),
                },
                {
                    header: "number of items",
                    key: "items",
                    itemAlign: "center",
                    render: (item: any) => <>{item.items.total_items}</>
                },
                {
                    header: "total",
                    key: "total",
                    itemAlign: "center",
                    render: (item: any) => <>{formatPrice(item.total)}</>
                },
                {
                    header: "transaction date",
                    key: "date",
                    itemAlign: "center",
                    render: (item: any) => <>{FormatDate(item.date)}</>
                },
                {
                    header: "action",
                    key: "action",
                    itemAlign: "center",
                }
            ]}
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
            canViewDetails={true}
            canDeleteData={true}
        />
    )
}   