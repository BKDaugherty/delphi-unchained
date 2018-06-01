/* Configures Drizzle to be imported by the provider */

import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'
export const drizzleOptions = {
        polls: {
          accounts: 3000,
        //   blocks: interval
        },
        web3: {
          fallback: {
            type:'ws',
            url:'wss://ropsten.infura.io/ws/U6bpkteiO0xMIuYeiHzk'
          }
        }
      }

export function* rootSaga() {
  yield all(
    drizzleSagas.map(saga => fork(saga))
    )
}
export const initialState = {}