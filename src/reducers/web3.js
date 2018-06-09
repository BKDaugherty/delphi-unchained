/**
 * Defines the Web3 reducer, used to get information about
 * web3 that is inaccessible from drizzle
 */

const initialState = {
    network:process.env.REACT_APP_ETH_NETWORK
}

export default (state = initialState, action) => {
    switch(action.type){
        case "web3/UPDATE_NETWORK":
            return Object.assign({}, state, {
                network: action.network
            })
        default:
            return state
    }
}