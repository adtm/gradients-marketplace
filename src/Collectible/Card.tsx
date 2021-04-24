// @ts-nocheck
import React from 'react'
import { Link } from 'react-router-dom'
 

const Card = ({ collectible }) => {
    return (
      <Link to={`/collectible/${collectible.id}`}>
        <div className="sm:w-56 m-3" >
          <img className="rounded-md rounded-b-none" src={collectible.image} />
          <div className="shadow-xl rounded-t-none rounded-md">
            <div className="px-4 py-4">
              <span className="text-xs text-gray-500 font-bold">{collectible.quantity.number} of {collectible.quantity.from}</span>
              <h3 className="text-xl font-semibold pb-2">{collectible.name}</h3>
              <div className="pb-1">
                <div className="flex items-center">
                  <img className="w-5 h-5 rounded-3xl mr-2" src={collectible.owner.profileImage} />
                  <h3 className="text-sm font-semibold">of @{collectible.owner.name}</h3>
                </div>
              </div>
            </div>
            <button className="rounded-t-none w-full px-4 py-2 font-semibold rounded-lg text-sm shadow-md text-white bg-black hover:bg-gray-700">
              {collectible.price.one.toLocaleString()} <span className="text-xs">ONE</span>
            </button>
          </div>
        </div>
      </Link>
  
    )
  }

  export default Card;