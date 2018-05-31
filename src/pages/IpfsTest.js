// Must import react in every module
import React from 'react'

// Import the pieces of Material-UI we need
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

// Import our custom components
import AppHeader from '../components/AppHeader'
import StakeCard from '../components/StakeCard'

import PropTypes from 'prop-types'

import {Stake_API} from '../services/delphi-backend/API'
import { drizzleConnect } from 'drizzle-react'

//const myPage = (props) => <div>Hey IPFS</div>
const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
async function test() {
    const data = JSON.stringify({
      name: "JSON Statehem",
      link0: "stackexchange.com",
      link1: "github.com",
      link2: "myfacebook.com"
    })
  
    const ipfsHash = await ipfs.add(data)
    //const instance = await MyContract.deployed()
  
    //await instance.setHash.sendTransaction(ipfsHash)
  
    //let returnedHash = await instance.ipfsHash.call()
  
    console.log(ipfsHash)
    //console.log(returnedHash)
    
    //console.log(JSON.parse(await ipfs.cat(returnedHash)))
  
  }
  


class IPFS extends React.Component{
  constructor(props, context){
    super(props)
    this.render = this.render.bind(this)
    //this.getData = this.getData.bind(this)
    //this.contracts = context.drizzle.contracts
  }

  render(){
    test()

    return (<div> ipfs test </div>)
  }  

  
}    

export default IPFS
