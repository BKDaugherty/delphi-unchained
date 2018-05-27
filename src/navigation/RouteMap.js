/*
    Defines the routing structure for the top level of our app.
*/

import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Import all of the pages that we will use in our application
import LandingPage from '../pages/LandingPage'
import StakeExplorer from '../pages/StakeExplorer'
import PublicStakeView from '../pages/PublicStakeView'
import Dashboard from '../pages/dashboard'
import TestClaim from '../pages/testClaim'

import ReactCSSTransitionReplace from 'react-css-transition-replace'

import {withRouter} from 'react-router'

// Defines the navigation structure of our app

const RouteStructure = ({location}) => (
    <ReactCSSTransitionReplace transitionName="cross-fade" 
          transitionEnterTimeout={1000} 
          transitionLeaveTimeout={1000}>
            <Switch key ={location.key} location={location}>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/stake" component={StakeExplorer}/>
                {/*By use of the ':', we tell react-router that address is a variable*/}
                <Route path="/stake/:address" component={PublicStakeView}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/Claim" component={TestClaim}/>
            </Switch>
    </ReactCSSTransitionReplace>)

export default withRouter(RouteStructure)
