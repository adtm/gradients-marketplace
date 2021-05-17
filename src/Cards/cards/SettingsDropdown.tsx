import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
interface SettingsDropdownProps {
  id: string
  onSale: boolean
  onSetSale: () => void
  onCancelSale: (id: string) => void
}

const SettingsDropdown = ({ id, onSale, onSetSale, onCancelSale }: SettingsDropdownProps) => (
  <Menu as="div" className="relative font-medium inline-block text-left">
    {({ open }) => (
      <>
        <div>
          <Menu.Button className="bg-white rounded-md p-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Menu.Button>
        </div>

        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="origin-top-right absolute right-0 mt-2 w-32 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              <Menu.Item as="button">
                <div
                  onClick={() => onSetSale()}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:text-gray-900`}
                >
                  Put for Sale
                </div>
              </Menu.Item>
              <Menu.Item as="button" disabled={onSale}>
                <div
                  onClick={() => onCancelSale(id)}
                  className={`block px-4 py-2 text-sm hover:text-gray-900 ${
                    !onSale ? 'cursor-not-allowed text-gray-300' : 'text-gray-700 '
                  }`}
                >
                  Cancel Sale
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </>
    )}
  </Menu>
)

export default SettingsDropdown
