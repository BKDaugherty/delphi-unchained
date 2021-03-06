/* Module Export of JavaScript SDK for interacting with the Delphi API */

import {DelphiAPIGetRequest} from './common'
import {ENDPOINTS} from './config'

export default {
    GetArbiter: DelphiAPIGetRequest(ENDPOINTS.ARBITER),
    GetClaimant: DelphiAPIGetRequest(ENDPOINTS.CLAIMANT),
    GetStake: DelphiAPIGetRequest(ENDPOINTS.STAKE),
    GetStaker: DelphiAPIGetRequest(ENDPOINTS.STAKER),
    GetWhitelistee: DelphiAPIGetRequest(ENDPOINTS.WHITELISTEE)
}
