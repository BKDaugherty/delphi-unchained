// This Module defines the page that a user will
// see as a public viewer of a stake. Lets try our
// best to create reusable components to simplify 
// our work for the private stake view as well!

// Must import react in every module
import React from 'react'

// Import the pieces of Material-UI we need
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

// Import our custom components
import AppHeader from '../components/AppHeader'
import StakeViewCard from '../components/StakeViewCard'
import DrizzledOwnerActions from '../components/StakeActionCard'

// Import Application logic functions
import {GetStakeInfoAtAddress} from '../services/delphi-backend'
import { drizzleConnect } from 'drizzle-react'

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
        display:'flex',
        flexDirection:'row',
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

class PublicStakeView extends React.Component {
    constructor(props){
        super(props)    
        this.render = this.render.bind(this)
        this.getData = this.getData.bind(this)
    }

    state = {
        stakeInfo: {
            "staker": "0x627306090abab3a6e1400e9345bc60c78a8bef57",
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
        const {match, classes, ethAddress} = this.props
        return (
            <div>
                <AppHeader ethAddress={ethAddress}/>
                <Paper className={classes.root} elevation={4}>
                    <StakeViewCard stake={this.state.stakeInfo} classes={classes} ethAddress={ethAddress}/>
                    {(ethAddress && (ethAddress.toLowerCase()  === this.state.stakeInfo.staker)) && <DrizzledOwnerActions/>}
                </Paper>
                {/* <Button raised onClick={() => this.getData(match.params.address)}>
                    Refresh Stake
                </Button> */}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    ethAddress:state.accounts[0],
    drizzleStatus: state.drizzleStatus,
})


export default drizzleConnect((withStyles(styles)(PublicStakeView)), mapStateToProps)