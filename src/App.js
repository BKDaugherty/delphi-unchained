import React, { Component } from 'react';
import {Web3Provider} from 'react-web3';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Web3Provider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      </Web3Provider>
    );
  }
}

export default App;
