import {ValidateRequiredPositiveInteger} from '../validation'

export default ({increaseStakeAmount}) => {
    let errors = {}

    errors.increaseStakeAmount = ValidateRequiredPositiveInteger({value:increaseStakeAmount}).error
    // // TODO : Check if the user has enough tokens to increase the stake
    // // else if ()

    return errors

}
