import React, { useState } from 'react'
import Card from './Card'
import collectibles from '../data/collectibles';
import accounts from '../data/accounts';

const Create = () => {
  const [price, setPrice] = useState<number>(1.00)
  const [quantity, setQuantity] = useState<number>(1)
  const [name, setName] = useState<string>("art-name")
  const [image, setImage] = useState<string>("")

  return (
    <div className="flex justify-center items-center sm:space-x-10 container w-full lg:w-2/3 m-auto flex-wrap sm:flex-nowrap">
      <div className="space-y-5 w-full lg:w-1/2">
        <h1 className="text-3xl mb-10 font-semibold">Create a collectible</h1>
        <Upload setImage={setImage} />
        <Name name={name} setName={setName} />
        <Description />
        <Quantity quantity={quantity} setQuantity={setQuantity} />
        <Price price={price} setPrice={setPrice} />
        <button className="  w-full my-3 px-6 py-3 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
          Upload
      </button>
      </div>
      <div className="m-auto">
        <Card collectible={{

          ...collectibles[1],
          image,
          name,
          price: {
            one: price
          },
          quantity: {
            number: 1,
            from: quantity
          },
          owner: accounts[1]

        }} />
      </div>
    </div>
  )
}

export default Create;
const readURL = (file: any) => {
  return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e:any) => res(e.target.result);
      reader.onerror = e => rej(e);
      reader.readAsDataURL(file);
  });
};
const Upload = ({setImage}: any) => (
  <div>
    <label htmlFor="upload" className="block text-sm font-medium text-gray-700">
      Upload
  </label>
    <div className="mt-1">
      <label className=" flex flex-col items-center px-4 py-6 bg-white shadow-sm rounded-md  tracking-wide  border  border-gray-300 border-dashed cursor-pointer ">

        <span className="sm:text-sm text-gray-500">Choose file</span>
        <span className="text-xs text-gray-300">jpg, png, gif</span>
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

const Name = ({name, setName}: any) => (
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
        // @ts-ignore
        onChange={({target: { value}}) => setName(value)}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="The name of your art"
      />
    </div>
  </div>
)

const Quantity = ({quantity, setQuantity}:any) => (
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
        // @ts-ignore
        onChange={({target: { value}}) => setQuantity(value)}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full   sm:text-sm border-gray-300 rounded-md"
        placeholder="1"
      />
    </div>
  </div>

)

const Price = ({price, setPrice}: any) => (
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
        // @ts-ignore
        onChange={({target: { value}}) => setPrice(value)}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 sm:text-sm border-gray-300 rounded-md"
        placeholder="0.00"
      />
    </div>
  </div>
)