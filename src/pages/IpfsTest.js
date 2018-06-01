
// Must import react in every module
import React from 'react'

// Import the pieces of Material-UI we need
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
//import {Input} from 'material-ui/core/Input'

// Import our custom components
import AppHeader from '../components/AppHeader'
import StakeCard from '../components/StakeCard'

import PropTypes from 'prop-types'

import {Stake_API} from '../services/delphi-backend/API'
import { drizzleConnect } from 'drizzle-react'


//imports the function that does the hashing
import {IPFS_function} from './../services/ipfs/index'

//Materials UI to make the button more attractive
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});
  

class IPFS extends React.Component{
  constructor(props, context){
    super(props);
    this.render = this.render.bind(this)
    this.IPFS_function = IPFS_function.bind(this)
  }

//this is currently an arbitrary value
state = {
  data: 'jigybujh',

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
