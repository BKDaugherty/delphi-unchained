/**
 * Defines the actions that a claimant can perform on a claim.
 */

import CLAIM_STATES from './../ClaimStates'
import {AcceptSettlement, IncreaseClaimFee, ProposeSettlement, SettlementFailed } from './../Actions'
import {GenerateActionsFromMap} from './../util'

const PreArbitrationClaimActions = [ProposeSettlement, SettlementFailed]
const PreArbitrationSettlementByStakerClaimActions = [AcceptSettlement, SettlementFailed]
const PreArbitrationSettlementByClaimantClaimActions = [SettlementFailed]
const ArbitrationClaimActions = [IncreaseClaimFee]
const RuledClaimActions = []

// Defines the actions that one can take based on a state
const ClaimantActionsByState = (claimState) => {
    switch(claimState){
        case CLAIM_STATES.PRE_ARBITRATION:
            return PreArbitrationClaimActions
        case CLAIM_STATES.PRE_ARBITRATION_STAKER_IS_SETTLER:
            return PreArbitrationSettlementByStakerClaimActions
        case CLAIM_STATES.PRE_ARBITRATION_CLAIMANT_IS_SETTLER:
            return PreArbitrationSettlementByClaimantClaimActions
        case CLAIM_STATES.ARBITRATION:
            return ArbitrationClaimActions
        case CLAIM_STATES.RULED:
            return RuledClaimActions
        default:
            console.error("Unknown Claim State")
    }
}

// Final interface for Claim Card Actions. Pass in the state to get the actions,
// then pass in the ethInfo and you'll have a list of actions! 
const ClaimantActions = GenerateActionsFromMap(ClaimantActionsByState)
export default ClaimantActions