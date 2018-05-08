import React, { Component } from 'react';
import store from './store'
import {DrizzleProvider} from 'drizzle-react'
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
// Don't like that history is required...
import history from './history'
import RouteMap from './navigation/RouteMap'

import {drizzleOptions} from './drizzle'

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions} store={store}>
        <Provider store={store}>
          <ConnectedRouter basename={process.env.PUBLIC_URL} history={history}>
            <RouteMap/>
          </ConnectedRouter>
          </Provider>    
      </DrizzleProvider>
    );
  }
}

export default App;
