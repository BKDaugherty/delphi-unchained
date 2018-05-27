/*
  Top level component that represents our App. 
  Shows all providers that are sending data through the application
*/

import React, { Component } from 'react';
import store from './store'
import {DrizzleProvider} from 'drizzle-react'
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import history from './history'
import RouteMap from './navigation/RouteMap'

import {drizzleOptions} from './drizzle'

import { MuiThemeProvider, } from 'material-ui/styles';
import mui_theme from './styles/mui-theme'
import { ThemeProvider } from 'styled-components';

const GOLD = "#8D8741"
const LIGHTBLUE="#659DBD"
const SALMON = "#DAAD86"
const BROWN = "#BC986A"
const FADEDYELLOW="#FBEEC1"


const theme = {
  primary:GOLD,
  secondary:SALMON,
  background:LIGHTBLUE,
  tertiary:FADEDYELLOW,
  background2:BROWN,
  paper:'#fff'
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={mui_theme}>
        <DrizzleProvider options={drizzleOptions} store={store}>
          <Provider store={store}>
            <ConnectedRouter basename={process.env.PUBLIC_URL} history={history}>
              <MuiThemeProvider theme={mui_theme}>
                <RouteMap/>
              </MuiThemeProvider>
            </ConnectedRouter>
            </Provider>    
        </DrizzleProvider>
      </ThemeProvider>
    );
  }
}

export default App;
