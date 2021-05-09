import React, { useState, useRef } from 'react'
import { shortenAddress } from '../utils/addressShortener'

import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Gradient } from '../types';
import { Link } from 'react-router-dom';
// import { Fragment, useRef, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'

import SellModal from './ownerCard/SellModal';

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


interface OwnerGradientCardProps {
  gradient: Gradient;
  onCancelButton: (id: string) => void;
  onSellButton: (id: string, price: string) => void;
}




const Card = ({ gradient, onCancelButton, onSellButton }: OwnerGradientCardProps) => {

  const gradientBackgroundStyle = { background: `linear-gradient(135deg, ${gradient.left} 0%, ${gradient.right} 100%)` }

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef()

  const NonSaleButton = () => (
    <div className="rounded-t-none w-full px-4 h-4 rounded-lg shadow-md" style={gradientBackgroundStyle}>
    </div>
  )

  const ForSaleButton = () => (
    <div className="rounded-t-none w-full text-center px-4 py-2 font-semibold rounded-lg text-sm shadow-md text-white bg-black">
      {Number(gradient.price).toLocaleString("en")} <span className="text-xs">ONE</span>
    </div>
  )

  const PreviewButton = () => (
    <Link to={`/gradient/${gradient.id}`}>
      <button className="bg-white rounded-md p-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </button>
    </Link>
  )

  const SettingsDropdown = () => (
    <Menu as="button" className="relative font-medium inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-white rounded-md p-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
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
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)}
                      className={classNames(
                        active ? 'text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Put for Sale
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onCancelButton(gradient.id)}
                      className={classNames(
                        active ? ' text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Cancel Sale
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )


  return (
    <div className="sm:w-56 m-3 relative">
      <div
        style={gradientBackgroundStyle}
        className={`rounded-md rounded-b-none h-96 w-96 sm:w-56 sm:h-56`}
      />
      <div className="absolute top-0 right-0 m-2 space-x-2">
        <SettingsDropdown />
        <PreviewButton />
      </div>
      <SellModal id={gradient.id} open={open} cancelButtonRef={cancelButtonRef} setOpen={setOpen} onClickSell={onSellButton} />
      <div className="shadow-xl rounded-t-none rounded-md">
        <div className="px-4 py-4">
          <h3 className="text-md font-semibold pb-2 break-all">{gradient.left} - {gradient.right}</h3>
          <h4 className="text-xs ">of{" "}
            <Link className="hover:text-blue-500" to={`/owner/${gradient.owner}`}>
              @{shortenAddress(gradient.owner)}
            </Link>
          </h4>
        </div>
        {gradient.forSale ? <ForSaleButton /> : <NonSaleButton />}
      </div>
    </div>
  )
}

export default Card;