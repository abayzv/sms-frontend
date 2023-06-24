import Datatable from "../../components/datatable"
Users.auth = {}

export default function Users(){
    const dataForm = [
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            defaultValue: ''
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            defaultValue: ''
        },
        {
            name: 'password',
            type: 'password',
            label: 'Password',
            defaultValue: ''
        },
        {
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirm Password',
            defaultValue: ''
        },
        {
            name: 'roleId',
            type: 'select',
            label: 'Role',
            defaultValue: '',
            url: '/list/roles'
        },
    ]

    return (
        <div>
            <Datatable dataForm={dataForm} title="User Data" url="/users" filter={["name","email"]} header={["name","email","role","createdAt", "action"]} />
        </div>
    )
}