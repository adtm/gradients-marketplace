
import React from 'react'

const Card = ({ collectible }: any) => {
  return (
    <div className="sm:w-56 m-3" >
      <div className="rounded-md rounded-b-none sm:h-56 bg-white object-cover bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"  />
      <div className="shadow-xl rounded-t-none rounded-md">
        <div className="px-4 py-4">
          <span className="text-xs text-gray-500 font-bold">{collectible.quantity.number} of {collectible.quantity.from}</span>
          <h3 className="text-xl font-semibold pb-2 break-all">{collectible.name}</h3>
          <div className="pb-1">
            <div className="flex items-center">
              <img className="w-5 h-5 rounded-3xl mr-2" src={collectible.owner.profileImage} />
              <h3 className="text-sm font-semibold">of @{collectible.owner.name}</h3>
            </div>
          </div>
        </div>
        <div className="rounded-t-none w-full text-center px-4 py-2 font-semibold rounded-lg text-sm shadow-md text-white bg-black">
          {Number(collectible.price.one).toLocaleString("en")} <span className="text-xs">ONE</span>
        </div>
      </div>
    </div>
  )
}

export default Card;