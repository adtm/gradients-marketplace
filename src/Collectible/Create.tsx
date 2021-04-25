import React, { useState } from 'react'
import Card from './Card'
import collectibles from '../data/collectibles';
import accounts from '../data/accounts';
import { Formik } from "formik"

const Create = () => {
  const initialValues = {
    name: "Satoshi",
    image: "",
    price: "1",
    quantity: "1",
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(value) => {
        console.log(value)
        if (value.name === "") return { name: "Name is required" }
        if (value.quantity === "" || Number(value.quantity) < 0) return { quantity: "Quantity is required" }
        if (value.price === "" || Number(value.price) < 0) return { price: "Price is required" }
      }}
      onSubmit={() => console.log("Submitted!")}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit
      }) => (
          <div className="flex justify-center items-center sm:space-x-10 container w-full lg:w-2/3 m-auto flex-wrap sm:flex-nowrap">
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl mb-10 font-semibold">Create a collectible</h1>
              <form onSubmit={handleSubmit} className="space-y-5 ">

                <Upload setImage={handleChange("image")} />
                <Name name={values.name} setName={handleChange("name")} errors={errors} />
                <Description />
                <Quantity quantity={values.quantity} setQuantity={handleChange("quantity")} errors={errors} />
                <Price price={values.price} setPrice={handleChange("price")} errors={errors} />

                <button type="submit" className="w-full my-3 px-6 py-3 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
                  Upload
      </button>
              </form>
            </div>
            <div className="m-auto">
              <Card collectible={{

                ...collectibles[1],
                image: values.image,
                name: values.name,
                price: {
                  one: values.price
                },
                quantity: {
                  number: 1,
                  from: values.quantity
                },
                owner: accounts[1]

              }} />
            </div>
          </div>
        )}
    </Formik>




  )
}

export default Create;
const readURL = (file: any) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e: any) => res(e.target.result);
    reader.onerror = e => rej(e);
    reader.readAsDataURL(file);
  });
};

const Upload = ({ setImage }: any) => (
  <div>
    <label htmlFor="upload" className="block text-sm font-medium text-gray-700">
      Upload
   </label>
    <div className="mt-1">
      <label className=" flex flex-col items-center px-4 py-6 bg-white shadow-sm rounded-md  tracking-wide  border  border-gray-300 border-dashed cursor-pointer ">
        <div className="flex text-sm text-gray-600">
          <span className="cursor-pointer bg-white rounded-md font-medium text-red-500 hover:text-red-400">Upload a file</span>
          <p className="pl-1">or drag and drop</p>
        </div>
        <span className="text-xs text-gray-300">jpg, png, gif up to 10MB</span>
        <input type='file' className="hidden" onChange={async (event: any) => setImage(await readURL(event.target.files[0]))} />
      </label>
    </div>
  </div>
)

const Description = () => (
  <div>
    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
      Description
  </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <textarea
        name="description"
        id="description"
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="The description of your art"
      />
    </div>
  </div>
)

const Name = ({ name, setName, errors }: any) => (
  <div >
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
      Name
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        maxLength={39}
        onChange={({ target: { value } }) => setName(value)}
        className={`${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'} break-all block w-full sm:text-sm border-gray-300 rounded-md`}
        placeholder="The name of your art"
      />
      {(errors.name) ? <ErrorIcon /> : null}
    </div>
    {(errors.name) ? <p className="mt-2 text-sm text-red-600"> {errors.name} </p> : null}
  </div>
)

const Quantity = ({ quantity, setQuantity, errors }: any) => (
  <div>
    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
      Quantity
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        type="number"
        name="quantity"
        id="quantity"
        value={quantity}
        maxLength={40}
        onChange={({ target: { value } }) => setQuantity(value)}
        className={`${errors.quantity ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'} break-all block w-full sm:text-sm border-gray-300 rounded-md`}
        placeholder="1"
      />
      {(errors.quantity) ? <ErrorIcon /> : null}
    </div>
    {(errors.quantity) ? <p className="mt-2 text-sm text-red-600"> {errors.quantity} </p> : null}
  </div>
)

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