import { getWeb3 } from './web3'
import { AbiItem } from 'web3-utils'
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import mixpanel from 'mixpanel-browser'

import GradientTokenAbi from '../abi/GradientToken.json'
import GradientMarketplaceAbi from '../abi/GradientMarketplace.json'

const MAIN_CHAIN_ID = '1666700000'
const TESTNET_CHAIN_ID = '1666600000'
const LOCALHOST_CHAIN_ID = '1337'
const ROPSTEN_CHAIN_ID = '3'

const HARMONY_CHAIN_IDS = new Set([TESTNET_CHAIN_ID, MAIN_CHAIN_ID, LOCALHOST_CHAIN_ID])

const useEthereumProvider = () => {
  const { ethereum } = window as any
  const web3 = getWeb3()

  const tokenContract = new web3.eth.Contract(
    GradientTokenAbi as AbiItem[],
    process.env.REACT_APP_GRADIENT_TOKEN_ADDRESS,
    {
      from: process.env.REACT_APP_GRADIENT_DEPLOYER_ADDRESS,
    }
  )

  const marketplaceContract = new web3.eth.Contract(
    GradientMarketplaceAbi as AbiItem[],
    process.env.REACT_APP_GRADIENT_MARKETPLACE_ADDRESS,
    {
      from: process.env.REACT_APP_GRADIENT_DEPLOYER_ADDRESS,
    }
  )

  const [error, setError] = useState<string | null>(null)
  const [internalError, setInternalError] = useState<string | null>(null)
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    _connect()
  }, [])

  const openMetamask = async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      _handleAccountsChanged(accounts)
    } catch (err) {
      console.error(err)
      setInternalError(err.message)
    }
  }

  const _connect = async () => {
    const provider = await detectEthereumProvider()
    if (provider) {
      if (provider !== window.ethereum) {
        return setError('Multiple wallets detected')
      }
      _connectProvider()
    } else {
      setError('MetaMask not installed')
    }
  }

  const _connectProvider = async () => {
    try {
      const chainId = await ethereum.request({ method: 'eth_chainId' })
      _handleChainIdChanged(chainId)

      const isWalletUnlocked = await ethereum._metamask.isUnlocked()
      if (isWalletUnlocked) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        _handleAccountsChanged(accounts)
      }

      ethereum.on('accountsChanged', _handleAccountsChanged)
      ethereum.on('chainChanged', _handleChainIdChanged)
    } catch (err) {
      console.error(err)
      setInternalError(err.message)
    }
  }

  const _handleChainIdChanged = (chainId: string) => {
    const chainIdInDec = BigInt(chainId).toString(10)
    if (!HARMONY_CHAIN_IDS.has(chainIdInDec)) {
      setError('Wrong network')
    } else {
      setError(null)
    }
  }

  const _handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null)
    } else if (accounts[0] !== account) {
      mixpanel.identify(accounts[0])
      setAccount(accounts[0])
    }
  }

  return {
    error,
    internalError,
    account,
    ethereum,
    web3,
    contracts: {
      tokenContract,
      marketplaceContract,
    },
    openMetamask,
  }
}

export { useEthereumProvider }
