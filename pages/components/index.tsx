import Card from "../../components/card";
import Layout from "../../components/layout/main";
import PopUp from "../../components/popup";
import { GoAlert } from "react-icons/go"

export default function Components() {
    return (
        <Layout>
            <Card title="List Component">
                <div>
                    <p>Popup</p>
                    <PopUp trigger={<button>Click Me</button>}>
                        <div className="w-full flex flex-col items-center">
                            <GoAlert size={42} color="#3085C3" />
                            <p className="w-2/3 text-center mt-5 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dicta.</p>
                        </div>
                    </PopUp>
                </div>
            </Card>
        </Layout>
    )
}