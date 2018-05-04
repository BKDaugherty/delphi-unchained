// Action Types
// Lists the possible actions that our
// app can take at any given state.

import {addSuffix} from './util'

// General Suffixes for async requests
const ASYNC_REQUEST_SUFFIXES = {
    REQUEST_FAILURE : "_REQUEST_FAILED",
    REQUEST_SUCCEEDED :"_REQUEST_SUCCEEDED",
    REQUEST_INITIATED : "_REQUEST_INITIATED"
}

// View Stake information
const GET_STAKE = addSuffix("GET_STAKE", ASYNC_REQUESTS_SUFFIXES)
