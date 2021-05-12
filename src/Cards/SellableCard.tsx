import React, { useState, useRef } from 'react'
import { shortenAddress } from '../utils/addressShortener'

import { Gradient } from '../types';
import { Link } from 'react-router-dom';

import SaleButton from './cards/SaleButton';
import BackgroundTip from './cards/BackgroundTip';
import PreviewButton from './cards/PreviewButton';
import SettingsDropdown from './cards/SettingsDropdown';
import SellModal from '../Gradient/ListingModal';
import { gradientBackground } from '../utils/gradientBackground';


interface OwnerGradientCardProps {
  gradient: Gradient;
  onCancelButton: (id: string) => void;
  onSellButton: (id: string, price: string) => void;
}


const SellableCard = ({ gradient, onCancelButton, onSellButton }: OwnerGradientCardProps) => {

  const gradientBg = gradientBackground({ left: gradient.left, right: gradient.right })

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef()

  return (
    <div className="sm:w-56 m-3 relative">
      <div
        style={gradientBg}
        className="rounded-md rounded-b-none h-96 w-96 sm:w-56 sm:h-56"
      />
      <div className="absolute top-0 right-0 m-2 space-x-2">
        <SettingsDropdown id={gradient.id} onCancelSale={onCancelButton} onSetSale={() => setOpen(true)} />
        <PreviewButton id={gradient.id} />
      </div>
      <SellModal id={gradient.id} open={open} cancelButtonRef={cancelButtonRef} setOpen={setOpen} onClickSell={onSellButton} />
      <div className="shadow-md rounded-t-none rounded-md">
        <div className="px-4 py-4">
          <h3 className="text-md font-semibold pb-2 break-all">{gradient.left} - {gradient.right}</h3>
          <h4 className="text-xs ">of{" "}
            <Link className="hover:text-blue-500" to={`/owner/${gradient.owner}`}>
              @{shortenAddress(gradient.owner)}
            </Link>
          </h4>
        </div>
        {gradient.forSale ? <SaleButton price={Number(gradient.price)} /> : <BackgroundTip gradientBackground={gradientBg} />}
      </div>
    </div>
  )
}

export default SellableCard;