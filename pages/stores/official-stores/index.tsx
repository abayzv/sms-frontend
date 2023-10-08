import Datatable from "../../../components/datatable"
import Fadein from "../../../components/transition/fade-in"

OfficialStores.auth = {}

export default function OfficialStores() {

    return (
        <Fadein>
            <Datatable title="User Data" url="/official-stores" header={["picture_url|media", "name", "_id|Id", "action"]} />
        </Fadein>
    )
}   