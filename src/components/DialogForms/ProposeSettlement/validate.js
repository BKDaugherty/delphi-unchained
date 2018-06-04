import { validInteger, ValidateRequiredPositiveNumber } from "../validation";

export default ({claimId, amount}) => ({
    claimId:validInteger(claimId).error,
    amount:ValidateRequiredPositiveNumber(amount).error
})

