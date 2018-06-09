/**
 * Specifies validation constants to avoid magic strings
 * and magic numbers. Also specifies validation errors
 */

export default {
    IsRequired: 'Required',
    IsNumber: 'Must be a valid number',
    IsPositiveNumber: 'Must be a positive, valid number',
    IsInteger: 'Must be a valid integer',
    IsPositiveInteger: 'Must be a positive, valid integer',
    IsEthereumAddress: 'Must be a valid Ethereum Address',
    IsInFuture: 'Must be a unix timestamp in the future'
}
