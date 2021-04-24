import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Collectible from "./Collectible/CollectibleScreen";
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import Create from "./Collectible/Create";

const Router = () => { 
  return (
    <BrowserRouter>
      <Navigation />
      <div className="md:mx-10 md:my-10 sm:mx-10 sm:my-10 my-5 mx-5">
        <Switch>
          <Route path="/collectible/:id" strict>
            <Collectible collectibleId={"1"} />
          </Route>
          <Route path="/create" >
            <Create />
          </Route>
          <Route path="/" >
            <Home />
          </Route>

        </Switch>
        {/* <Home /> */}

      </div>

    </BrowserRouter>

  );
}

export default Router;