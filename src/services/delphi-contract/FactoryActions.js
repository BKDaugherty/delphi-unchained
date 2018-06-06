/**
 * Defines the functions to interact with the Delphi Factory
 */
import {DelphiStakeFactory, EIP20} from './index'


export const createDelphiStake = (ethAddress, factoryAddress) => async ({value, token, minimumFee, data, stakeReleaseTime, arbiter}) => {
    const factory = await DelphiStakeFactory.at(factoryAddress)
    const tokenInstance = await EIP20.at(token)
    const tokenResult = await tokenInstance.approve(factoryAddress, value, {from:ethAddress})
    const result = factory.createDelphiStake(value,token,minimumFee,data, stakeReleaseTime,arbiter, {from:ethAddress})
    return result
}