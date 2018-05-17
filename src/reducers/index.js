import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import { reducer as formReducer } from 'redux-form'

// Combine all of our imported reducers
// into one root reducer
export default combineReducers({
    router:routerReducer,
    form:formReducer,
    ...drizzleReducers
})