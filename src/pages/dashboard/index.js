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

  import './../../index.css'

import ReactCSSTransitionReplace from 'react-css-transition-replace'

const SwitchRoutes = ({location, userEthAddress}) => {
  return (
    <ReactCSSTransitionReplace transitionName="cross-fade" 
      transitionEnterTimeout={1000} 
      transitionLeaveTimeout={1000}>
    <Switch key={location.key} location={location}>
      {dashboardRoutes.map((prop, key) => {
        const Component = prop.component
        return (
        <Route exact={prop.exact} 
          path={prop.path} 
          component={(properties) => <Component {...properties} userEthAddress={userEthAddress} />}
          key={key}/>
        )
      })}  
    </Switch>
  </ReactCSSTransitionReplace> 
)}

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
      backgroundColor:'#659dbd',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%235685a1' fill-opacity='0.06'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.06'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E")`,
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
    const { classes, userEthAddress, location } = props;
  
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
          
              <SwitchRoutes location={location} userEthAddress={userEthAddress}/>
            
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

const DrizzledDrawer = drizzleConnect(StyledDrawer, mapStateToProps)

export default DrizzledDrawer;
  