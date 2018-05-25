/* Holds common validation funcitons for input data */

export const isValidEthereumAddress = address => (
    address && address.match(/^0x[0-9A-Fa-f]{40}$/)
)

