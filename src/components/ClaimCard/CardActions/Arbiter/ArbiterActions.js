/**
 * 
 * Defines the actions that an arbiter can perform on a claim
 */

import CLAIM_STATES from './../ClaimStates'
import {RuleOnClaim} from './../Actions'
import {SupplyActionsEthInfo, GenerateActionsFromMap} from './../util'

const ArbiterActionsByState = (claimState) => {
    switch(claimState){
        case CLAIM_STATES.PRE_ARBITRATION:
            return []
        case CLAIM_STATES.PRE_ARBITRATION_STAKER_IS_SETTLER:
            return []
        case CLAIM_STATES.PRE_ARBITRATION_CLAIMANT_IS_SETTLER:
            return []
        case CLAIM_STATES.ARBITRATION:
            return [RuleOnClaim]
        case CLAIM_STATES.RULED:
            return []
        default:
            console.error("Unknown Claim State")
    }
}

const ArbiterActions = GenerateActionsFromMap(ArbiterActionsByState)
export default ArbiterActions

