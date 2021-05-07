
import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useEthereumProvider } from '../hooks/ethereum'
import { shortenAddress } from '../utils/addressShortener'

const NetworkButton = () => {
  const { error, account, ethereum } = useEthereumProvider()

  const buttonText = () => {
    if (error) return error
    if (account) return shortenAddress(account);
    return "Connect Metamask"
  }

  const buttonStyles = () => {
    if (error) return "text-white bg-red-500 hover:bg-red-700"
    if (account) return "text-white bg-green-500 hover:bg-green-700"
    return "text-white bg-black hover:bg-gray-700"
  }

  return (

    <Menu as="div">
      {() => (
        <>
          <Menu.Button onClick={ethereum.enable} className={`w-full sm:w-auto py-3 px-6 font-semibold rounded-lg  shadow-md ${buttonStyles()}`}>
            {buttonText()}
          </Menu.Button>
        </>
      )}
    </Menu>

  )
}

export default function Example() {
  return (
    <Disclosure as="nav" >
      {({ open }) => (
        <>
          <div className="py-2 px-5 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <MobileMenuButton open={open} />
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <h1 className="font-bold text-2xl">ichi<span className="text-red-500">.</span></h1>
                  </Link>
                </div>
                <div className="hidden sm:flex sm:ml-10 w-full justify-end">
                  <div className="space-x-5 flex items-center justify-content"> 
                    <NetworkButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MobilePanel />
        </>
      )}
    </Disclosure>
  )
}

const MobileMenuButton = ({ open }: { open: boolean }) => (
  <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
        )}
    </Disclosure.Button>
  </div>
)

const MobilePanel = () => (
  <Disclosure.Panel className="sm:hidden">
    <div className="px-2 pt-2 pb-3 space-y-2">
      <NetworkButton />
    </div>
  </Disclosure.Panel>
)