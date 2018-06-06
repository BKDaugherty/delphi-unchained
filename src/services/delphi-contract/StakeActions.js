import {DelphiStake, EIP20} from '../../services/delphi-contract'
import IPFS from '../../pages/IpfsTest';
import {IPFS_function} from '../../services/ipfs/index'

// Staker Actions
export const whitelistClaimant = (ethAddress, stakeAddress) => async ({claimantAddress, claimantDeadline}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.whitelistClaimant(claimantAddress, claimantDeadline, {from:ethAddress})
}

export const increaseStakeAmount = (ethAddress, stakeAddress, tokenAddress) => async ({increaseStakeAmount}) => {
    // Need to know the addresses of contracts being used
    const stake = await DelphiStake.at(stakeAddress)
    const token = await EIP20.at(tokenAddress)
    const tokenResult = await token.approve(stake.address, increaseStakeAmount, {from:ethAddress})
    console.log(tokenResult)    
    const result = stake.increaseStake(increaseStakeAmount, {from:ethAddress})
    return result
}

export const extendStakeReleaseTime = (ethAddress, stakeAddress) => async ({stakeReleaseTime}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.extendStakeReleaseTime(stakeReleaseTime,{from:ethAddress})
}


export const withdrawStake = (ethAddress, stakeAddress) => async () => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.withdrawStake({from:ethAddress})
}


export const openClaim = (ethAddress, stakeAddress) => async ({claimAmount, claimFee, claimData, claimSkipSettlement}) => {
    const stake = await DelphiStake.at(stakeAddress)
    const hash = await IPFS_function({message: claimData})
    const method = claimSkipSettlement ? stake.openClaimWithoutSettlement : stake.openClaim
    return method(claimAmount, claimFee, claimData, {from:ethAddress})
}
