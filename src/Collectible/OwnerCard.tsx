import React from 'react'
import { shortenAddress } from '../utils/addressShortener'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Card = ({ gradient }: any) => {

  
  const nonSaleButton = () => (
    <div className="rounded-t-none w-full px-4 h-4 rounded-lg shadow-md " style={{ background: `linear-gradient(135deg, ${gradient.left} 0%, ${gradient.right} 100%)` }}>
    </div>
  )

  const saleButton = (priceInOne: number) => (
    <div className="rounded-t-none w-full text-center px-4 py-2 font-semibold rounded-lg text-sm shadow-md text-white bg-black">
      {Number(priceInOne).toLocaleString("en")} <span className="text-xs">ONE</span>
    </div>
  )

  return (
    <div className="sm:w-56 m-3 relative">
      <div
        className={`rounded-md rounded-b-none h-96 w-96 sm:w-56 sm:h-56`}
        style={{ background: `linear-gradient(135deg, ${gradient.left} 0%, ${gradient.right} 100%)` }}
      />
<div className="absolute top-0 right-0 m-2 ">

<Menu as="div" className="relative inline-block text-right">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="  bg-white rounded-md p-1     bg-white text-sm font-medium text-gray-700 hover:bg-gray-50   ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
              {/* <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
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
              className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                        Set for sale
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Cancel sale
                    </a>
                  )}
                </Menu.Item> 
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  </div>

      <div className="shadow-xl rounded-t-none rounded-md">
        <div className="px-4 py-4">
          <h3 className="text-md font-semibold pb-2 break-all">{gradient.left} - {gradient.right}</h3>
            <h4 className="text-xs ">of{" "}
            
          {/* <Link className="hover:text-blue-500" to={`/owner/${gradient.owner}`}> */}
            @{shortenAddress(gradient.owner)}
          {/* </Link> */}

            </h4>
        </div>
        {gradient.forSale ? saleButton(gradient.price) : nonSaleButton()}
      </div>
    </div>
  )
}

export default Card;