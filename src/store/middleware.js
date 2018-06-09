// Redux Thunk Middleware allows for async actions to be dispatched!
import thunk from 'redux-thunk'
// Router Middleware allows us to use Redux to manage our route state
import {routerMiddleware} from 'react-router-redux'
import history from '../history'

// Build middleware for router actions
const historyRouterMiddleware = routerMiddleware(history)

// Export all of our middleware to be applied on creation of store
export default [thunk, historyRouterMiddleware]
