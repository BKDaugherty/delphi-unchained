import React from 'react'
import {Route} from 'react-router-dom'

// Import all of the pages that we will use in our application
import Home from '../pages/home'
import PublicStakeView from '../pages/PublicStakeView'
import Dashboard from '../pages/dashboard'

// Defines the navigation structure of our app
export default (props) => (
<div>
    <Route exact path="/" component={Home}/>
    {/*By use of the ':', we tell react-router that address is a variable*/}
    <Route path="/stake/:address" component={PublicStakeView}/>
    <Route path="/dashboard" component={Dashboard}/>
</div>
)