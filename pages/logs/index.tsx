import Datatable from "../../components/datatable"
import Fadein from "../../components/transition/fade-in"

Logs.auth = {}

export default function Logs(){
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
            <Datatable dataForm={dataForm} title="Role" url="/logs" filter={["name","action","startDate","endDate"]} header={["userName|name", "actionName|action", "description" ,"createdAt"]} allowCreate={false}/>
        </Fadein>
    )
}   