/* Renders an informational and actionable card for Stakes */

import React from 'react'
import Card, {CardContent, CardActions, CardHeader} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'

import PropTypes from 'prop-types'

import {EthAvatarIcon} from '../EthAddressAvatar'

import {publicActions, stakerActions, claimantActions} from './cardActions'
import {sameAddress} from '../../util'

import StakeCardContent from './StakeCardContent'
import DialogForm from '../DialogForm'

const StakeCardHeader = (props) => (
    <CardHeader
        title={<Typography variant='headline' component='h2'>Stake at Address : {props.address}</Typography>}
        avatar={<EthAvatarIcon {...props}/>}>
    </CardHeader>
)

// Renders the information on a stake
const StakeCard = (props) => {
    let { classes, stake , address, userEthAddress} = props
    const whitelisted_claimants = stake.whitelisted_claimants
    const token_address = stake.token.address

    // Curry those functions
    const addressIs = sameAddress(userEthAddress)

    // Conditionally set the actions based on the relationship
    // between the given address and the stake. Would like this 
    // to also be generalized!
    let actions;

    if(addressIs(stake.staker)){
        actions = stakerActions(userEthAddress, address, token_address)
    }
    else if (whitelisted_claimants.some(addressIs)){
        actions = claimantActions(userEthAddress)
    } else {
        actions = publicActions
    }

    return (
        <Card>
            <StakeCardHeader address={address}/>
            <CardContent>
                <StakeCardContent classes={classes} stake={stake} />
            </CardContent>
            <CardActions>
                <Grid container spacing={16}>
                    {actions ? 
                        actions.map(
                            (action, key) => (
                                <Grid item key={key}> 
                                    { action.dialogProps ? 
                                        <DialogForm {...action}/> 
                                        : <Button {...action}>{action.label}</Button> 
                                    } 
                                </Grid> )
                            ) 
                    : null }
                </Grid>
            </CardActions>
        </Card>
    )
}

StakeCard.propTypes = {
    stake: PropTypes.object.isRequired,
}

export default StakeCard