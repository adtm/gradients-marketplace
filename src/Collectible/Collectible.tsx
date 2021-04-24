// @ts-nocheck
import React, { useState, useEffect } from 'react'
import accounts from '../data/accounts'
import collectibles from '../data/collectibles'

const Collectible = ({ collectibleId } : { collectibleId: string} ) => {

  const [owner, setOwner] = useState<Account>()
  const [creator, setCreator] = useState<Account>()
  const [collectible, _] = useState<Collectible>(collectibles[collectibleId])

  const servicePrice = collectible.price.one / 100 * 1.5

  useEffect(() => {
    setOwner(accounts[collectible.ownerId])
    setCreator(accounts[collectible.creatorId])
  }, [])


  return (
    <div>
      <div className="md:flex">
        <div className="flex flex-grow items-center justify-center">
          <img className="w-96 h-96 bg-gray-300" src={collectible.image} />
        </div>
        <div className="md:flex-1">

          <div className="pb-10 pt-5">
            <h1 className="text-4xl font-bold">{collectible.name}</h1>
            <span className="text-sm text-gray-500 font-bold">{collectible.quantity.number} of {collectible.quantity.from}</span>
          </div>

          <div className="pb-10 whitespace-pre-line">
            <p className="font-semibold pb-5">Description</p>
            {collectible.description}
          </div>

          <div className="pb-3">
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-3xl mr-2" src={creator?.profileImage} />
              <h3 className="font-semibold">by @{creator?.name}</h3>
            </div>
          </div>

          <div className="pb-3">
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-3xl mr-2" src={owner?.profileImage} />
              <h3 className="font-semibold">of @{owner?.name}</h3>
            </div>
          </div>

          <div className="pt-8 md:text-left text-center">
            <h3 className="text-3xl font-semibold py-1">{collectible.price.one.toLocaleString()} <span className="text-sm">ONE</span></h3>
            <button className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
              Buy now
            </button>
          </div>
          <span className="text-xs text-gray-500">Service fee <span className="text-gray-700 font-semibold">1.5%</span>, {servicePrice.toLocaleString()} ONE</span>
        </div>
      </div>
    </div>
  )
}

export default Collectible;