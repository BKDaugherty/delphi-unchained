import {ValidateRequiredPositiveNumber, validInteger} from '../validation'

export default ({ claimId, amount }) => ({
    claimId: validInteger(claimId).error,
    amount: ValidateRequiredPositiveNumber(amount).error
})
