import {ValidateRequiredPositiveInteger, validRequired} from '../validation'

export default ({ claimAmount, claimFee, claimData }) => {
    let errors = {}

    errors.claimAmount = ValidateRequiredPositiveInteger({
        value: claimAmount
    }).error

    //TODO: Claim amount must be payable by staker
    // else if(claimAmountAsNumber + claimFeeAsNumber > stake + claimFee){
    //     errors.claimAmount = 'The claim amount + the claim fee must be payable by the staker'
    // }

    errors.claimFee = ValidateRequiredPositiveInteger({ value: claimFee }).error
    errors.claimData = validRequired({ value: claimData }).error

    return errors
}
