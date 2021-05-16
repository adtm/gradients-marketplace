import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { shortenAddress } from '../utils/addressShortener'
import { Gradient } from '../types'
import SaleButton from './cards/SaleButton'
import BackgroundTip from './cards/BackgroundTip'
import { gradientBackground } from '../utils/gradientBackground'

interface CardProps {
  gradient: Gradient;
}

const DisplayCard = ({ gradient }: CardProps) => {

  const navigate = useNavigate();
  const gradientBg = gradientBackground({ left: gradient.left, right: gradient.right })

  return (
    <div className="m-3 hover:shadow-xl bg-white dark:bg-gray-800">
      <div
        style={gradientBg}
        className="rounded-md rounded-b-none xs:w-72 w-80 sm:w-72 h-80"
      />
      <div className="shadow-md rounded-t-none rounded-md dark:text-white text-black">
        <div className="px-4 py-4">
          <h3 className="text-md font-semibold pb-2 break-all">{gradient.left} - {gradient.right}</h3>
          <h4 className="text-xs">of{" "}
          <button className="hover:text-blue-500" onClick={(event) => {
            event.stopPropagation();
            navigate(`/owner/${gradient.owner}`);
          }}>
              @{shortenAddress(gradient.owner)}
            </button>
          </h4>
        </div>
        {gradient.forSale ? <SaleButton price={Number(gradient.price)} /> : <BackgroundTip gradientBackground={gradientBg} />}
      </div>
    </div>
  )
}

export default DisplayCard;