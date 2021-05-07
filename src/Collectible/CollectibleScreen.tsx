import React, { useState } from 'react'
import accounts from '../data/accounts'
import collectibles from '../data/collectibles'
import { Account, Collectible } from '../types'
import { shortenAddress } from '../utils/addressShortener'
import { Link } from 'react-router-dom'

interface Props {
  collectibleId: string;
}

const CollectibleScreen = ({ collectibleId }: Props) => {

const data = { 
  tokenId: 1, 
  left:"#FCE38A", 
  right: "#F38181", 
  ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99",
  forSale: false,
  price: 100000
};
  
  const DisabledBuyButton = () => {
    return <div className=" ">
      <h3 className="text-3xl font-semibold py-1">XXXX{" "}<span className="text-sm">ONE</span></h3>
      <button disabled className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black bg-gray-700">
        Not for sale
      </button>
      <p className="text-xs text-gray-500">Service fee <span className="text-gray-700 font-semibold">1.5%</span></p>
    </div>
  }

  const BuyButton = (price: number) => {
    const servicePrice = price / 100 * 1.5
    return <div className="">
      <h3 className="text-3xl font-semibold py-1">{data.price.toLocaleString()} <span className="text-sm">ONE</span></h3>
      <button className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
        Buy now
      </button>
      <p className="text-xs text-gray-500">Service fee <span className="text-gray-700 font-semibold">1.5%</span>, {servicePrice.toLocaleString()} ONE</p>
      </div>
  }




  return (
    <div className="md:flex mt-40">
      <div className="flex flex-grow items-center justify-center">
        <div
        className={`w-96 h-96 rounded-md`}
        style={{ background: `linear-gradient(135deg, ${data.left} 0%, ${data.right} 100%)` }}
      />
      </div>
      <div className="md:flex-1">

        <div className="pb-2 pt-5">
          <h1 className="text-4xl font-bold">{data.left} - {data.right}</h1>
        </div>
 

        <div className="pb-3">
          <div className="flex items-center">
            <h3 className="font-semibold">of{" "}
            <Link className="text-blue-500" to={`/owner/${data.ownerAddress}`}>
                @{shortenAddress(data.ownerAddress)}
              </Link>
            </h3>
          </div>
        </div> 

        <div className="pt-8 md:text-left text-center">
          { data.forSale ? BuyButton(data.price) : DisabledBuyButton() }
        </div>
        
      </div>
    </div>
  )
}

export default CollectibleScreen;