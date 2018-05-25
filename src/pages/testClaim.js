import React from 'react'
import ClaimCard from '../components/ClaimCard/ClaimCard'
import AppHeader from '../components/AppHeader'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui';
const userEthAddress = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'

const TestPage = ({classes}) => {
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

export default withStyles(styles)(TestPage)