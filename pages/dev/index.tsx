import { useSession } from "next-auth/react";
import Layout from "../../components/layout/main";
import Card from "../../components/card";

export default function Dev() {
    const { data: session } = useSession();

    return (
        <Layout>
            <Card>
                <h1>Dev Page</h1>
                <p>Email: {session?.user?.email}</p>
                <p>Token: {session?.user?.access_token}</p>
                <p>Refresh Token : {session?.user?.refresh_token}</p>
            </Card>
        </Layout>
    )


}