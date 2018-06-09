/**
 * Defines all of the actions that one can make on a stake using the DelphiStake Contract
 */

import {DelphiStake} from '../../services/delphi-contract'
import {IPFS_function} from '../ipfs'
import DelphiStakeJSON from '../../drizzle/artifacts/DelphiStake.json'
import EIP20JSON from '../../drizzle/artifacts/EIP20.json'
import {web3js} from './index'

// Staker Actions
export const whitelistClaimant = (ethAddress, stakeAddress) => async ({
    claimantAddress,
    claimantDeadline
}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.whitelistClaimant(claimantAddress, claimantDeadline, {
        from: ethAddress
    })
}

export const increaseStakeAmount = (
    ethAddress,
    stakeAddress,
    tokenAddress
) => async ({ increaseStakeAmount }) => {
    const stakeInstance = await new web3js.eth.Contract(
        DelphiStakeJSON.abi,
        stakeAddress
    )
    const tokenInstance = await new web3js.eth.Contract(
        EIP20JSON.abi,
        tokenAddress
    )

    const IncreaseStakeAmount = new web3js.BatchRequest()

    IncreaseStakeAmount.add(
        tokenInstance.methods
            .approve(stakeAddress, increaseStakeAmount)
            .send.request({ from: ethAddress })
    )
    IncreaseStakeAmount.add(
        stakeInstance.methods
            .increaseStake(increaseStakeAmount)
            .send.request({ from: ethAddress })
    )

    IncreaseStakeAmount.execute()

    return
}

export const extendStakeReleaseTime = (ethAddress, stakeAddress) => async ({
    stakeReleaseTime
}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.extendStakeReleaseTime(stakeReleaseTime, { from: ethAddress })
}

export const withdrawStake = (ethAddress, stakeAddress) => async () => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.withdrawStake({ from: ethAddress })
}

// Claimant Actions
export const openClaim = (ethAddress, stakeAddress, tokenAddress) => async ({
    claimAmount,
    claimFee,
    claimData,
    claimSkipSettlement
}) => {
    const stakeInstance = await new web3js.eth.Contract(
        DelphiStakeJSON.abi,
        stakeAddress
    )
    const tokenInstance = await new web3js.eth.Contract(
        EIP20JSON.abi,
        tokenAddress
    )

    const OpenClaim = new web3js.BatchRequest()

    OpenClaim.add(
        tokenInstance.methods
            .approve(stakeAddress, claimFee)
            .send.request({ from: ethAddress })
    )

    const method = claimSkipSettlement
        ? stakeInstance.methods.openClaimWithoutSettlement
        : stakeInstance.methods.openClaim
    const hash = await IPFS_function({ message: claimData })
    console.log('IPFS RETURNED HASH OF:', claimData, 'TO BE:', hash)

    OpenClaim.add(
        method(claimAmount, claimFee, hash).send.request({ from: ethAddress })
    )
    OpenClaim.execute()
    return
}
