"use client"
import { Menu } from '@headlessui/react'

export default function Dropdown() {

    return (
        <Menu>
          <Menu.Button className="bg-red-500 p-2 rounded-sm">More</Menu.Button>
          <Menu.Items className="p-2 bg-white text-black flex flex-col gap-2 max-w-[300px] rounded-md mt-2">
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
        </Menu>
      )

}