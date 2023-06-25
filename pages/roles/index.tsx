import Datatable from "../../components/datatable"
import Fadein from "../../components/transition/fade-in"

Users.auth = {}

export default function Users(){
    const dataForm = [
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            defaultValue: ''
        }
    ]

    return (
        <Fadein>
            <Datatable dataForm={dataForm} title="Role" url="/roles" filter={["name"]} header={["name","createdAt", "action"]} />
        </Fadein>
    )
}   