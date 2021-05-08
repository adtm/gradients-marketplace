import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import GradientScreen from "./Collectible/CollectibleScreen";
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import Artist from "./Artist/Artist";

const Router = () => { 
  return (
    <BrowserRouter>
      <Navigation />
      <div className="md:mx-10 md:my-10 sm:mx-10 sm:my-10 my-5 mx-5">
        <Switch>
          <Route path="/gradient/:id" strict>
            <GradientScreen />
          </Route>
          <Route path="/owner/:address" strict>
            <Artist />
          </Route>
          <Route path="/" >
            <Home />
          </Route>
        </Switch> 

      </div>

    </BrowserRouter>

  );
}

export default Router;