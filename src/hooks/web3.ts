import Web3 from 'web3'

const getWeb3 = () => {
  // @ts-ignore
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    return new Web3(Web3.givenProvider)
  } else {
    const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_ROPSTEN_INFURA_URL as string)
    return new Web3(provider)
  }
}

export { getWeb3 }
