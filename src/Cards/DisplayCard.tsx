import React from 'react'
import { useNavigate } from 'react-router-dom'
import { shortenAddress } from '../utils/addressShortener'
import { Gradient } from '../types'
import SaleButton from './cards/SaleButton'
import BackgroundTip from './cards/BackgroundTip'
import { gradientBackground } from '../utils/gradientBackground'
import mixpanel from 'mixpanel-browser'
interface CardProps {
  gradient: Gradient
}

const DisplayCard = ({ gradient }: CardProps) => {
  const navigate = useNavigate()
  const gradientBg = gradientBackground({ left: gradient.left, right: gradient.right })

  return (
    <div className="m-3 hover:shadow-xl bg-white dark:bg-gray-800 relative">
      <div style={gradientBg} className="rounded-md rounded-b-none xs:w-72 w-80 sm:w-72 h-80">
        <p className="absolute text-xs p-2 italic font-medium dark:text-black text-white"># {gradient.id}</p>
      </div>
      <div className="shadow-md rounded-t-none rounded-md dark:text-white text-black">
        <div className="px-4 py-4">
          <h3 className="text-md font-semibold pb-2 break-all">
            {gradient.left.toUpperCase()} - {gradient.right.toUpperCase()}
          </h3>
          <h4 className="text-xs">
            of{' '}
            <button
              className="hover:text-blue-500"
              onClick={(event) => {
                event.stopPropagation()
                mixpanel.track('display-to-owner', { owner: gradient.owner })
                navigate(`/owner/${gradient.owner}`)
              }}
            >
              @{shortenAddress(gradient.owner)}
            </button>
          </h4>
        </div>
        {gradient.forSale ? <SaleButton price={gradient.price} /> : <BackgroundTip gradientBackground={gradientBg} />}
      </div>
    </div>
  )
}

export default DisplayCard
