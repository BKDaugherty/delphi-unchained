
import React from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from 'material-ui/IconButton';

import {withStyles} from 'material-ui/styles'

const classes = {
    menuButton:{
        marginLeft: -12,
        marginRight: 20,
    },
    root:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    }

}

const AppHeader = (props) => {
    const { classes, ethAddress } = props;
    return ( 
    <div className={classes.root}>
        <AppBar>
        <Toolbar>
            <Typography variant="title" color="inherit">
                Delphi Stake Explorer
            </Typography>

            {/* Conditionally render the icon if the user has a visible ethereum account */ }
            {ethAddress && 
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <HomeIcon />
            </IconButton>
            }
        </Toolbar>
        </AppBar>
    </div>)
}

// Functional programming is fun isn't it
export default (withStyles(classes)(AppHeader))