import React, { Component } from 'react';
import store from './store'

import {Web3Provider} from 'react-web3';
import {Provider} from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

// Don't like that history is required...
import history from './history'

import Home from './pages/home'
import About from './pages/about'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Web3Provider>
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
            </div>
          </ConnectedRouter>
        </Web3Provider>
      </Provider>
    );
  }
}

export default App;
