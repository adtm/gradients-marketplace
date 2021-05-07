import React from 'react'
import { shortenAddress } from '../utils/addressShortener'
import { Link } from 'react-router-dom'

const Card = ({ collectible }: any) => {

  const nonSaleButton = () => (
    <div className="rounded-t-none w-full px-4 h-4 rounded-lg shadow-md " style={{ background: `linear-gradient(135deg, ${collectible.from} 0%, ${collectible.to} 100%)` }}>

    </div>
  )

  const saleButton = (priceInOne: number) => (
    <div className="rounded-t-none w-full text-center px-4 py-2 font-semibold rounded-lg text-sm shadow-md text-white bg-black">
      {Number(priceInOne).toLocaleString("en")} <span className="text-xs">ONE</span>
    </div>
  )

  return (
    <div className="sm:w-56 m-3">
      <div
        className={`rounded-md rounded-b-none h-96 w-96 sm:w-56 sm:h-56`}
        style={{ background: `linear-gradient(135deg, ${collectible.from} 0%, ${collectible.to} 100%)` }}
      />
      <div className="shadow-xl rounded-t-none rounded-md">
        <div className="px-4 py-4">
          <h3 className="text-md font-semibold pb-2 break-all">{collectible.from} - {collectible.to}</h3>
            <h4 className="text-xs ">of{" "}
            
          <Link className="hover:text-blue-500" to={`/owner/${collectible.ownerAddress}`}>
            @{shortenAddress(collectible.ownerAddress)}
          </Link>

            </h4>
        </div>
        {collectible.forSale ? saleButton(collectible.price) : nonSaleButton()}
      </div>
    </div>
  )
}

export default Card;