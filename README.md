### local development

```
  # launch ganache on port :7545
  npm start && npx truffle deploy
```

### ropsten

```
  # faucet https://ipfs.io/ipfs/QmVAwVKys271P5EQyEfVSxm7BJDKWt42A2gHvNmxLjZMps/
  npx truffle deploy --network ropsten
```

### harmony testnet

```
  # faucet https://faucet.pops.one/
  npx truffle deploy --network harmony_testnet --skip-dry-run --reset
```
