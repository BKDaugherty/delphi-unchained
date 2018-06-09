/**
 * Defines the renderable portions of a claim
 */
import React from 'react'

import Grid from 'material-ui/Grid'
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card'
import {EthAddressDisplayCard} from '../EthAddressAvatar'

import DialogActionList from '../DialogActionList'
import {sameAddress} from '../../util'

import {drizzleConnect} from 'drizzle-react'
import Typography from 'material-ui/Typography'
// Import Claim Actions
import CLAIM_STATES from './CardActions/ClaimStates'
import ClaimantActions from './CardActions/ClaimantActions'
import ArbiterActions from './CardActions/ArbiterActions'

const ClaimStateFromStatus = (ruled, settlement_failed) => {
    if (ruled) {
        return CLAIM_STATES.RULED
    } else if (settlement_failed) {
        return CLAIM_STATES.ARBITRATION
    } else {
        return CLAIM_STATES.PRE_ARBITRATION
    }
}

const ClaimCard = ({ userEthAddress, claim }) => {
    let status, actions
    status = ClaimStateFromStatus(claim.ruled, claim.settlement_failed)
    claim.status = status

    const isSameAddress = sameAddress(userEthAddress)

    // Get the actions by address and state
    if (isSameAddress(claim.claimant)) {
        actions = ClaimantActions(status)(userEthAddress, claim.stake)
    } else if (isSameAddress(claim.arbiter)) {
        actions = ArbiterActions(status)(userEthAddress, claim.stake)
    }

    return <ClaimCardView claim={claim} actions={actions} />
}

const ClaimCardView = props => (
    <Card>
        <CardHeader
            title={`Claim ID ${props.claim.id} for ${props.claim.amount} : ${
                props.claim.status
            }`}
        />
        <CardContent>
            <Grid
                container
                flexDirection="column"
                alignItems="center"
                justify="space-around"
                spacing={16}
            >
                <Grid item>
                    <EthAddressDisplayCard
                        title={'Claimant'}
                        address={props.claim.claimant}
                    />
                </Grid>
                <Grid item>
                    <EthAddressDisplayCard
                        title={'Claim Data'}
                        address={props.claim.data}
                    />
                </Grid>
                <Grid item>
                    <EthAddressDisplayCard
                        title={'Arbiter'}
                        address={props.claim.arbiter}
                    />
                </Grid>
                <Grid item>
                    <EthAddressDisplayCard
                        title={'On Stake'}
                        address={props.claim.stake}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                flexDirection="column"
                alignItems="center"
                justify="space-around"
                spacing={16}
            >
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
            <DialogActionList actions={props.actions} />
        </CardActions>
    </Card>
)

const mapUserEthAddressToProps = (state, ownProps) => ({
    ...ownProps,
    userEthAddress: state.accounts[0]
})

export default drizzleConnect(ClaimCard, mapUserEthAddressToProps)
