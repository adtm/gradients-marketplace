import Web3 from 'web3';
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider';

import GradientTokenAbi from '../abi/GradientToken';
import GradientMarketplaceAbi from '../abi/GradientMarketplace';

const TokenContractAddress = '0x35Be040CA6CB7Ba6F2CEc5f73e5c05455e93b539'
const MarketplaceContractAddress = '0x36327EB163A96d2231ac564A10Bacd19a23f565A'
const ContractDeployerAddress = '0x229a04f2dcDc410C803F3cDa4c489A1Ce62A05b1'


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

    ethereum.on('accountsChanged', _handleAccountsChanged)
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