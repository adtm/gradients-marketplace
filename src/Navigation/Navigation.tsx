// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import detectEthereumProvider from '@metamask/detect-provider'

const MAIN_CHAIN_ID = "1666700000"
const TESTNET_CHAIN_ID = "1666600000"

const HARMONY_CHAIN_IDS = new Set([TESTNET_CHAIN_ID, MAIN_CHAIN_ID])


export default function Example() {
  
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null)

  const connectProvider = async () => {
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    handleChainIdChanged(chainId);

    setInterval(async () => {
      const account = await ethereum.request({ method: 'eth_accounts' })
      handleAccountsChanged(account)
    }, 1000)

    window.ethereum.on('chainChanged', handleChainIdChanged);
  }

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount(null);
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
    }
  }

  const handleChainIdChanged = (chainId) => {
    const chainIdInDec = BigInt(chainId).toString(10)  
    if (!HARMONY_CHAIN_IDS.has(chainIdInDec)) {
      setError("Wrong network")
    } else { setError(null); }
  }

  const connect = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        return setError("Multiple wallets detected")
      }
      connectProvider()
    } else {
      setError("MetaMask not installed")
    }
  } 

  useEffect(() => {
    connect();
  }, [])
  
  const buttonText = () => {
    if (error) return error
    if (account) return "Connected" 
    return "Connect Metamask"
  }

  const checkIfCorrectNetwork = () => {
    const buttonStyles = () => {
      if (error) return "text-white bg-red-500 hover:bg-red-700"
      if (account) return "text-white bg-green-500 hover:bg-green-700"
      return "text-white bg-black hover:bg-gray-700"
    }

    return (
      <button onClick={window.ethereum.enable}  className={`py-3 px-6 font-semibold rounded-lg shadow-md ${buttonStyles()}`}>
        { buttonText() }
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
                    {checkIfCorrectNetwork()}

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
      <Disclosure.Button className="w-full py-3 px-6 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
        Connect Wallet
      </Disclosure.Button>
    </div>
  </Disclosure.Panel>
)