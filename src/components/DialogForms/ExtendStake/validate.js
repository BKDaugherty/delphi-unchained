import {ValidateRequiredTimeInFuture} from '../validation'

export default ({stakeReleaseTime}) => {
    let errors = {} 

    errors.stakeReleaseTime = ValidateRequiredTimeInFuture({value:stakeReleaseTime}).error

    return errors
    // TODO: Check if stake release time given is greater than current
    // Stake time
    // else if(stakeReleaseTime is less than current stakeReleaseTime){
    // errors.stakeReleaseTime must be larger than current stake release time
    // }
}