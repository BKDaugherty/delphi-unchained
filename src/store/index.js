import { createStore, applyMiddleware } from 'redux'
import middleware from './middleware'
import rootReducer from '../reducers'

// Create the store by applying the middleware to the reducer
const store = createStore(rootReducer, applyMiddleware(...middleware))
export default store