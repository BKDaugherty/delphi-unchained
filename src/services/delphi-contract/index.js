/* 
    Exports the Contracts for use as a service in other modules in order
    to interact with Ethereum 
*/

import DelphiStakeJSON from '../../drizzle/artifacts/DelphiStake.json'
import DelphiStakeFactoryJSON from '../../drizzle/artifacts/DelphiStakeFactory.json'
import EIP20JSON from '../../drizzle/artifacts/EIP20.json'
import Web3 from 'web3'
import store from '../../store'
import {Update_Network} from '../../actions/web3'

const TruffleContract = require("truffle-contract");

let web3 = window.web3
export let web3js;

// Poll for Web3
const PollForWeb3Version = (web3, interval) => {
    setInterval(async () => {
        // Gets Network Type as one of 'main', 'ropsten', 'rinkeby' or 'private'
        const NetworkType = await web3.eth.net.getNetworkType()
        const Update_Action = Update_Network(NetworkType)
        // Dispatch Resulting network to redux store
        store.dispatch(Update_Action)
    }, interval)
}


// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
    PollForWeb3Version(web3js, 3000)
} else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


// Create Truffle contract abstractions
let DF = TruffleContract({
    abi:DelphiStakeFactoryJSON.abi
})

let DS = TruffleContract({
    abi:DelphiStakeJSON.abi,
})

let EIP = TruffleContract({
    abi:EIP20JSON.abi
})

const contracts = [DF, DS, EIP]
contracts.forEach(contract => contract.setProvider(web3js.currentProvider))

export const DelphiStakeFactory = DF
export const DelphiStake = DS
export const EIP20 = EIP


