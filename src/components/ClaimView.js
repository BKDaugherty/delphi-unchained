import React from 'react'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'

import Card, {CardContent} from 'material-ui/Card'

import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  } from 'material-ui/ExpansionPanel';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const RulingStatus = ["Justified", "Not Justified", "Collusive", "Ruling Failure"]


// Renders a single claim
const ClaimView = ({claim}) => (
    <Card>
        <CardContent>
            <Typography color="textSecondary">
                Claim ID:  {claim.id} <br />
                Claim Amount: {claim.amount}<br />
                Fee: {claim.fee}<br />
                Data: {claim.data}<br />

                {/* Not what I'd like to do here... */}
                {claim.ruled ? `Ruling Status: ${RulingStatus[claim.ruling]}` : null} 
                {claim.ruled ? <br/> : null}                    
                {claim.settlementFailed? `The settlement failed.` : null}
            </Typography>
        </CardContent>
    </Card>
)

// Renders the Claim View inside of an expansion panel!
const ClaimExpansion = ({claim}) => (
    <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            Claim ID: {claim.id}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <ClaimView claim={claim}/>
        </ExpansionPanelDetails>
    </ExpansionPanel>
)

ClaimView.propTypes = {
    claim: PropTypes.object.isRequired,
}

export default ClaimExpansion
