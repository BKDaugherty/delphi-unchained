//IPFS function
//Takes an object and returns a hash

import React from 'react'

export const IPFS_function = async ({message:claimData}) => {

    //required to connect to the IPFS network
    var ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");

    //returns a hash of the given claimData    
    const ipfsHash = await ipfs.add(claimData)

    //currently logging value to verify manually
    console.log(ipfsHash)

    //returns a promise
    return (ipfsHash)
}