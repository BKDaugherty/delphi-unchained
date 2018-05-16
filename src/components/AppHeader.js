
import React from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import {Link} from 'react-router-dom'

import {withStyles} from 'material-ui/styles'
import { EthAvatarIcon } from './EthAddressAvatar';

const classes = {
    appHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    }
}

const AppHeader = (props) => {
    const { classes, userEthAddress, className } = props;
    return ( 
    <div>
        <AppBar className={className}>
        <Toolbar className={classes.appHeader}>
            <Link to='/' style={{textDecoration:'none', color:"inherit"}}>
            <Typography variant="title" color="inherit">
                Delphi Unchained
            </Typography>
            </Link>
            {/* Conditionally render the icon if the user has a visible ethereum account */ }
            {userEthAddress && 
            <Link to='/dashboard' style={{textDecoration:'none', color:'inherit'}}>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <EthAvatarIcon address={userEthAddress}/>
                </IconButton>
            </Link>
            }
        </Toolbar>
        </AppBar>
    </div>)
}

// Functional programming is fun isn't it
export default (withStyles(classes)(AppHeader))