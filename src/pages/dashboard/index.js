import React from 'react'

import { Switch, Route,  } from "react-router-dom";
import dashboardRoutes from './routes'
import AppHeader from '../../components/AppHeader'
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import {
    withStyles,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
  } from "material-ui";

const switchRoutes = (
    <Switch>
      {dashboardRoutes.map((prop, key) => {
        return <Route exact={prop.exact} path={prop.path} component={prop.component} key={key}  />;
      })}
    </Switch>
);

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
    const { classes } = props;
  
    return (
      <div className={classes.root}>
        <AppHeader className={classes.appBar}/>
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
              {dashboardRoutes.map(route => <SidebarLink path={route.path} name={route.name} icon={route.icon}/>)}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* Adds the switch router*/}
          {switchRoutes}
        </main>
      </div>
    );
  }
  
  ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ClippedDrawer);
  