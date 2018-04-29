// Reducer for web3
const defaultState = {
    ethAddress:null
}
export default function(state = defaultState, action) {
    switch(action.type) {
        case 'web3/RECEIVE_ACCOUNT':
            return {
                ...state,
                ethAddress: action.address
         };
   
        case 'web3/CHANGE_ACCOUNT':
            console.log("CHANGED ACCOUNT")
            return {
                ...state,
                ethAddress: action.address
            };
        default:
            return state
    }
  }