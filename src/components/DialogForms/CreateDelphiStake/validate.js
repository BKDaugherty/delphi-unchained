import {
    ValidateRequiredAddress,
    ValidateRequiredPositiveNumber,
    ValidateRequiredTimeInFuture,
    validRequired
} from '../validation'

export default ({
    value,
    token,
    minimumFee,
    data,
    stakeReleaseTime,
    arbiter
}) => ({
    value: ValidateRequiredPositiveNumber({ value: value }).error,
    token: ValidateRequiredPositiveNumber({ value: token }).error,
    minimumFee: ValidateRequiredPositiveNumber({ value: minimumFee }).error,
    data: validRequired({ value: data }).error,
    stakeReleaseTime: ValidateRequiredTimeInFuture({ value: stakeReleaseTime })
        .error,
    arbiter: ValidateRequiredAddress({ value: arbiter }).error
})
