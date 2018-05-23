/* Renders a presenational component for a stake */

import React from 'react'
import Grid from 'material-ui/Grid'
import Card, {CardHeader, CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import {EthAddressDisplayCard, EthAvatarIcon} from '../EthAddressAvatar'
import ClaimView from '../ClaimView'

const StakeCardContent = (props) => {
    const {stake} = props
    const claims_list = stake.claims
    const whitelisted_claimants = stake.whitelisted_claimants
    const stake_deadline = new Date(parseInt(1000 * stake.claim_deadline, 10))
    return (
    <div>
        <Grid direction='row' spacing={24} container> 
            <Grid item>
                <EthAddressDisplayCard title={"Staker"} address={stake.staker}/>
            </Grid>
            <Grid item>
                <EthAddressDisplayCard title={"Amount"} subheader={`${stake.value} ${stake.token.symbol} ${stake.token.name}`} address={stake.token.address}/>
            </Grid>
            <Grid item>
                <Card>
                    <CardHeader title={'Claim Deadline'}/>
                    <CardContent>
                        {/* Unix is given in seconds, JS accepts ms */}
                        {stake_deadline.toISOString()}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
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
                {whitelisted_claimants.length > 0 ? whitelisted_claimants.map(addr => <Grid item key={`whitelisted-claimant-${addr}`}><EthAvatarIcon address={addr}/></Grid>) : null}
            </Grid>
        </Grid>
    </div>

)}

export default StakeCardContent