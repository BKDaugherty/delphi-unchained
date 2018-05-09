import React from 'react'
import Card, {CardActions} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'

import {drizzleConnect} from 'drizzle-react'

class StakeActionCard extends React.Component {
    constructor(props, context){    
        super(props)
        this.contracts = context.drizzle.contracts

        // Bind this
        this.whitelistClaimant = this.whitelistClaimant.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.increaseStake = this.increaseStake.bind(this)
        this.extendStakeReleaseTime = this.extendStakeReleaseTime.bind(this)
        this.withdrawStake = this.withdrawStake.bind(this)
    }

    state = {
        claimantAddress:"0xf17f52151ebef6c7334fad080c5704d77216b732",
        stakeReleaseTime:0,
        stakeIncreaseValue:0,
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    whitelistClaimant(){
        this.contracts.DelphiStake.methods.whitelistClaimant(this.props.ethAddress,this.state.claimantAddress).send({from:this.props.ethAddress}).then(console.log)
        
    }

    increaseStake(){
        this.contracts.DelphiStake.methods.increaseStake(this.state.stakeIncreaseValue).send({from:this.props.ethAddress}).then(console.log)
    }

    extendStakeReleaseTime(){
        this.contracts.DelphiStake.methods.extendStakeReleaseTime(this.state.stakeReleaseTime).send({from:this.props.ethAddress}).then(console.log)
    }

    withdrawStake(){
        this.contracts.DelphiStake.methods.withdrawStake().send({from:this.props.ethAddress}).then(console.log)
    }

    render() {
    return (
    <Card style={{  padding:15}}>
        <Typography variant="title" color="inherit">
            You own this stake, so you can do stuff with it.
        </Typography>
        <CardActions>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', alignContent:'center',}}>
                <TextField
                    id="claimantAddress"
                    label="Claimant Address"
                    value={this.state.claimantAddress}
                    onChange={this.handleChange('stakeAddress')}
                    margin="normal"
                />  
                <Button onClick={() => {this.whitelistClaimant()}}>
                    Whitelist this claimant's address
                </Button>

                <TextField
                    id="stakeIncreaseValue"
                    label="Increase your stake"
                    value={this.state.stakeIncreaseValue}
                    onChange={this.handleChange('stakeIncreaseValue')}
                    margin="normal"
                />
                <Button onClick={this.increaseStake}>
                    Increase the Stake
                </Button> 


                <TextField
                    id="stakeReleaseTime"
                    label="Extend Release Time"
                    value={this.state.stakeReleaseTime}
                    onChange={this.handleChange('stakeReleaseTime')}
                    margin="normal"
                />  
                <Button onClick={this.extendStakeReleaseTime}>
                    Extend the stake
                </Button>

                <Button onClick={this.withdrawStake}>
                    Withdraw your stake
                </Button>
            </div>
    </CardActions>
    </Card>)
    }
}

const mapStateToProps = state => {
    return {
        ethAddress:state.accounts[0],
    }
}


const DrizzledStakeActionCard = drizzleConnect(StakeActionCard, mapStateToProps)
export default DrizzledStakeActionCard


  
