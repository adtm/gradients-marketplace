import React from 'react'
import { useEthereumProvider } from '../hooks/ethereum'


interface BuyButtonProps {
  isOwner: boolean;
  price: number;
  buyGradient: () => Promise<void>;
}

const BuyButton = ({ isOwner, price, buyGradient }: BuyButtonProps) => {

  const { openMetamask, account } = useEthereumProvider();

  const NotConnectedButton = () => (
    <button onClick={() => openMetamask()} className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
      Connect Metamask
    </button>
  )

  const SellableButton = () => (
    <button onClick={buyGradient} className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
      Buy now
    </button>
  )

  const OwnerSellableButton = () => (
    <button disabled className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black bg-gray-700 cursor-not-allowed">
      This is yours
    </button>
  )

  return (
    <div>
      <h3 className="text-3xl font-semibold py-1">{Number(price).toLocaleString()} <span className="text-sm">ONE</span></h3>
      {!account ? <NotConnectedButton /> : isOwner ? <OwnerSellableButton /> : <SellableButton />}
    </div>
  )
}

export default BuyButton;