/* Holds common validation funcitons for input data */

export const isValidEthereumAddress = address => (
    address && address.match(/^0x[0-9A-Fa-f]{40}$/)
)

export const isInTheFuture = unixTimeInSeconds => (
    /*
        JavaScript Date.now returns milliseconds,
        and dividing returns a float, thus we need
        to both round and divide by 1000 to get the 
        correct units. 
    */ 
    
    unixTimeInSeconds > Math.round((Date.now() / 1000))
)

