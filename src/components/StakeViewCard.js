import React from 'react'
import Card, {CardContent, CardActions} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'

import ClaimView from './ClaimView'

// Renders the information on a stake
const StakeViewCard = (props) => {
    const { classes, stake } = props
    const claims_list = stake.claims

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary">
                    Information for stake address: {stake.token.address}
                </Typography>
                <Typography variant="headline" component="h2">
                </Typography>
              
                <Typography className={classes.pos} color="textSecondary">
                    Stake Amount: {stake.value} <br />
                    Claim Deadline: {stake.claim_deadline} <br />
                    Number of Current Claims: {claims_list.length}
                </Typography>
                {/* Conditionally render the claims given, replaces the old formatClaimInfo()*/}
                {claims_list.length > 0 ? claims_list.map(claim => <ClaimView key={claim.id} claim={claim}/>) : null}
                
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