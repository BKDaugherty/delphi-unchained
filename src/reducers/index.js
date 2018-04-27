import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

// Combine all of our imported reducers
export default combineReducers({
    router:routerReducer
})