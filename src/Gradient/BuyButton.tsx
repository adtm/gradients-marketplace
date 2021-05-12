import React from 'react'


interface BuyButtonProps {
  isOwner: boolean;
  price: number;
  buyGradient: () => Promise<void>;
}

const BuyButton = ({ isOwner, price, buyGradient }: BuyButtonProps) => {
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
      {isOwner ? <OwnerSellableButton /> : <SellableButton />}
    </div>
  )
}

export default BuyButton;