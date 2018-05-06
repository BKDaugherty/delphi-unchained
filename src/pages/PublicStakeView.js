// This Module defines the page that a user will
// see as a public viewer of a stake. Lets try our
// best to create reusable components to simplify 
// our work for the private stake view as well!

// Must import react in every module
import React from 'react'

// Keep our components Type-Safe!!!
import PropTypes from 'prop-types'

// Import the pieces of Material-UI we need
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Paper from 'material-ui/Paper'
// Import our custom components
import AppHeader from '../components/AppHeader'

// Import Application logic functions
import {GetStakeInfoAtAddress} from '../services/delphi-backend'

// Styles for this View
const styles = {
    card: {
        minWidth: 275,
        //maxWidth: 500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        fontSize: 17,
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 18,
        color: 'black',
    },
    pos: {
        marginBottom: 10,
    },
    root: {
        marginTop:60,
        flexGrow: 1,
        },
    flex: {
        flex: 1,
        },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        },
}

// Renders the claims given to the component
const ClaimsView = ({claims}) => {
    if(claims.length === 0){
        return ("Number of Current Claims: 0")
    } else {
        return claims.map(claim => <ClaimView key={claim.id} claim={claim}/>)
    }   
}

// Renders a single claim
const ClaimView = ({claim}) => (
    <Typography color="textSecondary">
        Claim ID:  {claim.id} <br />
        Claim Amount: {claim.amount}<br />
        Fee: {claim.fee}<br />
        Surplus Fee: {claim.surplus_fee}<br />
    </Typography>
)


// Renders the information on a stake
const SimpleCard = (props) => {
    const { classes, stake } = props
    const claims_list = stake.claims
    
    // Could be its own component!
    // const bull = <span className={classes.bullet}>•</span>

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
                {/* Renders the claims given, replaces the old formatClaimInfo()*/}
                <ClaimsView claims={claims_list}/>

            </CardContent>

            <CardActions>
              <Button size="small">Learn More About This Staker</Button>
            </CardActions>
        </Card>
    )
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
    stake: PropTypes.object.isRequired,
}



class PublicStakeView extends React.Component {
    constructor(props){
        super(props)    
        this.render = this.render.bind(this)
        this.getData = this.getData.bind(this)
    }

    state = {
        stakeInfo: {
            "staker": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
            "value": 100,
            "token": {
              "name": "DelphiCoin",
              "symbol": "DC",
              "address": "0x5ed8cee6b63b1c6afce3ad7c92f4fd7e1b8fad9f"
            },
            "minimum_fee": 5,
            "data": "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t",
            "claim_deadline": 1525417344,
            "arbiter": {
              "name": "",
              "description": "",
              "address": "0x498bad589c7acd871945ed6ca30b7bab0a977af7"
            },
            "whitelisted_claimants": [
            "0x5ed8cee6b63b1c6afce3ad7c92f4fd7e1b8fad9f",
            "0x498bad589c7acd871945ed6ca30b7bab0a977af7",
            "0x554f8e6938004575bd89cbef417aea5c18140d92"
          ],
          "claims": [
            {
              "id": 0,
              "amount": 25,
              "fee": 5,
              "surplus_fee": 0,
              "data": "QmT4AeWE9Q9EaoyLJiqaZuYQ8mJeq4ZBncjjFH9dQ9uDVA",
              "ruling": 0,
              "ruled": 0,
              "settlement_failed": 1
            },
            {
              "id": 1,
              "amount": 25,"fee": 5,
              "surplus_fee": 0,
              "data": "QmT4AeWE9Q9EaoyLJiqaZuYQ8mJeq4ZBncjjFH9dQ9uDVA",
              "ruling": 0,
              "ruled": 0,
              "settlement_failed": 1
            },
            {
              "id": 2,
              "amount": 25,
              "fee": 5,
              "surplus_fee": 0,
              "data": "QmT4AeWE9Q9EaoyLJiqaZuYQ8mJeq4ZBncjjFH9dQ9uDVA",
              "ruling": 0,
              "ruled": 0,
              "settlement_failed": 1
            },
          ],
          "settlements": [
            {
              "amount": 10,
              "staker_agrees": 0,
              "claimant_agrees": 0
            }
          ]
        }
    }

    getData(address){
        const stakeInfo = GetStakeInfoAtAddress(address)
        this.setState({stakeInfo, ...this.state})
    }

    render(){
        // Extract classes from props to pass to simple card
        // Extract match from props to get the value from the store. Disabling the linter for
        // this extraction until we use it in our dispatch
        // eslint-disable-next-line
        const {match, classes} = this.props
        return (
            <div>
                <AppHeader/>
                <Paper className={classes.root} elevation={4}>
                    <SimpleCard stake={this.state.stakeInfo} classes={classes}/>
                </Paper>
                {/* <Button raised onClick={() => this.getData(match.params.address)}>
                    Load Info
                </Button> */}
            </div>
        )
    }
}

export default withStyles(styles)(PublicStakeView)