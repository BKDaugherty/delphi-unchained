/* Defines the set of actions that can be made on a stake */

import {DelphiStake, EIP20} from '../../services/delphi-contract'

import {isValidEthereumAddress, isInTheFuture} from '../../util/validation'

// Staker Actions
const whitelistClaimant = (ethAddress, stakeAddress) => async ({claimantAddress, claimantDeadline}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.whitelistClaimant(claimantAddress, claimantDeadline, {from:ethAddress})
}

// Checks if each field in form is valid, and
// stops submission and alerts user if a field is invalid.

const validateWhitelistClaimant = ({claimantAddress, claimantDeadline}) => {
    let errors = {}
    
    // Validate the input Ethereum Address
    if(!claimantAddress){
        errors.claimantAddress = 'Required'
    } else if(!isValidEthereumAddress(claimantAddress)){
        errors.claimantAddress = 'Invalid Ethereum Address'
    }

    const claimantDeadlineAsNumber = Number(claimantDeadline)

    // Validate the input deadline
    if(!claimantDeadline){
        errors.claimantDeadline = 'Required'
    } else if (isNaN( claimantDeadlineAsNumber)){
        errors.claimantDeadline = 'Must be a number in Unix format'
    } 
    /*  
        JavaScript time is given in milliseconds, divide by 1000
        to get seconds for unix time since epoch.
    */

    else if (!isInTheFuture(claimantDeadlineAsNumber)){    
        errors.claimantDeadline = 'Must be a unix time in the future'
    }

    // TODO: Add info per whitelisted user. (Extract from Redux?)
    // New deadline must be greater than current deadline 
    // for this claimant, if h/she has been whitelisted before
    // as per Solidity contract
    // else if(claimantDeadlineAsNumber){
    //     errors.claimDeadline = ''
    // }

    return errors
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

const validateIncreaseStake = ({increaseStakeAmount}) => {
    let errors = {}

    const increaseStakeAmountAsNumber = Number(increaseStakeAmount)

    if(!increaseStakeAmount){
        errors.increaseStakeAmount = 'Required'
    } else if(isNaN(increaseStakeAmountAsNumber)){
        errors.increaseStakeAmount = 'Must be a number'
    } else if (increaseStakeAmountAsNumber < 0){
        errors.increaseStakeAmount = 'Must be a positive number'
    }

    // TODO : Check if the user has enough tokens to increase the stake
    // else if ()

    return errors

}

const extendStakeReleaseTime = (ethAddress, stakeAddress) => async ({stakeReleaseTime}) => {
    const stake = await DelphiStake.at(stakeAddress)
    return stake.extendStakeReleaseTime(stakeReleaseTime,{from:ethAddress})
}

const validateExtendStakeReleaseTime = ({stakeReleaseTime}) => {
    let errors = {}

    const stakeReleaseTimeAsNumber = Number(stakeReleaseTime)

    if(!stakeReleaseTime){
        errors.stakeReleaseTime = 'Required'
    } else if(isNaN(stakeReleaseTimeAsNumber)){
        errors.stakeReleaseTime = 'Must be a number representing unix time'
    } else if (!isInTheFuture(stakeReleaseTimeAsNumber)){
        errors.stakeReleaseTime = 'Must be a unix time in the future'
    }

    return errors
    // TODO: Check if stake release time given is greater than current
    // Stake time
    // else if(stakeReleaseTime is less than current stakeReleaseTime){
    // errors.stakeReleaseTime must be larger than current stake release time
    // }
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

const validateOpenClaim = ({claimAmount, claimFee, claimData}) => {
    let errors = {}

    const claimAmountAsNumber = Number(claimAmount)
    if(!claimAmount){
        errors.claimAmount = 'Required'
    } else if(isNaN(claimAmountAsNumber)){
        errors.claimAmount = 'Must be a valid number'
    } else if (claimAmountAsNumber){
        errors.claimAmount = 'Must be a positive number'
    }

    //TODO: Claim amount must be payable by staker
    // else if(claimAmountAsNumber + claimFeeAsNumber > stake + claimFee){
    //     errors.claimAmount = 'The claim amount + the claim fee must be payable by the staker'
    // }

    const claimFeeAsNumber = Number(claimFee)

    if(!claimFee){
        errors.claimFee = 'Required'
    } else if (isNaN(claimFeeAsNumber)){
        errors.claimFee = 'Must be a number'
    } else if (claimFeeAsNumber < 0){
        errors.claimFee = ' Must be a positive number'
    } //else if ()

    if(!claimData){
        errors.claimData = 'Required'
    }

    return errors


}


export const stakerActions = (ethAddress, stakeAddress, tokenAddress) =>[
    {
        label:"Whitelist a Claimant", // Label of shown button
        dialogProps:{
            title:'whitelistClaimant',
            description:'By whitelisting a claimant, you can allow someone to make a claim on your stake.',
            onSubmit: whitelistClaimant(ethAddress, stakeAddress),
            formName:"WhitelistClaimantForm",
            validate: validateWhitelistClaimant,
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
            validate:validateIncreaseStake,
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
            validate:validateExtendStakeReleaseTime,
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
            validate:validateOpenClaim,
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
