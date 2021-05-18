import React from 'react'
import { Units, fromWei } from '@harmony-js/utils'

interface SaleButtonProps {
  price: string
}

const SaleButton = ({ price }: SaleButtonProps) => (
  <div className="rounded-t-none w-full text-center px-4 py-2 font-semibold rounded-lg text-sm shadow-md text-white dark:text-black bg-black dark:bg-white">
    {Number(fromWei(price, Units.one)).toLocaleString('en')} <span className="text-xs">ONE</span>
  </div>
)

export default SaleButton
