import {ValidateRequiredAddress, ValidateRequiredTimeInFuture} from '../validation'

export default ({claimantAddress, claimantDeadline}) => {
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
