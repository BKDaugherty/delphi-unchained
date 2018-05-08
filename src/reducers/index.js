import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import { drizzleReducers } from 'drizzle'


// Combine all of our imported reducers
export default combineReducers({
    router:routerReducer,
    ...drizzleReducers
})