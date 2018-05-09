// This Module defines the page that a user will
// see as a public viewer of a stake. Lets try our
// best to create reusable components to simplify 
// our work for the private stake view as well!

// Must import react in every module
import React from 'react'

// Import the pieces of Material-UI we need
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

// Import our custom components
import AppHeader from '../components/AppHeader'
import StakeCard from '../components/StakeCard'
import DrizzledOwnerActions from '../components/StakeActionCard'

import PropTypes from 'prop-types'

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
    toolbar:{
        marginTop:65,
    },
    pos: {
        marginBottom: 10,
    },
    root: {
        display:'flex',
        flexDirection:'row',
        marginTop:100,
        paddingTop:50,
        flexGrow: 1,
        },
    flex: {
        flex: 1,
        },
}

class PublicStakeView extends React.Component {
    constructor(props, context){
        super(props)    
        this.render = this.render.bind(this)
        this.getData = this.getData.bind(this)
        this.contracts = context.drizzle.contracts
    }



    state = {
        stakeInfo:null
    }

    componentDidMount(){
        // Get data for given stake
        this.getData(this.props.match.params.address)
    }

    async getData(address){
        const stakeInfo = await GetStakeInfoAtAddress(address)
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
                <div className={classes.toolbar}/>
                <h2>{match.params.address}</h2>
                {/* Conditionally render the stake*/}
                {this.state.stakeInfo && <StakeCard className={classes.root} stake={this.state.stakeInfo} classes={classes} address={match.params.address} contract={this.contracts.DelphiStake} ethAddress={ethAddress}/>}
                {<Button onClick={() => this.getData(match.params.address)}>
                    Refresh Stake
                </Button>}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    ethAddress:state.accounts[0],
    drizzleStatus: state.drizzleStatus,
})

PublicStakeView.contextTypes = {
    drizzle: PropTypes.object
}



export default drizzleConnect((withStyles(styles)(PublicStakeView)), mapStateToProps)