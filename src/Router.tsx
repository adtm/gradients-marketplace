import React, { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from "react-router-dom";

import Collectible from "./Collectible/Collectible";
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import Create from "./Collectible/Create";
import Web3 from 'web3'

import { Harmony, HarmonyExtension } from '@harmony-js/core'
import { ChainID, ChainType } from '@harmony-js/utils'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from "@web3-react/injected-connector";
import detectEthereumProvider from '@metamask/detect-provider';
import collectibles from "./data/collectibles";

// @ts-ignore
function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const Router = () => {

  const injectedConnector = new InjectedConnector({
    supportedChainIds: [
      1666700000, // MAIN NET
      1666600000 // TEST NET 
    ],
  })

  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context
  const isHmyLibrary = (library?.messenger?.chainType === 'hmy')

  // const signInMetamask = async () => {
  //   const provider = await detectEthereumProvider();

  //   // @ts-ignore
  //   if (provider !== window.ethereum) {
  //     console.error('Do you have multiple wallets installed?');
  //   }

  //   if (!provider) {
  //     console.error('Metamask not found');
  //     return;
  //   }

  //   // MetaMask events
  //   // provider.on('accountsChanged', handleAccountsChanged);

  //   // @ts-ignore
  //   provider.on('disconnect', () => {
  //     console.log('disconnect');
  //     // setAuthorised(false);
  //     // setAccount('');
  //   });

  //   // @ts-ignore
  //   provider.on('chainIdChanged', (chainId: string) =>
  //     console.log('chainIdChanged', chainId),
  //     console.log('chainIdChanged', context),

  //   );

  //   // @ts-ignore
  //   provider.on('networkChanged', chainId =>
  //     console.log('networkChanged', chainId),
  //     console.log('networkChanged', context),
  //   );

  //   // @ts-ignore
  //   provider
  //     .request({ method: 'eth_requestAccounts' })
  //     .then(async (params: any) => {
  //       // handleAccountsChanged(params);
  //       // setAuthorised(true);
  //       console.log(params)
  //     })
  //     .catch((err: any) => {
  //       // setAuthorised(false);

  //       if (err.code === 4001) {
  //         console.error('Please connect to MetaMask.');
  //       } else {
  //         console.error(err);
  //       }
  //     });
  // };

  const foo = async () => {
    // signInMetamask()
    try {
      await activate(injectedConnector)
      console.log(error)
      // console.log("--")
      // console.log(chainId == 1666600000) 

    } catch (err) {
      console.log(err)
    }
    
    // console.log(await activate(injected))
    // console.log(context)
  }

  useEffect(() => {
    foo()
  }, [library, account, chainId]) 


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