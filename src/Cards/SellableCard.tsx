import React, { useState, useRef } from 'react'
import { shortenAddress } from '../utils/addressShortener'

import { Gradient } from '../types';
import { useNavigate } from 'react-router-dom';

import SaleButton from './cards/SaleButton';
import BackgroundTip from './cards/BackgroundTip';
import PreviewButton from './cards/PreviewButton';
import SettingsDropdown from './cards/SettingsDropdown';
import SellModal from '../Gradient/ListingModal';
import { gradientBackground } from '../utils/gradientBackground';


interface OwnerGradientCardProps {
  gradient: Gradient;
  sellLoading: boolean;
  onCancelButton: (id: string) => void;
  onSellButton: (id: string, price: string) => void;
}


const SellableCard = ({ gradient, sellLoading, onCancelButton, onSellButton }: OwnerGradientCardProps) => {

  const navigate = useNavigate();
  const gradientBg = gradientBackground({ left: gradient.left, right: gradient.right })

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef()

  return (
    <div className="m-3 relative">
      <div
        style={gradientBg}
        className="rounded-md rounded-b-none h-96 xs:w-72 w-80 sm:w-96"
      >
        {
          sellLoading ? (
            <div className="rounded-md rounded-b-none h-96 w-96 sm:w-56 sm:h-56 bg-gray-300 bg-opacity-80 flex justify-center items-center">
              <svg className="animate-spin -ml-1 mr-3 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : null
        }
      </div>
      <div className="absolute top-0 right-0 m-2 space-x-2">
        <SettingsDropdown onSale={gradient.forSale} id={gradient.id} onCancelSale={onCancelButton} onSetSale={() => setOpen(true)} />
        <PreviewButton id={gradient.id} />
      </div>
      <SellModal id={gradient.id} open={open} cancelButtonRef={cancelButtonRef} setOpen={setOpen} onClickSell={onSellButton} />
      <div className="shadow-md rounded-t-none rounded-md">
        <div className="px-4 py-4">
          <h3 className="text-md font-semibold pb-2 break-all">{gradient.left} - {gradient.right}</h3>
          <h4 className="text-xs ">of{" "}
            <button className="hover:text-blue-500" onClick={() => navigate(`/owner/${gradient.owner}`)}>
              @{shortenAddress(gradient.owner)}
            </button>
          </h4>
        </div>
        {gradient.forSale ? <SaleButton price={Number(gradient.price)} /> : <BackgroundTip gradientBackground={gradientBg} />}
      </div>
    </div>
  )
}

export default SellableCard;