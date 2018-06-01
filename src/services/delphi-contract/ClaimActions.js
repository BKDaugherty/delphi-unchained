/**
 * Uses Truffle contract methods to interact with DelphiStake Claims
 */

import {DelphiStake, EIP20} from '../../services/delphi-contract'

// Prereqs from Solidity
// validClaimID(_claimId)
// claimNotRuled(_claimId)
// settlementDidFail(_claimId)

export const increaseClaimFee = (ethAddress, stakeAddress, tokenAddress) => async ({claimId, amount}) => {
    const stake = await DelphiStake.at(stakeAddress)
    const token = await EIP20.at(tokenAddress)
    token.transfer(stakeAddress, amount,{from:ethAddress})
    return stake.increaseClaimFee(amount, {from:ethAddress})
}

export const proposeSettlement = (ethAddress, stakeAddress) => async ({claimId, amount}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.proposeSettlement(claimId, amount, {from:ethAddress})
}

export const acceptSettlement = (ethAddress, stakeAddress) => async ({claimId, settlementId}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.acceptSettlement(claimId, settlementId, {from:ethAddress})
}

export const settlementFailed = (ethAddress, stakeAddress) => async ({claimId}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.settlementFailed(claimId, {from:ethAddress})
}

export const ruleOnClaim = (ethAddress, stakeAddress) => async ({claimId, ruling}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stakeAddress.ruleOnClaim(claimId, ruling, {from:ethAddress})
}
