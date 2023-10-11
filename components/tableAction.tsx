import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { FiEye } from 'react-icons/fi'
import { BsPencil } from 'react-icons/bs'
import { BiTrash } from 'react-icons/bi'
import { useRouter } from 'next/router'

export interface DropdownActions {
    name: string,
    route: string,
    action?: Function
}

export default function Action({ className, action, id }: { className: string, action: Array<DropdownActions>, id: string }) {
    const router = useRouter()

    const renderMenu = () => {
        return action.map((item, index) => {

            switch (item.name) {
                case "Detail":
                    return (
                        <Link href={`${item.route}/${id}`} key={index} title='Show Details' className='text-primary-500 hover:text-opacity-50'>
                            <FiEye size={20} />
                        </Link>
                    )
                case "Edit":
                    return (
                        <Link key={index} href={`${item.route}/${id}`} className='text-yellow-300 hover:text-opacity-50' title='Edit'>
                            <BsPencil size={20} />
                        </Link>
                    )
                case "Delete":
                    return (
                        <button key={index} className='text-red-500 hover:text-opacity-50' title='Delete'>
                            <BiTrash size={20} onClick={() => item.action && item.action(id)} />
                        </button>
                    )
            }

        })
    }

    return (
        <div>
            <ul className='flex gap-10 justify-center w-auto'>
                {renderMenu()}
            </ul>
        </div>
    )

}