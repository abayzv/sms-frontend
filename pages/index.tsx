import MyCalendar from "../components/calendar";
import Card from "../components/card";
import CardInfo from "../components/cardInfo";
import MyChart from "../components/chart";
import Fadein from "../components/transition/fade-in";

Dashboard.auth = {}

export default function Dashboard() {

    return (
        <Fadein>
            <div className="grid gap-5">
                <div className="grid sm:grid-cols-4 gap-5">
                    <CardInfo icon="users" iconColor="white" name="Sales" values="456" className="bg-purple-700 text-white" />
                    <CardInfo icon="users" iconColor="white" name="Products" values="20" className="bg-green-500 text-white" />
                    <CardInfo icon="users" iconColor="white" name="Revenue" values="Rp200.000" className="bg-sky-500 text-white" />
                    <CardInfo icon="users" iconColor="white" name="Users" values="15" className="bg-red-500 text-white" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                    <Card title="Monthly Sales">
                        <MyChart />
                    </Card>
                    <Card title="Monthly Sales">
                        <MyChart type="bar" />
                    </Card>
                </div>
            </div>
        </Fadein>
    )
}