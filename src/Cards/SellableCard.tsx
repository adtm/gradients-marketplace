import React, { useState, useRef, useEffect } from 'react'
import { shortenAddress } from '../utils/addressShortener'

import { Gradient } from '../types'
import { useNavigate } from 'react-router-dom'

import SaleButton from './cards/SaleButton'
import BackgroundTip from './cards/BackgroundTip'
import PreviewButton from './cards/PreviewButton'
import SettingsDropdown from './cards/SettingsDropdown'
import SellModal from '../Gradient/ListingModal'
import { gradientBackground } from '../utils/gradientBackground'
import { useEthereumProvider } from '../hooks/ethereum'
import { getMessageFromCode } from 'eth-rpc-errors'
import { Units, toWei, numToStr } from '@harmony-js/utils'

interface OwnerGradientCardProps {
  gradient: Gradient
  getGradients: () => void
}

const SellableCard = ({ gradient, getGradients }: OwnerGradientCardProps) => {
  const navigate = useNavigate()

  const [cancelError, setCancelError] = useState<string | null>()
  const [saleError, setSaleError] = useState<string | null>()

  const gradientBg = gradientBackground({ left: gradient.left, right: gradient.right })
  const {
    account,
    contracts: { tokenContract, marketplaceContract },
  } = useEthereumProvider()

  const [open, setOpen] = useState(false)
  const [saleLoading, setSaleLoading] = useState<boolean>(false)
  const cancelButtonRef = useRef()

  const setForSale = async (id: string, price: string) => {
    try {
      setSaleLoading(true)
      await tokenContract.methods.approve(process.env.REACT_APP_GRADIENT_MARKETPLACE_ADDRESS, id).send({
        from: account,
      })
      await marketplaceContract.methods.sellGradient(id, numToStr(toWei(price, Units.one))).send({
        from: account,
        gas: 200000,
      })
      await getGradients()
    } catch (err) {
      if (err.code !== 4001) {
        const message = getMessageFromCode(err.code)
        setSaleError(message)
      }
    } finally {
      setSaleLoading(false)
    }
  }

  const cancelSale = async (id: string) => {
    try {
      setSaleLoading(true)
      await marketplaceContract.methods.cancelSellGradient(id).send({
        from: account,
        gas: 200000,
      })
      await getGradients()
    } catch (err) {
      if (err.code !== 4001) {
        const message = getMessageFromCode(err.code)
        setCancelError(message)
      }
      console.error(err)
    } finally {
      setSaleLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      setOpen(false)
      setSaleError(null)
      setCancelError(null)
      setSaleLoading(true)
    }
  }, [])

  return (
    <div className="m-3 relative bg-white dark:bg-gray-800">
      <div style={gradientBg} className="rounded-md rounded-b-none xs:w-72 w-80 sm:w-72 h-80">
        <p className="absolute text-xs p-2 italic font-medium dark:text-black text-white"># {gradient.id}</p>
        {saleLoading ? (
          <div className="rounded-md rounded-b-none xs:w-72 w-80 sm:w-72 h-80 bg-gray-300 bg-opacity-80 flex justify-center items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-7 w-7 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : null}
      </div>
      <div className="absolute top-0 right-0 m-2 space-x-2">
        <SettingsDropdown
          onSale={gradient.forSale}
          id={gradient.id}
          onCancelSale={cancelSale}
          onSetSale={() => setOpen(true)}
        />
        <PreviewButton id={gradient.id} />
      </div>
      <SellModal
        id={gradient.id}
        open={open}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen}
        onClickSell={setForSale}
      />
      {saleError || cancelError ? (
        <div className="bg-red-500">
          <p className="text-white px-2">{saleError || cancelError}</p>
        </div>
      ) : null}
      <div className="shadow-md rounded-t-none rounded-md dark:text-white text-black">
        <div className="px-4 py-4">
          <h3 className="text-md font-semibold pb-2 break-all">
            {gradient.left} - {gradient.right}
          </h3>
          <h4 className="text-xs ">
            of{' '}
            <button className="hover:text-blue-500" onClick={() => navigate(`/owner/${gradient.owner}`)}>
              @{shortenAddress(gradient.owner)}
            </button>
          </h4>
        </div>
        {gradient.forSale ? <SaleButton price={gradient.price} /> : <BackgroundTip gradientBackground={gradientBg} />}
      </div>
    </div>
  )
}

export default SellableCard
