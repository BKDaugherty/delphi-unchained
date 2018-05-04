import React, { Component } from 'react';
import store from './store'

// import {Web3Provider} from 'react-web3';
import {Provider} from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

// Don't like that history is required...
import history from './history'
import RouteMap from './navigation/RouteMap'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <Web3Provider> */}
          <ConnectedRouter history={history}>
            <RouteMap/>
          </ConnectedRouter>
        {/* </Web3Provider> */}
      </Provider>
    );
  }
}

export default App;
