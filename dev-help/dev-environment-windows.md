# Smart Contract Development on Windows with Visual Studio

## Purpose
The purpose of this guide is to help new-to-Pirl developers set up a development environment using a Windows machine, running Visual Studio.  Let's try to keep this lean-and-mean.  For this project, the developers are mostly using:
  * Windows 10 
  * Visual Studio for front-end development (probably a MVC app)
  * Visual Studio Code to edit Solidity files.
  * Truffle to build/deploye/test.

## 1. Using Visual Studio
Even though there's a solidity extention available for VS 2015, we are not going to use it.  Mostly because Truffle seems to be a bit more robust.  In short, we are going to use Visual Studio for front-end development only.

## 2. Using Visual Studio Code
We will use Visual Studio Code for Solidity development.  Plus, Visual Studio Codes built-in-terminals make editing and testing contracts a snap.  Follow these steps to set up Visual Studio Code:

### 2a.  Set up Visual Studio Code
- Download Visual Studio Code.
- Hit CONTROL + SHIFT + P and search the menu for extensions.
- Search for "Solidity" and pick the most popular plug in.  This is what will help with highlighting/linting.
- At this point, click FILE | OPEN FOLDER and browse to the root folder in our Pirl MicroCredential project.

### 2b. Install ganache and truffle.
There are packages that will create a test blockchain as well as a toolkit for managing the deployment and testing.
- You might need Node.js installed.  See http://blog.teamtreehouse.com/install-node-js-npm-windows
- Click VIEW | INTEGRATED TERMINAL and run:

```
> npm install -g npm
> npm install -g windows-build-tools
> npm install -g ganache-cli
> npm install -g truffle
```


## 3. Running Code Locally

### 3a.  Start ganache-cli
  - Click VIEW | INTEGRATED TERMINAL 
  - Click the icon near the top right to add two terminal windows (side by side)
  - On the RIGHT terminal, enter the following command:
    - > ganache-cli
    - For a more advance console, try the console below which will provide plenty of ether/Pirl and use the same accounts:
    - > ganache-cli -e 100000 -l 4712388 -d --noVMErrorsOnRPCResponse
  - You should see a bunch of status messages appear and the port it's listening on

### 3b. Use Truffle to Deploy the Contract
  - Using the left-side terminal you started in step 3a, do the following:
  - > cd truffle
  - > truffle compile
  - You should see some status messages about it creating artifacts.
  - > truffle migrate --reset
  - You should see additional status messages, and you should see activity on the ganache-cli terminal.

## Other Considerations
At this point, you have a functioning RPC node with a deployed contract.  The contract is deployed using account[9].  If you wanted to cheat, you can just scroll up in the list of accounts in ganache-cli window and get that address.  Here's where it might be nice to use the advanced ganache-cli command (so that the address remains constant).  It's quite possible that the front-end code will need a web.config parameter to hold the address in a static setting.  