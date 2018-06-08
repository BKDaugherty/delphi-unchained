/* Renders an informational and actionable card for Stakes */

import React from 'react'
import Card, {CardHeader,CardActions,CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'

import PropTypes from 'prop-types'

import {EthAvatarIcon} from '../EthAddressAvatar'

import StakeCardContent from './StakeCardContent'
import DialogActionList from '../DialogActionList'

import {sameAddress} from '../../util'
import StakerActions from './CardActions/StakerActions'
import WhitelisteeActions from './CardActions/WhitelisteeActions'
import PublicActions from './CardActions/PublicActions'

import {drizzleConnect} from 'drizzle-react'

const StakeCardHeader = (props) => (
    <CardHeader
        title={<Typography variant='headline' component='h2'>Stake at Address : {props.address}</Typography>}
        avatar={<EthAvatarIcon {...props}/>}>
    </CardHeader>
)

// Renders the information on a stake
const StakeCard = (props) => {
    let { classes, stake, userEthAddress} = props
    const address = stake.address
    const whitelist = stake.whitelist
    const token_address = stake.token.address

    // Curry those functions
    const addressIs = sameAddress(userEthAddress)

    // Conditionally set the actions based on the relationship
    // between the given address and the stake. Would like this 
    // to also be generalized!
    let actions;

    if(addressIs(stake.staker)){
        actions = StakerActions(userEthAddress, address, token_address)
    }
    else if (whitelist.some( elem => addressIs(elem.claimant) )){
        actions = WhitelisteeActions(userEthAddress, address, token_address)
    } else {
        actions = PublicActions
    }

    return (
        <Card>
            <StakeCardHeader address={address}/>
            <CardContent>
                <StakeCardContent classes={classes} stake={stake} />
            </CardContent>
            <CardActions>
                <DialogActionList actions={actions}/>
            </CardActions>
        </Card>
    )
}

StakeCard.propTypes = {
    stake: PropTypes.object.isRequired,
}

const mapEthAddressToProps = (state, ownProps) => ({
    ...ownProps,
    userEthAddress:state.accounts[0]
})

export default drizzleConnect(StakeCard, mapEthAddressToProps)