import { useRouter } from 'next/router'
import useAxios from '@/lib/useAxios'
import swr from 'swr'

UserDetail.auth = {}

export default function UserDetail(){
    const axiosAuth = useAxios()

    const router = useRouter()
    const { id } = router.query

    const fetcher = (url: string) => axiosAuth.get(url).then(res => res.data)

    const { data, error } = swr(`/users/${id}`, fetcher)

    return (
        <div>
            <h1>Detail User {id}</h1>
            <div>
                {JSON.stringify(data)}
            </div>
        </div>
    )
}