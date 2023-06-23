import Datatable from "@/components/datatable"

export default function  Users(){
    const header = [
        "role",
        "name",
        "email",
        "phone",
        "createdAt",
        "action"
    ]

    const filter = ["name", "startDate", "endDate"]

    return (
        <div>
            <Datatable url="/users" filter={filter} header={header} />
        </div>
    )

}