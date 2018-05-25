/**
 * Defines the renderable portions of a claim 
 */
import React from 'react'

import Grid from 'material-ui/Grid'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { EthAvatarIcon, EthAddressDisplayCard } from '../EthAddressAvatar'

import DialogForm from '../DialogForm'
import DialogActionList from '../DialogActionList'
import {sameAddress} from '../../util'

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
    settlement_failed:false,
    // These two fields I'm not sure if we should include, but I will need to get them somehow
    // Could be pulled from stake? Not sure the best way to do this, preferably I'd like to just
    // get the two of these in '/Claimant/:address' and '/Arbiter/:address' but its up for debate
    staker:'0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    token:'0x0000000000000000000000000000000000000004'
}

const ClaimCard = ({userEthAddress, claim}) => {
    

    // Set for now
    claim = hardcoded_claim
    const isSameAddress = sameAddress(userEthAddress)
    let state, actions;

    if(isSameAddress(claim.claimant)){
        actions = ClaimantActions(CLAIM_STATES.ARBITRATION)(userEthAddress, claim.stake)
        console.log(actions)
    } else if (isSameAddress(claim.arbiter)){
        actions = ArbiterActions(CLAIM_STATES.ARBITRATION)(userEthAddress, claim.stake)
    }

    return <ClaimCardView claim={claim} actions={actions}/>
}

const ClaimCardView = (props) => (
    <Card alignSelf='center'>
        <Grid container flexDirection='column' alignItems='center' justifyContent='center' spacing={16}>
            <Grid item>
                <EthAddressDisplayCard title={'Claimant'} address={props.claim.claimant}/>
            </Grid>
            <Grid item>
                <EthAddressDisplayCard title={'Data Hash'} address={props.claim.data}/>
            </Grid>
            <Grid item>
                <EthAddressDisplayCard title={'Arbiter'} address={props.claim.arbiter}/>
            </Grid>
        </Grid>
        <CardActions>
            <DialogActionList actions={props.actions}/>
        </CardActions>
    </Card>
)


export default ClaimCard