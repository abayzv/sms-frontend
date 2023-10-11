import Crud from "../../components/crud"
import Datatable from "../../components/datatable"
import Fadein from "../../components/transition/fade-in"

Products.auth = {}

export default function Products() {

    return (
        <Crud
            header={["media_url|Media", "name", "price", "category", "action"]}
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