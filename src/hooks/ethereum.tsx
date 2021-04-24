import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider';

const useEthereumProvider = (supportedChainIds: Set<string>) => {

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
    if (!supportedChainIds.has(chainIdInDec)) {
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