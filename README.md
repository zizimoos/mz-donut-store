```
> ownerAddress : 0xB2b92a995Ea5e9542a36f573F01EbABCBAcCAb62
> ownerAddress : 0xB2b92a995Ea5e9542a36f573F01EbABCBAcCAb62
```

```zsh
❯ ganache-cli
Ganache CLI v6.12.2 (ganache-core: 2.13.2)
```

```zsh
> truffle migrate --reset

Replacing 'MzDountStore'
   ------------------------
   > transaction hash:    0x644a5622e22405e6f82c6e806dbaf19b947a565f2be324a24fc5705426545e7d
   > Blocks: 0            Seconds: 0
   > contract address:    0x2b92f61C6931d0c261E055B3260770Ad3353c5a5
   > block number:        8
   > block timestamp:     1664762072
   > account:             0xF8D733C0fA8bBB02beCc50187E6e99166a63bb44
   > balance:             99.88663984
   > gas used:            708501 (0xacf95)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01417002 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.01417002 ETH
```

```zsh
> solcjs --abi --include-path node_modules/ --base-path . contracts/MzDountStore.sol --output-dir contract/build
```
