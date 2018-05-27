/*
    Holds the JavaScript SDK of interacting with the Delphi API Resource "Stake"
*/

import {ENDPOINTS } from './../config'

const stake = {
    "staker": "0x627306090abab3a6e1400e9345bc60c78a8bef57",
    "value": 100,
    "token": {
      "name": "DelphiCoin",
      "symbol": "DC",
      "address": "0x5ed8cee6b63b1c6afce3ad7c92f4fd7e1b8fad9f"
    },
    "minimum_fee": 5,
    "data": "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t",
    "claim_deadline": 1525417344,
    "arbiter": {
      "name": "",
      "description": "",
      "address": "0x498bad589c7acd871945ed6ca30b7bab0a977af7"
    },
    "whitelisted_claimants": [
    "0x5ed8cee6b63b1c6afce3ad7c92f4fd7e1b8fad9f",
    "0x498bad589c7acd871945ed6ca30b7bab0a977af7",
    "0x554f8e6938004575bd89cbef417aea5c18140d92"
  ],
  "claims": [
    {
      "id": 0,
      "amount": 25,
      "fee": 5,
      "surplus_fee": 0,
      "data": "QmT4AeWE9Q9EaoyLJiqaZuYQ8mJeq4ZBncjjFH9dQ9uDVA",
      "ruling": 0,
      "ruled": 0,
      "settlement_failed": 1
    },
    {
      "id": 1,
      "amount": 25,"fee": 5,
      "surplus_fee": 0,
      "data": "QmT4AeWE9Q9EaoyLJiqaZuYQ8mJeq4ZBncjjFH9dQ9uDVA",
      "ruling": 0,
      "ruled": 0,
      "settlement_failed": 1
    },
    {
      "id": 2,
      "amount": 25,
      "fee": 5,
      "surplus_fee": 0,
      "data": "QmT4AeWE9Q9EaoyLJiqaZuYQ8mJeq4ZBncjjFH9dQ9uDVA",
      "ruling": 0,
      "ruled": 0,
      "settlement_failed": 1
    },
  ],
  "settlements": [
    {
      "amount": 10,
      "staker_agrees": 0,
      "claimant_agrees": 0
    }
  ]
}

const GetStakeInfoAtAddress = async (address) => {
    try {
        // Proxy Server means we don't need to specify API url or endpoint.
        // Check Package.json for configuration
        // const request_url = `${ENDPOINTS.GETSTAKE(address)}`
        // const stakeInfo = await fetch(request_url, {mode:'no-cors'})
        // const stakeJson = await stakeInfo.json()
        return stake
    } catch (error) {
        console.error(error)
    }
}

export default GetStakeInfoAtAddress
