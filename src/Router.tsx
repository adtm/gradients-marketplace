import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Home from "./Screens/Home";
import Artist from "./Screens/Owner";
import Navigation from "./Navbar/Navbar";
import GradientScreen from "./Screens/Gradient";

const Router = () => (
  <BrowserRouter>
    <Navigation />
    <div className="md:mx-10 md:my-10 sm:mx-10 sm:my-10 my-5 mx-5">
      <Switch>
        <Route path="/gradient/:id" sensitive strict>
          <GradientScreen />
        </Route>
        <Route path="/owner/:address" sensitive strict>
          <Artist />
        </Route>
        <Route path="/" >
          <Home />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;