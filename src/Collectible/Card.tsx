
import React from 'react'
import collectibles from '../data/collectibles';

const Card = ({ collectible }: any) => {
  return (
    <div className="sm:w-56 m-3" >
      <div
        className={`rounded-md rounded-b-none h-96 w-96 sm:w-56 sm:h-56   object-cover`} 
        style={{ background: `linear-gradient(90deg, ${collectible.from} 0%, ${collectible.to} 100%)` }}  
      />
      <div className="shadow-xl rounded-t-none rounded-md">
        <div className="px-4 py-4">
          <h3 className="text-md font-semibold pb-2 break-all">{collectible.from} - {collectible.to}</h3>
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