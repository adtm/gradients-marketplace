import React, { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'

import { Gradient } from '../types'
import Loader from '../Loaders/Loader'
import DisplayCard from '../Cards/DisplayCard'
import { useEthereumProvider } from '../hooks/ethereum'
import { getMessageFromCode } from 'eth-rpc-errors'

const Home = () => {
  const navigate = useNavigate()

  const [gradients, setGradients] = useState<Gradient[]>([])

  const [supply, setSupply] = useState(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const {
    account,
    contracts: { tokenContract, marketplaceContract },
  } = useEthereumProvider()

  // @NOTE: only for development purposes
  const mintTokens = async () => {
    const gradients = [
      { left: '#FCE38A', right: '#F38181' },
      { left: '#F54EA2', right: '#FF7676' },
      { left: '#17EAD9', right: '#6078EA' },
      { left: '#622774', right: '#C53364' },
      { left: '#7117EA', right: '#EA6060' },
      { left: '#42E695', right: '#3BB2B8' },
      { left: '#F02FC2', right: '#6094EA' },
      { left: '#65799B', right: '#5E2563' },
      { left: '#184E68', right: '#57CA85' },
      { left: '#58247A', right: '#1BCEDF' },
    ]

    for (let i = 0; i < gradients.length; i++) {
      try {
        await tokenContract.methods.createGradient(gradients[i].left, gradients[i].right).send({
          from: account,
          gas: 1000000,
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  const getGradients = async () => {
    try {
      const totalSupply = await tokenContract.methods.totalSupply().call()
      setSupply(totalSupply)

      const fetchedGradients = []
      for (let id = 0; id < totalSupply; id++) {
        const { left, right, owner } = await tokenContract.methods.getGradient(id).call()
        const { price, forSale } = await marketplaceContract.methods.sellTransactionByTokenId(id).call()

        const gradient: Gradient = { id: id.toString(), left, right, owner, price, forSale }
        fetchedGradients.push(gradient)
      }

      setGradients(fetchedGradients)
    } catch (err) {
      if (err.code !== 4001) {
        const message = getMessageFromCode(err.code)
        setError(message)
      }
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // mintTokens()
    getGradients()
    return () => {
      setGradients([])
      setLoading(true)
    }
  }, [])

  const renderNotConnectedMetamaskOrComponent = (component: React.ReactNode) => {
    if (loading) return <Loader />
    if (error)
      return (
        <div className="text-center text-red-500">
          <p className="text-lg font-medium italic pb-2">{error}</p>
          <p className="text-sm italic">Please refresh page</p>
          <p className="text-xs">If this continues, please contact us.</p>
        </div>
      )
    return component
  }

  return (
    <div className="container mx-auto">
      <div className="text-center py-5 sm:py-10 mx-auto ">
        <h1 className="tracking-tight font-extrabold text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl">
          Gradients for the
        </h1>
        <h1 className="text-3xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl w-2/3 md:w-1/3 p-1 sm:p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mx-auto m-3">
          inner artist
        </h1>
        <p className="text-xs italic text-black dark:text-white">on blockchain</p>
        <span className="text-xs italic text-black dark:text-white">{supply}/100</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce mx-auto mt-7 text-black dark:text-white h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
        </svg>
      </div>

      {renderNotConnectedMetamaskOrComponent(
        <Transition
          show={!loading}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex flex-wrap flex-auto justify-center">
            {gradients.map((gradient) => (
              <a className="cursor-pointer" key={gradient.id} onClick={() => navigate(`/gradient/${gradient.id}`)}>
                <DisplayCard gradient={gradient} />
              </a>
            ))}
          </div>
        </Transition>
      )}
    </div>
  )
}

export default Home
