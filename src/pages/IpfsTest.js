/**
 * Test Page used for creating IPFS funcitonality
 */

import React from 'react'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

//imports the function that does the hashing
import {IPFS_function} from './../services/ipfs/index'

//Renders only a button creating an IPFS hash in the developer console
class IPFS extends React.Component{
  
//this is currently an arbitrary value
state = {
  data: 'this should change sometimes',
}
  
//render takes advantage of the IPFS(message:data) function
  render(){
    return ( 
      <div>
        <Grid item>
          {<Button variant='raised' color='secondary' onClick={
            () => IPFS_function({message:this.state.data})}>
             Hash It!
          </Button>}
        </Grid>
      </div> )
  }  
}


export default IPFS
