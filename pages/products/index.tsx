import Datatable from "../../components/datatable"
import Fadein from "../../components/transition/fade-in"

Users.auth = {}

export default function Users() {

    return (
        <Fadein>
            <Datatable title="User Data" url="/products" header={["name", "price", "category", "action"]} action={[
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