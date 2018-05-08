import {createStore, applyMiddleware, compose } from 'redux'
import middleware from './middleware'
import rootReducer from '../reducers'

import {initialState, rootSaga} from '../drizzle'

import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()

// Create the store by applying the middleware to the reducer
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)
export default store