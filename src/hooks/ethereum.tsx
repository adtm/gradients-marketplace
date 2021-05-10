import Web3 from 'web3';
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider';

import GradientTokenAbi from '../abi/GradientToken';
import GradientMarketplaceAbi from '../abi/GradientMarketplace';

const TokenContractAddress = '0x457cb2fAFEa75651865E771E310D26d9860b581B'
const MarketplaceContractAddress = '0x710c720311db1d40A4d6ccE8cf7dB06A4b027aAa'
const ContractDeployerAddress = '0x9D584097794D87ca8Fe59e7f378C0AfFe79038B9'


const MAIN_CHAIN_ID = "1666700000"
const TESTNET_CHAIN_ID = "1666600000"
const LOCALHOST_CHAIN_ID = "1337"

const HARMONY_CHAIN_IDS = new Set([TESTNET_CHAIN_ID, MAIN_CHAIN_ID, LOCALHOST_CHAIN_ID])

const useEthereumProvider = () => {
  const { ethereum } = window as any;
  const web3 = new Web3(Web3.givenProvider);

  // @ts-ignore
  const tokenContract = new web3.eth.Contract(GradientTokenAbi, TokenContractAddress, {
    from: ContractDeployerAddress,
  });

  // @ts-ignore
  const marketplaceContract = new web3.eth.Contract(GradientMarketplaceAbi, MarketplaceContractAddress, {
    from: ContractDeployerAddress,
  });

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

  return {
    error, account, ethereum, web3, 
    contracts: {
      tokenContract,
      marketplaceContract
    },
    addresses: {
      MarketplaceContractAddress
    }
  }
}

export {
  useEthereumProvider
}