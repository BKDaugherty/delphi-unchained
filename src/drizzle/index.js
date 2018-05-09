import DelphiStake from './artifacts/DelphiStake.json'

import {generateContractsInitialState } from 'drizzle'

import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'

export const drizzleOptions = {
        contracts:[DelphiStake],
        // events: {
        //   contractName: [
        //     eventName
        //   ]
        // },
        polls: {
          accounts: 3000,
        //   blocks: interval
        },
        web3: {
          fallback: {
            type:'ws',
            url:'ws://ganache:8545'
          }
        }
      }

export function* rootSaga() {
  yield all(
    drizzleSagas.map(saga => fork(saga))
    )
}

export const initialState = {
    contracts: generateContractsInitialState(drizzleOptions)
}
