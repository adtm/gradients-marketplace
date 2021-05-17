import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Screens/Home'
import Artist from './Screens/Owner'
import Navigation from './Navbar/Navbar'
import GradientScreen from './Screens/Gradient'
import Banner from './Banner/Banner'

const Router = () => (
  <BrowserRouter>
    <Banner />
    <Navigation />
    <div className="md:mx-10 md:my-10 sm:mx-10 sm:my-10 my-5 mx-5">
      <Routes>
        <Route path="/gradient/:id">
          <GradientScreen />
        </Route>
        <Route path="/owner/:address">
          <Artist />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
)

export default Router
