import {DelphiStake, EIP20} from '../../services/delphi-contract'
import {IPFS_function} from '../ipfs'
import DelphiStakeJSON from '../../drizzle/artifacts/DelphiStake.json'
import EIP20JSON from '../../drizzle/artifacts/EIP20.json'
import {web3js} from './index'

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

// Claimant Actions
export const openClaim = (ethAddress, stakeAddress, tokenAddress) => async ({claimAmount, claimFee, claimData, claimSkipSettlement}) => {
    const stakeInstance = await new web3js.eth.Contract(DelphiStakeJSON.abi, stakeAddress)
    const tokenInstance = await new web3js.eth.Contract(EIP20JSON.abi, tokenAddress)

    const DeployStake = new web3js.BatchRequest()

    DeployStake.add(tokenInstance.methods.approve(stakeAddress, claimFee).send.request({from:ethAddress}))

    const method = claimSkipSettlement ? stakeInstance.methods.openClaimWithoutSettlement : stakeInstance.methods.openClaim
    console.log("IPFS RETURNED HASH OF:", claimData, "TO BE:", hash)
    const hash = await IPFS_function({message:claimData})

    DeployStake.add(method(claimAmount, claimFee, hash).send.request({from:ethAddress}))
    DeployStake.execute()
    return 
}
