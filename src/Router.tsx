import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Screens/Home'
import Artist from './Screens/Owner'
import Navigation from './Navbar/Navbar'
import GradientScreen from './Screens/Gradient'
import Banner from './Banner/Banner'
import Footer from './Footer/Footer'
import About from './Screens/About'
import { useEthereumProvider } from './hooks/ethereum'

const Router = () => {
  const { error } = useEthereumProvider()

  const renderNetworkCheck = () => {
    if (error === 'Wrong network')
      return (
        <div className="mx-auto text-center text-red-500 ">
          <p className="text-lg font-bold pb-5">
            <span className="mr-2">🚧</span>
            Wrong network
            <span className="ml-2">🚧</span>
          </p>
          <p className="text-sm">
            You have chosen an incorrect network, we currently support only{' '}
            <span className="font-bold">Harmony testnet</span>
          </p>
          <p className="text-sm">Mainnet is comming soon!</p>
        </div>
      )

    return (
      <Routes>
        <Route path="/gradient/:id">
          <GradientScreen />
        </Route>
        <Route path="/owner/:address">
          <Artist />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Routes>
    )
  }

  return (
    <BrowserRouter>
      <Banner />
      <Navigation />
      <div className="md:mx-10 md:my-10 sm:mx-10 sm:my-10 my-5 mx-5">{renderNetworkCheck()}</div>
      <Footer />
    </BrowserRouter>
  )
}

export default Router
