/* Configures Drizzle to be imported by the provider */

import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'
export const drizzleOptions = {
        //contracts:[DelphiStakeFactory],
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
export const initialState = {}