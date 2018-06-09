import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import styled from 'styled-components'
import {Link, NavLink} from 'react-router-dom'

import {withStyles} from 'material-ui/styles'
import {EthAvatarIcon} from './EthAddressAvatar'

const classes = {
    appHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    NavLinkContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}

const NavItem = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  padding: 1em;

  :hover {
    text-decoration: underline;
  }
`

const AppHeader = props => {
    const { classes, userEthAddress, className } = props
    return (
        <div>
            <AppBar className={className}>
                <Toolbar className={classes.appHeader}>
                    <NavItem to="/" className={classes.brandLink}>
                        <Typography variant="title" color="inherit">
              Delphi Unchained
                        </Typography>
                    </NavItem>
                    <div className={classes.NavLinkContainer}>
                        <NavItem to="/stake">
                            <Typography variant="subtitle" color="inherit">
                Stake Explorer
                            </Typography>
                        </NavItem>
                        {/* Conditionally render the icon if the user has a visible ethereum account */}
                        {userEthAddress && (
                            <Link
                                to="/dashboard"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <IconButton
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="Menu"
                                >
                                    <EthAvatarIcon address={userEthAddress} />
                                </IconButton>
                            </Link>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

// Functional programming is fun isn't it
export default withStyles(classes)(AppHeader)
