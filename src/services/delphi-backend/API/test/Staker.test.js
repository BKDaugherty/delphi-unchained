/**
 * Defines the tests for the staker endpoint
 */


import GetStakerStakes from './Staker'

const EthAddressRegExp = /^0x[0-9A-Fa-f]{40}$/

test("Should return a staker's stakes", async () => {
    await GetStakerStakes('0xD5D93240afcB6fb8Da6236B8E22F2EBa4106f25F')

})
