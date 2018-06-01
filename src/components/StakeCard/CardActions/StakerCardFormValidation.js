/**
 *  Defines the validations used for the StakeActionForms
 *  Each function checks the fields in a form, and ensures
 *  that they take the correct value
 */

import {
    validationValueToNumber,
    validEthAddress, 
    validInteger, 
    validNumber, 
    validPositive, 
    validTimeInTheFuture,
    validRequired,
    CombinedValidator,
} from './../../../util/validation'

const ValidateRequiredAddress = CombinedValidator(validEthAddress, validRequired)
const ValidateRequiredPositiveInteger = CombinedValidator(validRequired, validNumber, validPositive, validInteger)
const ValidateRequiredTimeInFuture = CombinedValidator(validRequired, validNumber, validInteger, validTimeInTheFuture )

export const validateWhitelistClaimant = ({claimantAddress, claimantDeadline}) => {
    let errors = {}    
    errors.claimantAddress = ValidateRequiredAddress({value:claimantAddress}).error
    errors.claimantDeadline = ValidateRequiredTimeInFuture({value:claimantDeadline}).error

    // TODO: Add info per whitelisted user. (Extract from Redux?)
    // New deadline must be greater than current deadline 
    // for this claimant, if h/she has been whitelisted before
    // as per Solidity contract
    // else if(claimantDeadlineAsNumber){
    //     errors.claimDeadline = ''
    // }

    return errors
}

export const validateIncreaseStakeAmount = ({increaseStakeAmount}) => {
    let errors = {}

    errors.increaseStakeAmount = ValidateRequiredPositiveInteger({value:increaseStakeAmount}).error
    // // TODO : Check if the user has enough tokens to increase the stake
    // // else if ()

    return errors

}


export const validateExtendStakeReleaseTime = ({stakeReleaseTime}) => {
    let errors = {} 

    errors.stakeReleaseTime = ValidateRequiredTimeInFuture({value:stakeReleaseTime}).error

    return errors
    // TODO: Check if stake release time given is greater than current
    // Stake time
    // else if(stakeReleaseTime is less than current stakeReleaseTime){
    // errors.stakeReleaseTime must be larger than current stake release time
    // }
}