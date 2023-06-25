import { useRouter } from 'next/router'

UserDetail.auth = {}

export default function UserDetail(){

    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            <h1>Detail Role {id}</h1>
        </div>
    )
}