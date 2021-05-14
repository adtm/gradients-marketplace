import Web3 from 'web3';
import { AbiItem } from 'web3-utils'

import GradientTokenAbi from '../abi/GradientToken.json'
import GradientMarketplaceAbi from '../abi/GradientMarketplace.json';

const web3 = new Web3(process.env.ROPSTEN_INFURA_URL);

const tokenContract = new web3.eth.Contract(GradientTokenAbi as AbiItem[], process.env.GRADIENT_TOKEN_ADDRESS, {
  from: process.env.GRADIENT_DEPLOYER_ADDRESS,
});

const marketplaceContract = new web3.eth.Contract(GradientMarketplaceAbi as AbiItem[], process.env.GRADIENT_MARKETPLACE_ADDRESS, {
  from: process.env.GRADIENT_DEPLOYER_ADDRESS,
});

export {
  web3,
  tokenContract,
  marketplaceContract
}
