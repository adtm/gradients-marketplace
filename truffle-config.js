require('dotenv').config()
const { TruffleProvider } = require('@harmony-js/core')
const HDWalletProvider = require('truffle-hdwallet-provider')

const gasLimit = 6721900
const gasPrice = 10000000000

module.exports = {
  networks: {
    local: {
      network_id: '*',
      host: '127.0.0.1',
      port: 7545,
    },
    ropsten: {
      network_id: 3,
      provider: () => {
        return new HDWalletProvider(process.ACCOUNT_MNEMORIC, process.ROPSTEN_URL)
      },
      gas: 4000000,
    },
    harmony_testnet: {
      network_id: '2',
      provider: () => {
        const truffleProvider = new TruffleProvider(
          process.HARMONY_TESTNET_URL,
          { memonic: process.ACCOUNT_MNEMORIC },
          { shardID: 0, chainId: 2 },
          { gasLimit, gasPrice }
        )
        const newAcc = truffleProvider.addByPrivateKey(process.ACCOUNT_PRIVATE_KEY)
        truffleProvider.setSigner(newAcc)

        return truffleProvider
      },
    },
  },
  compilers: {
    solc: {
      version: '0.8.0',
      docker: false,
      parser: 'solcjs',
    },
  },
}
