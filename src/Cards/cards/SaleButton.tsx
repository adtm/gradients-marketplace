import React from 'react'
import { weiToOne } from '../../utils/onePrice'

interface SaleButtonProps {
  price: number
}

const SaleButton = ({ price }: SaleButtonProps) => (
  <div className="rounded-t-none w-full text-center px-4 py-2 font-semibold rounded-lg text-sm shadow-md text-white dark:text-black bg-black dark:bg-white">
    {weiToOne(price).toLocaleString('en')} <span className="text-xs">ONE</span>
  </div>
)

export default SaleButton