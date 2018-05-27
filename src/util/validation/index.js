/**
 *  Holds common validation functions for input data
 *  The file uses a functional style to curry our validation
 */
import Errors from './constants'

const isInvalidEthereumAddress = address => (
    !address || !(address.match(/^0x[0-9A-Fa-f]{40}$/))
)

const isInThePast = unixTimeInSeconds => (
    /*
        JavaScript Date.now returns milliseconds,
        and dividing returns a float, thus we need
        to both round and divide by 1000 to get the 
        correct units. 
    */ 
    
    unixTimeInSeconds <= Math.round((Date.now() / 1000))
)

// Helpful logical functions for funcitonal programming
const isLessThan = comp => value => (value < comp)
const isNull = value => !value


// Generator for common validators
const ValidatorGenerator = (condition, errorMessage) => ({value, error}) => {
    if(condition(value)){
        return {value, error:errorMessage}
    } else {
        return {value, error}
    }
}

// Transformer for switching the type of the value.
const ValidatorTransformer = transformer => ({value, error}) => ({value:transformer(value), error})

// Combines passed in validators into a single validator
export const CombinedValidator = (...Validators) => ({value, error}) => {
    for (const Validator of Validators){
        let result = Validator({value, error})
        // Return the first error encountered?
        if (typeof(result.error) !== 'undefined'){
            return result
        }
    }
    return {value, error}
}

const combine2Validators = (valid1, valid2) => {
    return valid1(valid2)
}

// const combineNValidators = (first, second, ...rest) => {
//     if(!second) return first
//     else return combineNValidators(combine2Validators(first, second), ...rest)
// }

// Something like this for combination? ^^^

// Validatiors for common conditions
export const validRequired = ValidatorGenerator(isNull, Errors.IsRequired)
export const validNumber = ValidatorGenerator(value => isNaN(Number(value)), Errors.IsNumber)
export const validPositive = ValidatorGenerator(value => isLessThan(0)(Number(value)), Errors.IsPositiveNumber)
export const validInteger = ValidatorGenerator( value => !Number.isInteger(Number(value)), Errors.IsInteger)
export const validTimeInTheFuture = ValidatorGenerator( value => isInThePast((Number(value))), Errors.IsInFuture)
export const validEthAddress = ValidatorGenerator(isInvalidEthereumAddress, Errors.IsEthereumAddress)
export const validationValueToNumber = ValidatorTransformer(Number)






