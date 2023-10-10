import Datatable from "../../components/datatable"
import Fadein from "../../components/transition/fade-in"

Products.auth = {}

export default function Products() {

    return (
        <Fadein>
            <Datatable title="User Data" url="/products" header={["media_url|picture", "name", "price", "category", "action"]} action={[
                {
                    name: "Detail",
                    route: "/products/:id"
                },
                {
                    name: "Edit",
                    route: "/products/edit/:id"
                }
            ]} />
        </Fadein>
    )
}   