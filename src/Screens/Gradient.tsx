import React, { useState, useEffect } from 'react'
import { shortenAddress } from '../utils/addressShortener'
import { Link, useParams } from 'react-router-dom'
import Loader from '../Loaders/Loader'

import BN from 'bn.js'
import { useEthereumProvider } from '../hooks/ethereum'
import TransactionTable from '../Gradient/TransactionTable'
import { Gradient, Transaction } from '../types'
import { gradientBackground } from '../utils/gradientBackground'
import { Transition } from '@headlessui/react'
import BuyButton from '../Gradient/BuyButton'
import DisabledBuyButton from '../Gradient/DisabledBuyButton'
import { getMessageFromCode } from 'eth-rpc-errors'
import { logError } from '../utils/logger'
import mixpanel from 'mixpanel-browser'

const GradientScreen = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [buyError, setBuyError] = useState<string | null>(null)
  const [gradientError, setGradientError] = useState<string | null>(null)
  const [transactionError, setTransactionError] = useState<string | null>(null)
  const [buyLoading, setBuyLoading] = useState<boolean>(false)

  // @ts-ignore
  const [gradient, setGradient] = useState<Gradient | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const {
    account,
    contracts: { tokenContract, marketplaceContract },
  } = useEthereumProvider()

  const getGradient = async () => {
    try {
      const { left, right, owner } = await tokenContract.methods.getGradient(id).call()
      const { price, forSale } = await marketplaceContract.methods.sellTransactionByTokenId(id).call()

      const gradient = { id, left, right, owner, price, forSale }
      setGradient(gradient)
    } catch (err) {
      if (err.code !== 4001) {
        const message = getMessageFromCode(err.code)
        setGradientError(message)
      }
      logError(err)
    } finally {
      mixpanel.track('gradient-get', { id, owner: account })
    }
  }

  const getTransactions = async () => {
    try {
      const length = await marketplaceContract.methods.getTransactionCount(new BN(id)).call()

      const transactionsFetched = []
      for (let i = 0; i < length; i++) {
        const { buyer, owner, price, date } = await marketplaceContract.methods.getTransaction(new BN(id), i).call()
        transactionsFetched.push({ buyer, owner, price, date })
      }

      if (transactionsFetched.length > 0) {
        setTransactions(transactionsFetched.sort((f, s) => s.date - f.date))
      } else {
        setTransactions(transactionsFetched)
      }
    } catch (err) {
      if (err.code !== 4001) {
        const message = getMessageFromCode(err.code)
        setTransactionError(message)
      }
      logError(err)
    }
  }

  const buyGradient = async (price: string) => {
    try {
      setBuyLoading(true)
      await marketplaceContract.methods.buyGradient(id).send({
        from: account,
        value: new BN(price),
        gas: 1000000,
      })
      mixpanel.track('gradient-bought', { id, owner: account })
    } catch (err) {
      if (err.code !== 4001) {
        const message = getMessageFromCode(err.code)
        setBuyError(message)
      }
      logError(err)
    } finally {
      mixpanel.track('gradient-clicked-buy', { id, owner: account })
      setBuyLoading(false)
      Promise.all([getGradient(), getTransactions()])
    }
  }

  useEffect(() => {
    async function load() {
      try {
        await Promise.all([getGradient(), getTransactions()])
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => {
      // @ts-ignore
      setGradient({})
      setTransactions([])
    }
  }, [account])

  return (
    <div>
      {loading ? <Loader /> : null}
      <Transition
        show={!loading}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mt-10 sm:mt-40 ">
          {gradientError ? (
            <div className="mx-auto text-center text-red-500">
              <p className="text-lg font-medium italic pb-2">{gradientError}</p>
              <p className="text-sm italic">Please refresh page</p>
              <p className="text-xs">If this continues, please contact us.</p>
            </div>
          ) : (
            <div>
              {gradient ? (
                <div className="md:flex text-black dark:text-white">
                  <div className="flex flex-grow items-center justify-center">
                    <div
                      style={gradientBackground({ left: gradient.left, right: gradient.right })}
                      className="w-96 h-96 rounded-md relative"
                    >
                      <p className="absolute text-xs p-2 italic font-medium dark:text-black text-white">
                        # {gradient.id}
                      </p>
                    </div>
                  </div>
                  <div className="md:flex-1">
                    <div className="pb-2 pt-5">
                      <h1 className="text-2xl sm:text-4xl font-bold">
                        {gradient.left} - {gradient.right}
                      </h1>
                    </div>
                    <div className="pb-3">
                      <div className="flex items-center">
                        <h3 className="font-semibold">
                          of{' '}
                          <Link className="text-blue-500" to={`/owner/${gradient.owner}`}>
                            @{shortenAddress(gradient.owner)}
                          </Link>
                        </h3>
                      </div>
                    </div>
                    <div className="pt-8 md:text-left text-center">
                      {gradient.forSale ? (
                        <div>
                          <BuyButton
                            buyLoading={buyLoading}
                            isOwner={gradient.owner.toLowerCase() === account?.toLowerCase()}
                            price={gradient.price}
                            buyGradient={() => buyGradient(gradient.price)}
                          />
                          {buyError ? (
                            <p className="text-lg font-medium text-red-500">{buyError} Check gas fees.</p>
                          ) : null}
                        </div>
                      ) : (
                        <DisabledBuyButton
                          isOwner={gradient.owner ? gradient.owner.toLowerCase() === account?.toLowerCase() : false}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-20 w-full md:w-2/3 lg:w-1/2 m-auto">
                <p className="text-sm mb-5 text-black dark:text-white">Transactions</p>
                <div>
                  {transactionError ? (
                    <div className="text-red-500 font-medium text-lg">
                      <p>{transactionError}</p>
                    </div>
                  ) : (
                    <TransactionTable transactions={transactions} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Transition>
    </div>
  )
}

export default GradientScreen
