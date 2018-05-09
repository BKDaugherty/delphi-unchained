import React from 'react'
import Card, {CardContent, CardActions} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'

import PropTypes from 'prop-types'
import DialogForm from '../DialogForm'

import ClaimView from '../ClaimView'

import {publicActions, stakerActions, claimantActions, arbiterActions} from './cardActions'

import {sameAddress} from '../../util'

const StakeCardContent = (props) => {
    const { classes, stake , address} = props
    const claims_list = stake.claims
    const whitelisted_claimants = stake.whitelisted_claimants
    
    return (
    <div>
    <Typography variant="headline" component="h2"  color="textSecondary">
                    Stake Address: {address}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Address: {address} <br/>
                    Staker: {stake.staker} <br/>
                    Stake Amount: {stake.value} {stake.token.symbol} ({stake.token.name} @ {stake.token.address}) <br />
                    Claim Deadline: {stake.claim_deadline} <br />
                    Arbiter Address: {stake.arbiter.address} <br/>
                </Typography>
                <Grid direction='row' container spacing={24}>
                    <Grid sm={6} md={6} item>
                        <Typography variant='headline' component='h3' color="textSecondary">
                            Claims
                        </Typography>
                        {claims_list.length > 0 ? claims_list.map(claim => <Grid item key={`claim-key-${claim.id}`}><ClaimView claim={claim}/></Grid> ) : null}
                    </Grid>
                    <Grid sm={6} md={6} item>
                        <Typography variant='headline' component='h3' color="textSecondary">
                            Whitelisted Claimants
                        </Typography>
                        {whitelisted_claimants.length > 0 ? whitelisted_claimants.map(addr => <Grid item key={`whitelisted-claimant-${addr}`}><Typography >{addr}</Typography></Grid>) : null}
                    </Grid>
                </Grid>
    </div>

)}


const StakeCardAction = (props) => {
    const {dialog, label, onSubmit} = props
    return ( 
            dialog ? (<DialogForm {...props}/>) 
                : <Button onClick={onSubmit}><Typography>{label}</Typography></Button>
    )
}

const StakeCardActionList = ({actions}) => (actions.map((prop,key) => (<StakeCardAction key={key} {...prop}/>)))


// Renders the information on a stake
const StakeCard = (props) => {
    const { classes, stake , address, ethAddress, contract} = props
    const whitelisted_claimants = stake.whitelisted_claimants

    const addressIs = sameAddress(ethAddress)

    // Conditionally set the actions based on the relationship
    // between the given address and the 
    let actions;

    if(addressIs(stake.staker)){
        actions = stakerActions({ethAddress, contract})
    } else if(addressIs(stake.arbiter.address)){
        actions = arbiterActions
    } else if (whitelisted_claimants.some(addressIs)){
        actions = claimantActions
    } else {
        actions = publicActions
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <StakeCardContent classes={classes} stake={stake} address={address}/>
            </CardContent>

            {/* Conditionally render actions based on relationship
                with stake*/}
            <CardActions>
                {contract? <StakeCardActionList actions={actions}/> : null}
            </CardActions>
        </Card>
    )
}

StakeCard.propTypes = {
    classes: PropTypes.object.isRequired,
    stake: PropTypes.object.isRequired,
}

export default StakeCard