import Image from "next/image"
import { useSession } from "next-auth/react"

export default function Avatar(){

    const {data: session} = useSession()

    return(
        <div className="flex gap-3">
         <Image width={100} height={100} className="w-10 h-10 rounded-full object-cover" src="https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2022/07/28/2089841029.jpeg" alt="Rounded avatar" />
        <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-semibold text-neutral-700">{session?.user?.name}</span>
            <span className="text-xs text-neutral-500">{session?.user?.roleName}</span>
        </div>
        </div>
    )
}