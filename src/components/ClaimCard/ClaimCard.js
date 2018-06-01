/**
 * Defines the renderable portions of a claim 
 */
import React from 'react'

import Grid from 'material-ui/Grid'
import Card, { CardContent, CardActions, CardHeader } from 'material-ui/Card'
import { EthAvatarIcon, EthAddressDisplayCard } from '../EthAddressAvatar'

import DialogForm from '../DialogForm'
import DialogActionList from '../DialogActionList'
import {sameAddress} from '../../util'

import {withStyles, Typography} from 'material-ui'

// Import Claim Actions
import CLAIM_STATES from './CardActions/ClaimStates'
import ClaimantActions from './CardActions/Claimant/ClaimantActions'
import ArbiterActions from './CardActions/Arbiter/ArbiterActions'

const hardcoded_claim = {
    stake:'0x627306090abaB3A6e1400e9345bC60c78a8BEf57', 
    id:0, // index in array on contract
    claimant:'0xf17f52151EbEF6C7334FAD080c5704D77216b732',
    amount:122.4, //float
    arbiter:'0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
    fee:122.9, //float
    surplusFee:2.4, // float
    data:'I like cats',
    ruling:0, //0 1 2 or 3 
    ruled:false, 
    settlement_failed:true,
    // These two fields I'm not sure if we should include, but I will need to get them somehow
    // Could be pulled from stake? Not sure the best way to do this, preferably I'd like to just
    // get the two of these in '/Claimant/:address' and '/Arbiter/:address' but its up for debate
    staker:'0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    token:'0x0000000000000000000000000000000000000004'
}

const ClaimStateFromStatus = (ruled, settlement_failed) =>{
    if(ruled){
        return CLAIM_STATES.RULED
    } else if (settlement_failed){
        return CLAIM_STATES.ARBITRATION
    } else {
        return CLAIM_STATES.PRE_ARBITRATION
    }
}

const ClaimCard = ({userEthAddress, claim}) => {
    

    // Set for now
    claim = hardcoded_claim

    let status, actions;
    status = ClaimStateFromStatus(claim.ruled, claim.settlement_failed)
    claim.status = status

    const isSameAddress = sameAddress(userEthAddress)
    
    // Get the actions by address and state
    if(isSameAddress(claim.claimant)){
        actions = ClaimantActions(status)(userEthAddress, claim.stake)
    } else if (isSameAddress(claim.arbiter)){
        actions = ArbiterActions(status)(userEthAddress, claim.stake)
    }

    return <ClaimCardView claim={claim} actions={actions}/>
}

const ClaimCardView = (props) => (
    <Card>
        <CardHeader title={`Claim ID ${props.claim.id} for ${props.claim.amount} is in ${props.claim.status}`}/>
        <CardContent>
        <Grid container flexDirection='column' alignItems='center' justify='space-around' spacing={16}>
            <Grid item>
                <EthAddressDisplayCard title={'Claimant'} address={props.claim.claimant}/>
            </Grid>
            <Grid item>
                <EthAddressDisplayCard title={'Claim Data'} address={props.claim.data}/>
            </Grid>
            <Grid item>
                <EthAddressDisplayCard title={'Arbiter'} address={props.claim.arbiter}/>
            </Grid>
            <Grid item>
                <EthAddressDisplayCard title={'On Stake'} address={props.claim.stake}/>
            </Grid>
        </Grid>
        <Grid container flexDirection='column' alignItems='center' justify='space-around' spacing={16}>
            <Grid item>
                <Typography>Settlements</Typography>
            </Grid>
            <Grid item>
                <Typography>Claim Status</Typography>
                <Typography>{props.claim.state}</Typography>
            </Grid>
        </Grid>
        </CardContent>
        <CardActions>
            <DialogActionList actions={props.actions}/>
        </CardActions>
    </Card>
)

export default ClaimCard