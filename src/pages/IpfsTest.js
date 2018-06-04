// Must import react in every module
import React from 'react'

//const myPage = (props) => <div>Hey IPFS</div>

class IPFS extends React.Component{
  constructor(props, context){
    super(props);
    this.render = this.render.bind(this)
    this.HashData = this.HashData.bind(this)
  }

  state ={
    ipfsHash:''
  }

  async HashData(){
    var ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");

      const data = JSON.stringify({
        name: "JSON Statehem",
        link0: "stackexchange.com",
        link1: "github.com",
        link2: "myfacebook.com"
      })
    
      const ipfsHash = await ipfs.add(data)
    
      this.setState({ipfsHash})

      console.log(ipfsHash)
      console.log(typeof(ipfsHash))

      return (ipfsHash)
    
  }


  render(){
    var string = this.HashData()
    string = toString(string)
    console.log(typeof(string) + " should be string")
    return ( 
      <div> ipfs pls work {this.state.ipfsHash}</div> ) //{this.HashData()}
    //<div> ipfs test: {HashData()} </div>)
  }  

  
}    

export default IPFS
