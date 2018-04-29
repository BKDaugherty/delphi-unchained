import * as Web3 from 'web3'
// Requires Version 1.0
// Get a reference to the global web3 object
let web3 = window.web3

// Metamask setup
if(typeof web3 === undefined)
    web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")
else if(typeof web3 !== undefined){
    web3 = new Web3(web3.currentProvider || "ws://localhost:8545")
}

export default web3