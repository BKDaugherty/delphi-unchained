import * as Web3 from 'web3'

let web3 = window.web3

if(typeof web3 === undefined){
    web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")
} else if(typeof web3 !== undefined){
    web3 = new Web3(web3.currentProvider || "ws://localhost8545")
}

export default web3
