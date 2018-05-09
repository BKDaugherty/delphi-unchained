import React from 'react'
import Card, {CardContent, CardActions} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid'
import ClaimView from './ClaimView'

// Renders the information on a stake
const StakeViewCard = (props) => {
    const { classes, stake } = props
    const claims_list = stake.claims
    const whitelisted_claimants = stake.whitelisted_claimants

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="headline" component="h2"  color="textSecondary">
                    Stake Address: {stake.token.address}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Stake Amount: {stake.value} <br />
                    Claim Deadline: {stake.claim_deadline} <br />
                </Typography>
                <Grid direction='row' container spacing={24}>
                    <Grid md={6} item spacing={16}>
                        <Typography variant='headline' component='h3' color="textSecondary">
                            Claims
                        </Typography>
                        {claims_list.length > 0 ? claims_list.map(claim => <Grid item><ClaimView key={claim.id} claim={claim}/></Grid> ) : null}
                    </Grid>
                    <Grid md={6} item spacing={16}>
                        <Typography variant='headline' component='h3' color="textSecondary">
                            Whitelisted Claimants
                        </Typography>
                        {whitelisted_claimants.length > 0 ? whitelisted_claimants.map(addr => <Grid item><Typography key={addr}>{addr}</Typography></Grid>) : null}
                    </Grid>
                </Grid>

            </CardContent>

            <CardActions>
              <Button size="small">Learn More About This Staker</Button>
              {/* {ethAddress === stake.staker && <Button size="small">Whitelist a claimant</Button>}  */}
            </CardActions>
        </Card>
    )
}




StakeViewCard.propTypes = {
    classes: PropTypes.object.isRequired,
    stake: PropTypes.object.isRequired,
}

export default StakeViewCard