import { Menu } from '@headlessui/react'

export default function Dropdown({className} : {className: string}) {

    return (
        <Menu>
          <Menu.Button className={`${className}`}>More</Menu.Button>
        <div className="relative">
        <Menu.Items className="p-2 bg-white text-black flex flex-col items-start gap-2 max-w-[300px] rounded-md mt-2 absolute top-0 left-0">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && 'bg-blue-500'}`}
                  href="/account-settings"
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && 'bg-blue-500'}`}
                  href="/account-settings"
                >
                  Documentation
                </a>
              )}
            </Menu.Item>
            <Menu.Item disabled>
              <span className="opacity-75">Invite a friend (coming soon!)</span>
            </Menu.Item>
          </Menu.Items>
        </div>
        </Menu>
      )

}