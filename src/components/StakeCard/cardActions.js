/* Defines the set of actions that can be made on a stake */

import {DelphiStake, EIP20} from '../../services/delphi-contract'

// Staker Actions
const whitelistClaimant = (ethAddress, stakeAddress) => async ({claimantAddress, claimantDeadline}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.whitelistClaimant(claimantAddress, claimantDeadline, {from:ethAddress})
}


const increaseStake = (ethAddress, stakeAddress, tokenAddress) => async ({increaseStakeAmount}) => {
    // Need to know the addresses of contracts being used
    const stake = await DelphiStake.at(stakeAddress)
    const token = await EIP20.at(tokenAddress)
    const tokenResult = await token.approve(stake.address, increaseStakeAmount, {from:ethAddress})
    console.log(tokenResult)    
    const result = stake.increaseStake(increaseStakeAmount, {from:ethAddress})
    return result
}

const extendStakeReleaseTime = (ethAddress, stakeAddress) => async ({stakeReleaseTime}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.extendStakeReleaseTime(stakeReleaseTime,{from:ethAddress})
}

const withdrawStake = (ethAddress, stakeAddress) => async () => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.withdrawStake({from:ethAddress})
}

// Claimant Actions

const openClaim = (ethAddress, stakeAddress) => async ({claimAmount, claimFee, claimData, claimSkipSettlement}) => {
    const stake = await DelphiStake.at(stakeAddress)
    const method = claimSkipSettlement ? stake.openClaimWithoutSettlement : stake.openClaim
    return method(ethAddress, claimAmount, claimFee, claimData, {from:ethAddress})
}


export const stakerActions = (ethAddress, stakeAddress, tokenAddress) =>[
    {
        label:"Whitelist a Claimant", // Label of shown button
        dialogProps:{
            title:'whitelistClaimant',
            description:'By whitelisting a claimant, you can allow someone to make a claim on your stake.',
            onSubmit: whitelistClaimant(ethAddress, stakeAddress),
            formName:"WhitelistClaimantForm",
            fields:[{
                type:'text',
                label:'Address of Claimant',
                name:'claimantAddress',
                multiline:true,
            },
            {
                type:'number',
                label:'Claim Deadline (Unix)',
                name:'claimantDeadline',
            }]
        }
    },            
    {
        label:"Increase Stake Amount",
        dialogProps:{
            title:'Increase the Staked Amount',
            description:'Increase the amount of funds in the stake.',
            onSubmit: increaseStake(ethAddress, stakeAddress, tokenAddress),
            formName:'IncreaseStakeForm',
            fields:[{
                type:'number',
                label:'Amount to Increase',
                name:'increaseStakeAmount'
            }]
        }
    },
    {
        label:'Extend the Stake',
        dialogProps:{
            title:'Extend the Stake',
            description:"Extend the stake's deadline",
            onSubmit: extendStakeReleaseTime(ethAddress, stakeAddress),
            formName:'ExtendStakeForm',
            fields:[{
                type:'number',
                label:'Deadline (Unix)',
                name:'stakeReleaseTime',
            }],
            
        },
    },
    {
        label:'Withdraw the Stake',
        dialogProps:{
            title:'Withdraw the Stake',
            description:'Are you sure you would like to withdraw your stake?',
            onSubmit:withdrawStake(ethAddress, stakeAddress, tokenAddress),
            formName:'WithdrawStakeForm',
        }
    }
]

export const arbiterActions = []

export const claimantActions = (ethAddress, contracts) => [
    {
        label:'Open a Claim',
        dialogProps:{
            title:'Open a Claim',
            description:"Open a claim against this stake",
            formName:'OpenClaimForm',
            onSubmit:openClaim(ethAddress, contracts),
            fields:[
            {
                type:'number',
                label:'Amount',
                name:'claimAmount',
            },
            {
                type:'number',
                label:'Fee',
                name:'claimFee',
            },
            {
                type:'text',
                label:'Data',
                name:'claimData'
            },
            {
                type:'checkbox',
                label:'Skip Settlement',
                name:'claimSkipSettlement'
            },
            ],
        }
    }
]

export const publicActions = [{
    name:'learnMore',
    label:'Learn More About This Staker',
    onSubmit:console.log,
    
}
]
