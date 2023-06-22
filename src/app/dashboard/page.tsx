"use client";
import CardInfo from "@/components/cardInfo";
import Datatable from "@/components/datatable";

export default function Dashboard() {
    
    const data = [
        {
            id: 1,
            name: "John Doe",
            email: "johndoe@gmail.com",
            phone: "08123456789",
        },
        {
            id: 2,
            name: "Rani Doe",
            email: "ranidoe@gmail.com",
            phone: "08123456789",
        },
        {
            id: 3,
            name: "Ari Doe",
            email: "aridoe@gmail.com",
            phone: "08123456789",
        }
    ]

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
        <div className="grid gap-5">
            <div className="grid grid-cols-4 gap-5">
                <CardInfo icon="users" name="Students" number={100} />
                <CardInfo icon="users" name="Students" number={100} />
                <CardInfo icon="users" name="Students" number={100} />
                <CardInfo icon="users" name="Students" number={100} />
            </div>
            <div className="grid gap-5">
                <Datatable url="/users" filter={filter} header={header} />
            </div>
        </div>
    )
}
