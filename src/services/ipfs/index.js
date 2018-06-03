//IPFS function
//Takes an object and returns a hash

import React from 'react'
/*
export const IPFS_function = async ({message:claimData}) => {

    //required to connect to the IPFS network
    var ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
    //https://ropsten.infura.io/DlraUbj4NfuZMGiKKNUc 

    //returns a hash of the given claimData    
    const ipfsHash = await ipfs.add(claimData)

    //currently logging value to verify manually
    console.log(ipfsHash)

    //retrieves the data and logs it to the console
    var returned = ipfs.cat(ipfsHash)
    console.log(returned)
    
    //retrieves the hash value without uploading it
    const cid2 = await ipfs.cid(claimData);
    console.log(cid2)

    //returns a promise
    return (ipfsHash)
    
}*/

export const IPFS_function = async ({message:claimData}) => {
    var ipfsAPI = require('ipfs-api')

    // connect to ipfs daemon API server
    //var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values

    // or connect with multiaddr
    var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})  //origionally '/ip4/127.0.0.1/tcp/5001'

    // or using options
    //var ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

    // or specifying a specific API path
    //ar ipfs = ipfsAPI({host: '1.1.1.1', port: '80', 'api-path': '/ipfs/api/v0'})

}