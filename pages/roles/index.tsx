import Datatable from "../../components/datatable"
import Fadein from "../../components/transition/fade-in"

Roles.auth = {}

export default function Roles(){
    const dataForm = [
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            defaultValue: ''
        }
    ]

    const action = [
        {
            name: "Detail",
            route: "/users/:id"
        }
    
    ]

    return (
        <Fadein>
            <Datatable dataForm={dataForm} title="Role" url="/roles" filter={["name"]} header={["name","createdAt", "action"]} action={action} />
        </Fadein>
    )
}   