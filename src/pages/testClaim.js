import React from 'react'
import ClaimCard from '../components/ClaimCard/ClaimCard'
import AppHeader from '../components/AppHeader'
import Paper from 'material-ui/Paper'
import {drizzleConnect} from 'drizzle-react'
import { withStyles } from 'material-ui';

const TestPage = ({classes, userEthAddress}) => {
    return (
        <div>
            <AppHeader userEthAddress={userEthAddress}/>
            <div className={classes.toolbar}/>
            <Paper justify='center' className={classes.backdrop}>
                <ClaimCard userEthAddress={userEthAddress}/>
            </Paper>
        </div>
    )
}

const styles = {
    toolbar:{
        marginTop:85
    },
    backdrop:{
        width:'85%',
        alignSelf:'center',
        display:'flex',
        margin:'auto',
        justifyContent:'center',
    }
}

const StyledTestPage = withStyles(styles)(TestPage)

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    userEthAddress:state.accounts[0],
    // drizzleStatus: state.drizzleStatus,
})

export default drizzleConnect(StyledTestPage, mapStateToProps)
