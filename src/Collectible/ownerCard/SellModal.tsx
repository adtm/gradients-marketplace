import React, { useState, useRef, Ref } from 'react'


import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'

import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
// import { Fragment, useRef, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'

interface SellModalProps {
  id: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onClickSell: (id: string, price: string) => void;
  cancelButtonRef: Ref<any>
}



const SellModal = ({ id, open, setOpen, cancelButtonRef, onClickSell }: SellModalProps) => {

  const initialValues = {
    price: "1",
  };

  // @ts-ignore
  const onSubmit = (values) => {
    console.log(values)
    onClickSell(id, values.price);
    setOpen(false);
  }

  return (

    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        // @ts-ignore
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >


        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
            </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"> 
            <Formik
              initialValues={initialValues}
              validate={(value) => {
                console.log(value)
                if (value.price === "" || Number(value.price) <= 0) return { price: "Price is required" }
              }}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,

                handleChange,

              }) => (
                  <Form>
                    
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">

                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 mb-5">
                              Put on Marketplace
                      </Dialog.Title>
                            <div className="mt-2">
                              <div>




                                <div className="space-y-5 ">

                                  <Price price={values.price} setPrice={handleChange("price")} errors={errors} />
                                  <p className="text-xs text-gray-500">Service fee <span className="text-gray-700 font-semibold">1.5%</span>, {Number(Number(values.price) / 100 * 1.5).toLocaleString()} ONE</p>
                                </div>







                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"

                        >
                          Confirm
                  </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setOpen(false)}
                          // @ts-ignore
                          ref={cancelButtonRef}
                        >
                          Cancel
                  </button>
                      </div>
                  </Form>
                )}
            </Formik>
            </div>
          </Transition.Child>
        </div>

      </Dialog>
    </Transition.Root>

  )
}

const Price = ({ price, setPrice, errors }: any) => (
  <div>
    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
      Price
      </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">ONE</span>
      </div>
      <input
        type="number"
        name="price"
        id="price"
        value={price}
        onChange={({ target: { value } }) => setPrice(value)}
        className={`${errors.price ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'} pl-12 break-all block w-full sm:text-sm border-gray-300 rounded-md`}
        placeholder="1"
      />
      {(errors.price) ? <ErrorIcon /> : null}
    </div>
    {(errors.price) ? <p className="mt-2 text-sm text-red-600"> {errors.price} </p> : null}
  </div>
)


const ErrorIcon = () => (
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" >
    <svg
      className="h-5 w-5 text-red-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
)

export default SellModal;