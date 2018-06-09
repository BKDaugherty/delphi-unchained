/**
 * Defines the visualization for a claim on our platform
 */

import React from 'react'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'

import Card, {CardHeader, CardContent} from 'material-ui/Card'


import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  } from 'material-ui/ExpansionPanel';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { EthAvatarIcon, EthAddressDisplayCard } from './EthAddressAvatar';
import Grid from 'material-ui/Grid'

const RulingStatus = ["Justified", "Not Justified", "Collusive", "Ruling Failure"]

const ClaimContent = ({claim}) => (
    <Grid container spacing={16}>
        <Grid item>
            <EthAddressDisplayCard title={'Claimant'} address={claim.claimant}/>
        </Grid>
        <Grid item>
            <EthAddressDisplayCard title={'Data Hash'} address={claim.data}/>
        </Grid>
        <Grid item>
            <EthAddressDisplayCard title={'Arbiter'} address={claim.arbiter}/>
        </Grid>
        <Grid item>
            <Card>
                <CardHeader title={'Amount'} />
                <CardContent>
                    <Typography>{claim.amount}</Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item>
            <Card>
                <CardHeader title={'Fee'}/>
                <CardContent>
                    {claim.fee}
                </CardContent>
            </Card>
        </Grid>
        <Grid item>
            <Typography color="textSecondary">
                {/* Not what I'd like to do here... */}
                {claim.ruled ? `Ruling Status: ${RulingStatus[claim.ruling]}` : null} 
                {claim.ruled ? <br/> : null}                    
                {claim.settlementFailed? `The settlement failed.` : null}
            </Typography>

        </Grid>
    </Grid>
)

// Renders a single claim
const ClaimCard = ({claim}) => (
    <Card>
        <CardContent>
            <ClaimContent claim={claim}/>
        </CardContent>
    </Card>
)

// Renders the Claim View inside of an expansion panel!
const ClaimExpansion = ({claim}) => {
    // All Claims should have an address!
    return (
    <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Grid container alignContent='center' alignItems='center' justify='flex-start' spacing={16}>
                <Grid item>
                    Claim {claim.id} by 
                </Grid>
                <Grid item>
                    <EthAvatarIcon address={claim.claimant}/>
                </Grid>
            </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <ClaimCard claim={claim}/>
        </ExpansionPanelDetails>
    </ExpansionPanel>
)}

// const ClaimExpansionSansCard = ({claim}) => (
//     <ExpansionPanel>
//     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//         Claim ID: {claim.id}
//     </ExpansionPanelSummary>
//     <ExpansionPanelDetails>
//         <ClaimContent claim={claim}/>
//     </ExpansionPanelDetails>
//     </ExpansionPanel>
// )

ClaimContent.propTypes = {
    claim: PropTypes.object.isRequired,
}

export default ClaimExpansion
