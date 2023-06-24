import MyCalendar from "../components/calendar";
import CardInfo from "../components/cardInfo";
import MyChart from "../components/chart";

Dashboard.auth = {}

export default function Dashboard() {

    return (
        <div className="grid gap-5">
            <div className="grid sm:grid-cols-4 gap-5">
                <CardInfo icon="users" name="Students" number={100} />
                <CardInfo icon="users" name="Students" number={100} />
                <CardInfo icon="users" name="Students" number={100} />
                <CardInfo icon="users" name="Students" number={100} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
                <div className="p-5 min-h-[200px] border border-gray-200 bg-white">
                    <MyChart />
                </div>
                <div className="p-5 min-h-[200px] border border-gray-100 bg-white">
                    <MyCalendar />
                </div>
            </div>
        </div>
    )
}