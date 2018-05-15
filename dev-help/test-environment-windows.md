# Test Environment on Windows


## Background
There are various ways to test your Dapp.  If someone else know's more about this that I do, please update this guide!
   * Run testnet locally - Gas is free and it's super fast.  Useful whe building your Dapps, but it's a true test. 
   * Run a private network - This is surprisingly easy to do.  I'm sure there are youtube guides that will step you through it.  If you don't mind running a VPS linux instance, you might be able to have a very cheap private blockchain.
   * Use the Ropsten network - You might have to mine a little coin or visit the faucet app.  Generally speaking, it's free and it behaves similarly to the real production network.  This is a great pre-production area to test your Dapp.
   
This guide will focus on using the 'testrpc' locally.
 
## Before we start
TestRpc is being taken over by and/or replaced by something called ganache.  From what I can tell, it's the same thing.  Probably has a few niceties that have been added.
 
 
## Installing ganache (testRpc) on Windows
Open up a command window and install Node.  There are plenty of guides to do this, but this one seems to cover the basics and to make sure you have 'npm' running:
  * http://blog.teamtreehouse.com/install-node-js-npm-windows 
  
Next, install the ganache-cli.

```
c:\SomeFolder> npm install -g ganache-cli
```


Next, run ganache-cli
```
$ ganache-cli -e 100000 -l 4712388 -d --noVMErrorsOnRPCResponse

Some useful notes:
-e to give the accounts more eth, test with pirl's 20k deposit
-l to use a block limit of the real network, since 90k is sometimes low and causes errors deploying large contracts
-d so it generates the same account/private keys each time
I added --noVMErrorsOnRPCResponse because I thought this might stop it from returning errors with the data field populated with a json stack trace, which caused web3J to barf on deserializing, but im not sure it works like that.  In any case, the next web3J should fix parsing the data field https://github.com/web3j/web3j/pull/443
```

You should see:
```
C:\Users\pirl>ganache-cli -e 100000 -l 4712388 -d --noVMErrorsOnRPCResponse
Ganache CLI v6.1.0 (ganache-core: 2.1.0)

Available Accounts
==================
(0) 0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1
(1) 0xffcf8fdee72ac11b5c542428b35eef5769c409f0
(2) 0x22d491bde2303f2f43325b2108d26f1eaba1e32b
(3) 0xe11ba2b4d45eaed5996cd0823791e0c93114882d
(4) 0xd03ea8624c8c5987235048901fb614fdca89b117
(5) 0x95ced938f7991cd0dfcb48f0a06a40fa1af46ebc
(6) 0x3e5e9111ae8eb78fe1cc3bb8915d5d461f3ef9a9
(7) 0x28a8746e75304c0780e011bed21c72cd78cd535e
(8) 0xaca94ef8bd5ffee41947b4585a84bda5a3d3da6e
(9) 0x1df62f291b2e969fb0849d99d9ce41e2f137006e

Private Keys
==================
(0) 4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
(1) 6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1
(2) 6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c
(3) 646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913
(4) add53f9a7e588d003326d1cbf9e4a43c061aadd9bc938c843a79e7b4fd2ad743
(5) 395df67f0c2d2d9fe1ad08d1bc8b6627011959b79c53d7dd6a3536a33ab8a4fd
(6) e485d098507f54e7733a205420dfddbe58db035fa577fc294ebd14db90767a52
(7) a453611d9419d0e56f499079478fd72c37b251a94bfde4d19872c44cf65386e3
(8) 829e924fdf021ba3dbbc4225edfece9aca04b929d6e75613329ca6f1d31c0bb4
(9) b0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773

HD Wallet
==================
Mnemonic:      myth like bonus scare over problem client lizard pioneer submit female collect
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Limit
==================
4712388

Listening on localhost:8545
```

## Configure Visual Studeo to deploy to localhost:8545
  * browse to your folder that contains the project/solution
  * open the .solproj file using a text editor
  * Update the BlockChainServiceUrl to appear as noted below
  ``` xml
      <BlockchainServiceUrl>http://localhost:8545/</BlockchainServiceUrl>
  ```
