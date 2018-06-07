/**
 * Defines the functions to interact with the Delphi Factory
 */
import {DelphiStakeFactory, EIP20} from './index'
import {FactoryAddressLookup} from './conf'


export const createDelphiStake = (ethAddress, network) => async ({value, token, minimumFee, data, stakeReleaseTime, arbiter}) => {
    const factoryAddress = FactoryAddressLookup(network)
    const factory = await DelphiStakeFactory.at(factoryAddress)
    const tokenInstance = await EIP20.at(token)
    const tokenResult = await tokenInstance.approve(factoryAddress, value, {from:ethAddress})
    const result = factory.createDelphiStake(value,token,minimumFee,data, stakeReleaseTime,arbiter, {from:ethAddress})
    return result
}