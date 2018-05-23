import React from 'react'

import { Switch, Route,  } from "react-router-dom";
import dashboardRoutes from './routes'
import AppHeader from '../../components/AppHeader'
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import {drizzleConnect} from 'drizzle-react'
import {
    withStyles,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
  } from "material-ui";

const SwitchRoutes = (props) => (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      const Component = prop.component

      return (
      <Route exact={prop.exact} 
        path={prop.path} 
        component={(properties) => <Component {...properties} userEthAddress={props.userEthAddress} />}
        key={key}/>
      )
    })}  
  </Switch>
)

// Arbitrary...
const drawerWidth = 240

const styles = theme => ({
    root: {
      flexGrow: 1,
      zIndex: 1,
      position: 'relative',
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
  });


const SidebarLink = (props) => (
    <NavLink
        to={props.path}
        activeClassName="active"
        key={props.key}
        style={{textDecoration:'none'}}
     >
    <ListItem button>
        <ListItemIcon>
            <props.icon />
        </ListItemIcon>
        <ListItemText disableTypography>
            <Typography>
                {props.name} 
            </Typography>
        </ListItemText>
    </ListItem>
    </NavLink>)

const ClippedDrawer = (props) => {
    const { classes, userEthAddress } = props;
  
    return (
      <div className={classes.root}>
        <AppHeader userEthAddress={userEthAddress} className={classes.appBar}/>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
        {/* Used for padding whitespace*/}
          <div className={classes.toolbar} />
          <List>
              {/* Drawer Buttons */}
              {dashboardRoutes.map((route) => <SidebarLink path={route.path} name={route.name} icon={route.icon}/>)}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* Adds the switch router*/}
          <SwitchRoutes userEthAddress={userEthAddress}/>
        </main>
      </div>
    );
  }
  
  ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
  };


const StyledDrawer = withStyles(styles)(ClippedDrawer)
  

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    userEthAddress:state.accounts[0],
    drizzleStatus: state.drizzleStatus,
})


export default drizzleConnect(StyledDrawer, mapStateToProps);
  