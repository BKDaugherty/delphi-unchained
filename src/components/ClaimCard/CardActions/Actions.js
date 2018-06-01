/**
 * Defines the configuration files for actions that can be performed on a claim
 */

import {increaseClaimFee, proposeSettlement, acceptSettlement, settlementFailed, ruleOnClaim }
 from '../../../services/delphi-contract/ClaimActions'

export const IncreaseClaimFee = (ethAddress, stakeAddress) => ({
    label:"Increase Claim Fee", 
    dialogProps:{
        title:'Increase Claim Fee',
        description:'By increasing the claim fee, you increase the chance that the arbiters will rule on the claim.',
        onSubmit: increaseClaimFee(ethAddress, stakeAddress),
        formName:"IncreaseClaimFeeForm",
        // validate: validateWhitelistClaimant,
        fields:[{
            type:'number',
            label:'Id of Claim',
            name:'claimId',
        },
        {
            type:'number',
            label:'Amount to increase fee',
            name:'amount',
        }]
    }
})

export const ProposeSettlement = (ethAddress, stakeAddress) => ({
    label:"Propose a Settlement",
        dialogProps:{
            title:'Propose a Settlement',
            description:'Propose a settlement for this claim',
            onSubmit: proposeSettlement(ethAddress, stakeAddress),
            formName:'ProposeSettlementForm',
            // validate:validateIncreaseStakeAmount,
            fields:[{
                type:'number',
                label:'Id of Claim',
                name:'claimId',
            },
            {
                type:'number',
                label:'Amount to increase fee',
                name:'amount',
            }]
        }
})

export const AcceptSettlement = (ethAddress, stakeAddress) => ({
    label:'Accept Settlement',
    dialogProps:{
        title:'Accepting the Settlement',
        description:"By accepting this settlement, you will not move into arbitration, and your fee will be returned.",
        onSubmit: acceptSettlement(ethAddress, stakeAddress),
        formName:'AcceptSettlementForm',
        // validate:validateExtendStakeReleaseTime,        
    },
})

export const SettlementFailed = (ethAddress, stakeAddress) => ({
    label:'Fail the Settlement',
    dialogProps:{
        title:'Fail the Settlement',
        description:"By failing this settlement, you will advance directly into arbitration, and your fee will be lost.",
        onSubmit: settlementFailed(ethAddress, stakeAddress),
        formName:'SettlementFailedForm',
        // validate:validateExtendStakeReleaseTime,        
    },
})

export const RuleOnClaim = (ethAddress, stakeAddress) => ({
    label:'Rule on the Claim',
    dialogProps:{
        title:'Rule on the Claim',
        description:"Make a ruling on this claim",
        onSubmit: ruleOnClaim(ethAddress, stakeAddress),
        formName:'RuleOnClaimForm',
        // validate:validateExtendStakeReleaseTime,        
    },
})