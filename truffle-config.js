const { TruffleProvider } = require("@harmony-js/core");

const gasLimit = 3321900;
const gasPrice = 1000000000;

module.exports = {
  networks: {
    local: {
      network_id: "*",
      host: "127.0.0.1",
      port: 7545,
    },
    testnet: {
      network_id: "2",
      provider: () => {
        const truffleProvider = new TruffleProvider(
          process.TESTNET_URL,
          { memonic: process.ACCOUNT_MNEMORIC },
          { shardID: 0, chainId: 2 },
          { gasLimit, gasPrice }
        );
        const newAcc = truffleProvider.addByPrivateKey(process.ACCOUNT_PRIVATE_KEY);
        truffleProvider.setSigner(newAcc);

        return truffleProvider;
      }
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
      docker: false,
      parser: "solcjs"
    }
  }
}
