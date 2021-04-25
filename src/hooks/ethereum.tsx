import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider';

const MAIN_CHAIN_ID = "1666700000"
const TESTNET_CHAIN_ID = "1666600000"

const HARMONY_CHAIN_IDS = new Set([TESTNET_CHAIN_ID, MAIN_CHAIN_ID])

const useEthereumProvider = () => {
  const { ethereum } = window as any;

  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    _connect();
  }, [])

  const _connect = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        return setError("Multiple wallets detected")
      }
      _connectProvider()
    } else {
      setError("MetaMask not installed")
    }
  }

  const _connectProvider = async () => {
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    _handleChainIdChanged(chainId);

    setInterval(async () => {
      const account = await ethereum.request({ method: 'eth_accounts' })
      _handleAccountsChanged(account)
    }, 1000)

    ethereum.on('chainChanged', _handleChainIdChanged);
  }

  const _handleChainIdChanged = (chainId: string) => {
    const chainIdInDec = BigInt(chainId).toString(10)
    if (!HARMONY_CHAIN_IDS.has(chainIdInDec)) {
      setError("Wrong network")
    } else {
      setError(null);
    }
  }

  const _handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null);
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
    }
  }

  return { error, account, ethereum }
}

export {
  useEthereumProvider
}