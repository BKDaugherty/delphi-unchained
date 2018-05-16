import React from 'react'
import Card, {CardContent, CardActions, CardHeader} from 'material-ui/Card'
import Typography from 'material-ui/Typography'

import PropTypes from 'prop-types'

import {publicActions, stakerActions, claimantActions} from './cardActions'
import {sameAddress} from '../../util'

import {EthAvatarIcon} from '../EthAddressAvatar'

import StakeCardContent from './StakeCardContent'
import StakeCardActionList from './StakeCardActionList'


const StakeCardHeader = (props) => (
    <CardHeader
        title={<Typography variant='headline' component='h2'>Stake at Address : {props.address}</Typography>}
        avatar={<EthAvatarIcon {...props}/>}>
    </CardHeader>
)

// Renders the information on a stake
const StakeCard = (props) => {
    const { classes, stake , address, userEthAddress, contract} = props
    const whitelisted_claimants = stake.whitelisted_claimants

    const addressIs = sameAddress(userEthAddress)

    // Conditionally set the actions based on the relationship
    // between the given address and the 
    let actions;

    if(addressIs(stake.staker)){
        actions = stakerActions(userEthAddress, contract)
    }
    else if (whitelisted_claimants.some(addressIs)){
        actions = claimantActions(userEthAddress, contract)
    } else {
        actions = publicActions
    }

    return (
        <Card>
            <StakeCardHeader address={address}/>
            <CardContent>
                <StakeCardContent classes={classes} stake={stake} />
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
    stake: PropTypes.object.isRequired,
}

export default StakeCard