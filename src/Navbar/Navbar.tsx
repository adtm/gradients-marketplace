import React from 'react'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useEthereumProvider } from '../hooks/ethereum'
import { shortenAddress } from '../utils/addressShortener'
import useDarkMode from '../hooks/darkMode'

const NetworkButton = () => {
  const { error, account, openMetamask } = useEthereumProvider()

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
    <button onClick={() => openMetamask()} className={`w-full sm:w-auto py-3 px-6 font-semibold rounded-lg  shadow-md ${buttonStyles()}`}>
      {buttonText()}
    </button>
  )
}

export default function Navbar() {
  const { account } = useEthereumProvider();
  const { darkMode, toggle } = useDarkMode();

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
                    <h1 className="font-bold text-2xl text-black dark:text-white">ichi<span className="text-red-500">.</span></h1>
                  </Link>
                  <button onClick={toggle} className="ml-10 flex p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2 text-black dark:text-white ">
                    {
                      !darkMode ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    }
                  </button>
                </div>
                <div className="hidden sm:flex sm:ml-10 w-full justify-end">
                  <div className="space-x-5 flex items-center justify-content">

                    {
                      account ? <Link to={`/owner/${account}`} className="p-0 m-0 h-10 w-10 ">
                        <div
                          className={`inline-block h-10 w-10 rounded-full ring-offset-2 hover:ring-2 ring-green-300`}
                          style={{ background: `linear-gradient(135deg, #17EAD9 0%, #6078EA 100%)` }}
                        />
                      </Link> : null
                    }
                    <NetworkButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MobilePanel account={account} />
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

const MobilePanel = ({ account }: { account: null | string }) => (
  <Disclosure.Panel className="sm:hidden">
    <div className="px-2 pt-2 pb-3 space-y-2 flex flex-col justify-items items-center">
      {
        account ? <Link to={`/owner/${account}`} className="mb-1 h-10 w-10 ">
          <div
            className={`inline-block h-10 w-10 rounded-full ring-offset-2 hover:ring-2 ring-green-300`}
            style={{ background: `linear-gradient(135deg, #17EAD9 0%, #6078EA 100%)` }}
          />
        </Link> : null
      }
      <NetworkButton />
    </div>
  </Disclosure.Panel>
)