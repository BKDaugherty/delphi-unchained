import {
    validRequired,
    validPositive,
    validInteger,
    validTimeInTheFuture,
    validEthAddress,
    CombinedValidator
} from './index'

import Errors from './constants'

const Names = {
    Required:'Required',
    Positive:'Positve',
    Integer:'Integer',
    Future:'Future',
    EthAddress:'EthAddress'
}

const CreateValidator = (name, error, apply) => ({
    name,
    error,
    apply
})

const Validators = {
    Required:CreateValidator(Names.Required, Errors.IsRequired, validRequired),
    Positive:CreateValidator(Names.Positive, Errors.IsPositiveNumber, validPositive),
    Integer:CreateValidator(Names.Integer, Errors.IsInteger, validInteger),
    Future:CreateValidator(Names.Future, Errors.IsInFuture, validTimeInTheFuture),
    EthAddress:CreateValidator(Names.EthAddress, Errors.IsEthereumAddress, validEthAddress)
}

/**
 * Helpful Functions for Test Generation for correct validators
 */


const GenSuccessTest = ({validator, data}) => {
    return test(`${validator.name} Validator returns no error with correct input`, 
        TestForNoError(validator.apply, data))
}

const GenFailTest = ({validator, data}) => {
    return test(`${validator.name} Validator returns error : ${validator.error}`, 
        TestForError(validator.apply, data, validator.error))
}

const TestForError = (validator, value, errorMessage) => () => {
    expect(validator({value}).error).toBe(errorMessage)
}

const TestForNoError = (validator, value) => () => {
    expect(validator({value}).error).toBeUndefined()
}

const CreateTest = (validator, data) => ({validator, data})

// Tests

const SuccessTests = [
    CreateTest(Validators.Required, "Hello World"),
    CreateTest(Validators.Positive, 1.5),
    CreateTest(Validators.Integer, 2),
    CreateTest(Validators.Future, (Date.now() / 1000) + 10000),
    CreateTest(Validators.EthAddress, "0x9c380f3ce900cef27640bdff53661bfa10817c9c")
].map(GenSuccessTest)

const FailTests = [
    CreateTest(Validators.Required, null),
    CreateTest(Validators.Positive, -3),
    CreateTest(Validators.Integer, 1.5),
    CreateTest(Validators.Future, (Date.now() / 1000) - 10000),
    CreateTest(Validators.EthAddress, "0x9380f3ce900cef27640bdff53661bfa10817c9c")
].map(GenFailTest)
