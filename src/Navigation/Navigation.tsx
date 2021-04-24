import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'

 
export default function Example() {
  const { chainId, error } = useWeb3React()

  const checkIfCorrectNetwork = () => {
    console.log(chainId)
    if (error) {
      return (
        <button className="py-3 px-6 font-semibold rounded-lg shadow-md text-white bg-red-500 hover:bg-red-700">
                        Wrong Network
                      </button>
      )
    }

    if (!chainId) {
      return (
        <button className="py-3 px-6 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
                      Connect Wallet
                    </button> 
      )
    }

    if (chainId == 1666700000 || chainId == 1666600000) {
      return <button className="py-3 px-6 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
      Connected 
    </button> 
    }

    return (
      <button className="py-3 px-6 font-semibold rounded-lg shadow-md text-white bg-red-500 hover:bg-red-700">
                      Wrong Network
                    </button>
    )
  }

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
                  <div className="space-x-5">
                    <Link to="/create">
                      <button className=" py-3 px-6 font-semibold rounded-lg shadow-md text-black bg-white hover:bg-gray-100">
                        Create
                    </button>

                    </Link>
                    { checkIfCorrectNetwork()  } 
                    
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
      <Link to="/create">
        <Disclosure.Button className="w-full py-3 px-6 font-semibold text-black bg-white">
          Create
      </Disclosure.Button> 
      </Link> 
      <Disclosure.Button  className="w-full py-3 px-6 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
        Connect Wallet
      </Disclosure.Button> 
    </div>
  </Disclosure.Panel>
)