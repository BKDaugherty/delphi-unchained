import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {drizzleReducers} from 'drizzle'
import {reducer as formReducer} from 'redux-form'
import m_web3 from './web3'

// Combine all of our imported reducers
// into one root reducer to be applied to the store
export default combineReducers({
    router: routerReducer,
    form: formReducer,
    ...drizzleReducers,
    m_web3
})
