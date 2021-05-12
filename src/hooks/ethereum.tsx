import Web3 from 'web3';
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider';

import GradientTokenAbi from '../abi/GradientToken';
import GradientMarketplaceAbi from '../abi/GradientMarketplace';

const TokenContractAddress = '0x72aa3f97b3Fadce17514512b626d8fB2beBeE6bD'
const MarketplaceContractAddress = '0xe7dECA40AaB2fb6aF8ca5555a79C1956A2B2b905'
const ContractDeployerAddress = '0x9c04aCdC92cdF7c6634d293c8aD2063Ce89dC4B6'


const MAIN_CHAIN_ID = "1666700000"
const TESTNET_CHAIN_ID = "1666600000"
const LOCALHOST_CHAIN_ID = "1337"
const ROPSTEN_CHAIN_ID = "3"

const HARMONY_CHAIN_IDS = new Set([TESTNET_CHAIN_ID, MAIN_CHAIN_ID, LOCALHOST_CHAIN_ID, ROPSTEN_CHAIN_ID])

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

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    _handleAccountsChanged(accounts);

    ethereum.on('accountsChanged', _handleAccountsChanged)
    ethereum.on('chainChanged', _handleChainIdChanged);
  }

  const _handleChainIdChanged = (chainId: string) => {
    const chainIdInDec = BigInt(chainId).toString(10);
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