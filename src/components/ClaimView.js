import React from 'react'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'


// Renders a single claim
const ClaimView = ({claim}) => (
    <Typography color="textSecondary">
        Claim ID:  {claim.id} <br />
        Claim Amount: {claim.amount}<br />
        Fee: {claim.fee}<br />
        Surplus Fee: {claim.surplus_fee}<br />
    </Typography>
)

ClaimView.propTypes = {
    claim: PropTypes.object.isRequired,
}

export default ClaimView
