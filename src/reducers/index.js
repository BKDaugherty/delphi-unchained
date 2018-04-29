import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import web3 from './web3'

// Combine all of our imported reducers
export default combineReducers({
    router:routerReducer,
    web3:web3
})