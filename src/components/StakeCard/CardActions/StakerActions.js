/* 
    Defines the actions that a staker can perform on the
    staker card. Used to generate the dialog forms on the card.
*/

import {whitelistClaimant, 
        increaseStakeAmount, 
        extendStakeReleaseTime, 
        withdrawStake} 
    from '../../../services/delphi-contract/StakeActions'

import {validateWhitelistClaimant, 
        validateIncreaseStakeAmount, 
        validateExtendStakeReleaseTime
    } from './StakerCardFormValidation'


const StakerActions = (ethAddress, stakeAddress, tokenAddress) =>[
    {
        label:"Whitelist a Claimant", 
        dialogProps:{
            title:'Whitelist a claimant',
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
            onSubmit: increaseStakeAmount(ethAddress, stakeAddress, tokenAddress),
            formName:'IncreaseStakeForm',
            validate:validateIncreaseStakeAmount,
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

export default StakerActions