import React, { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'

import { Gradient } from '../types'
import Loader from '../Loaders/Loader'
import DisplayCard from '../Cards/DisplayCard'
import { useEthereumProvider } from '../hooks/ethereum'
import { getMessageFromCode } from 'eth-rpc-errors'
import { logError } from '../utils/logger'
import mixpanel from 'mixpanel-browser'

const Home = () => {
  const navigate = useNavigate()

  const [gradients, setGradients] = useState<Gradient[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const {
    account,
    contracts: { tokenContract, marketplaceContract },
  } = useEthereumProvider()

  // @NOTE: only for development purposes
  const mintTokens = async () => {
    const rights = [
      '#F38181',
      '#FF7676',
      '#6078EA',
      '#C53364',
      '#EA6060',
      '#3BB2B8',
      '#6094EA',
      '#5E2563',
      '#57CA85',
      '#1BCEDF',
      '#F76B11',
      '#DDD6F2',
      '#FFBBE3',
      '#2AF594',
      '#FF2525',
      '#FF0006',
      '#FC00FA',
      '#ff9063',
      '#00b3c4',
      '#6699fB',
      '#ff6b0C',
      '#b2ffd2',
      '#D7FFFE',
      '#fef9d7',
      '#66a6ff',
      '#f6f3ff',
      '#99c99c',
      '#d09693',
      '#fe5196',
      '#04befe',
      '#c7eafd',
      '#fdd6bd',
      '#f9f047',
      '#68e0cf',
      '#7579ff',
      '#F9FEA5',
      '#FBD786',
      '#b91d73',
      '#2C5364',
      '#FFF200',
      '#0083B0',
      '#ef8e38',
      '#99f2c8',
      '#fbc2eb',
      '#e6dee9',
      '#e2ebf0',
      '#f5576c',
      '#00f2fe',
      '#330867',
      '#e7f0fd',
    ]

    const lefts = [
      '#FCE38A',
      '#F54EA2',
      '#17EAD9',
      '#622774',
      '#7117EA',
      '#42E695',
      '#F02FC2',
      '#65799B',
      '#184E68',
      '#58247A',
      '#FAD961',
      '#FAACA8',
      '#A9C9FF',
      '#08AEEA',
      '#FFE53B',
      '#6284FF',
      '#00DBDE',
      '#f85032',
      '#d6ff7f',
      '#000066',
      '#e233ff',
      '#2f80ed',
      '#FFFEFF',
      '#d299c2',
      '#89f7fe',
      '#cd9cf2',
      '#dcb0ed',
      '#c71d6f',
      '#f77062',
      '#4481eb',
      '#e8198b',
      '#f794a4',
      '#0fd850',
      '#209cff',
      '#b224ef',
      '#20E2D7',
      '#C6FFDD',
      '#f953c6',
      '#0F2027',
      '#1E9600',
      '#00B4DB',
      '#108dc7',
      '#1f4037',
      '#a18cd1',
      '#fdcbf1',
      '#cfd9df',
      '#f093fb',
      '#4facfe',
      '#30cfd0',
      '#accbee',
    ]

    for (let i = 0; i < 50; i++) {
      try {
        await tokenContract.methods.createGradient(lefts[i], rights[i]).send({
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
      logError(err)
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
    if (loading) return component
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
        <>
          {loading ? <Loader /> : null}
          <Transition
            show={!loading}
            enter="delay-500 transition-opacity ease-linear duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex flex-wrap flex-auto justify-center">
              {gradients.map((gradient) => (
                <a
                  className="cursor-pointer"
                  key={gradient.id}
                  onClick={() => {
                    mixpanel.track('home-to-card', { id: gradient.id, owner: account })
                    navigate(`/gradient/${gradient.id}`)
                  }}
                >
                  <DisplayCard gradient={gradient} />
                </a>
              ))}
            </div>
          </Transition>
        </>
      )}
    </div>
  )
}

export default Home
