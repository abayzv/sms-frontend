import Datatable from "../../components/datatable"
Users.auth = {}

export default function Users(){
    return (
        <div>
            <Datatable title="User Data" url="/users" filter={["name"]} header={["name","role","createdAt", "action"]} />
        </div>
    )
}