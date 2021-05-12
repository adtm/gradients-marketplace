import React from 'react'

interface SaleButtonProps {
  price: number;
}

const SaleButton = ({ price }: SaleButtonProps) => (
  <div className="rounded-t-none w-full text-center px-4 py-2 font-semibold rounded-lg text-sm shadow-md text-white bg-black">
    {Number(price).toLocaleString("en")} <span className="text-xs">ONE</span>
  </div>
)

export default SaleButton;