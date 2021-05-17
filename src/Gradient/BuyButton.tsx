import React from 'react'
import { useEthereumProvider } from '../hooks/ethereum'


interface BuyButtonProps {
  isOwner: boolean;
  buyLoading: boolean;
  price: number;
  buyGradient: () => Promise<void>;
}


const BuyButton = ({ isOwner, buyLoading, price, buyGradient }: BuyButtonProps) => {

  const { openMetamask, account } = useEthereumProvider();

  const NotConnectedButton = () => (
    <button onClick={() => openMetamask()} className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white dark:text-black bg-black dark:bg-white hover:bg-gray-700">
      Connect Metamask
    </button>
  )

  const OwnerSellableButton = () => (
    <button disabled className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black bg-gray-700 cursor-not-allowed">
      Yours
    </button>
  )

  return (
    <div>
      <h3 className="text-3xl font-semibold py-1">{Number(price).toLocaleString()} <span className="text-sm">ONE</span></h3>
      {!account ? <NotConnectedButton /> : isOwner ? <OwnerSellableButton /> : <SellableButton buyGradient={buyGradient} buyLoading={buyLoading} />}
    </div>
  )
}

interface SellableButtonProps {
  buyLoading: boolean;
  buyGradient: () => Promise<void>;
}

const SellableButton = ({ buyLoading, buyGradient }: SellableButtonProps) => (

  <button disabled={buyLoading} onClick={buyGradient} className={`md:w-auto w-full text-white dark:text-black bg-black dark:bg-white my-3 h-100 py-3 px-20 font-semibold rounded-lg shadow-md ${buyLoading ? "cursor-not-allowed bg-gray-700" : "hover:bg-gray-700"} `}>
    {buyLoading ? (
      <div>
        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    ) : "Buy now"}
  </button>
)

export default BuyButton;