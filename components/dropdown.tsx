import { Menu } from '@headlessui/react'
import Link from 'next/link'
interface DropdownActions {
   name: string,
   route : string
}

export default function Dropdown({className, action, id} : {className: string, action: Array<DropdownActions>, id: string}) {

    const renderMenu = () => {
        return action.map((item, index) => {
          // replace item route with id
            item.route = item.route.replace(":id", id)

            return (
                <Menu.Item key={index}>
                    {({ active }) => (
                        <Link
                        href={item.route}
                        className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } p-2 px-5`}
                        >
                        {item.name}
                        </Link>
                    )}
                </Menu.Item>
            )
        })
    }

    return (
        <Menu>
          <Menu.Button className={`${className}`}>More</Menu.Button>
          <div className="relative">
            <Menu.Items className="absolute grid bg-white w-[200px] border border-gray-300 text-start rounded-md mt-3">
              {renderMenu()}    
            </Menu.Items>
          </div>
        </Menu>
      )

}