
import {
    validInteger, 
    validNumber, 
    validPositive, 
    validRequired,
    CombinedValidator,
} from './../../../util/validation'

const RequiredPositiveInteger = CombinedValidator(validRequired, validNumber, validInteger, validPositive)

export const validateOpenClaim = ({claimAmount, claimFee, claimData}) => {
    let errors = {}

    errors.claimAmount = RequiredPositiveInteger({value:claimAmount}).error

    //TODO: Claim amount must be payable by staker
    // else if(claimAmountAsNumber + claimFeeAsNumber > stake + claimFee){
    //     errors.claimAmount = 'The claim amount + the claim fee must be payable by the staker'
    // }

    errors.claimFee = RequiredPositiveInteger({value:claimFee}).error
    errors.claimData = validRequired({value:claimData}).error

    return errors
}