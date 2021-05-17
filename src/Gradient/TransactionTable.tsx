import React from 'react'
import { shortenAddress } from '../utils/addressShortener'
import { Link } from 'react-router-dom'
import { Transaction } from '../types'

interface TransactionTableProps {
  transactions: Transaction[]
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  if (transactions.length === 0) {
    return <p className="text-xs text-black dark:text-white">No transactions yet 🌻</p>
  }

  return (
    <div className="flex flex-col text-black">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Owner
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Buyer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.date}>
                    <td className="px-6 py-4">
                      <div className="text-sm">{new Date(Number(transaction.date) * 1000).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <Link to={`/owner/${transaction.owner}`}>
                        <div className="text-sm hover:text-blue-500">@{shortenAddress(transaction.owner)}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <Link to={`/owner/${transaction.buyer}`}>
                        <div className="text-sm hover:text-blue-500">@{shortenAddress(transaction.buyer)}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {Number(transaction.price).toLocaleString()} <span className="text-xs">ONE</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
