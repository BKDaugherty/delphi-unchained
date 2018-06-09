/**
 * Defines the functions to interact with the Delphi Factory
 * Smart Contract.
 */

import {FactoryAddressLookup} from './conf'
import {web3js} from './index'

import DelphiStakeFactoryJSON from '../../drizzle/artifacts/DelphiStakeFactory.json'
import EIP20JSON from '../../drizzle/artifacts/EIP20.json'
import {IPFS_function} from '../ipfs'

export const createDelphiStake = (ethAddress, network) => async ({
    value,
    token,
    minimumFee,
    data,
    stakeReleaseTime,
    arbiter
}) => {
    const factoryAddress = FactoryAddressLookup[network]

    // Use web3js to support batch requests
    const factoryInstance = await new web3js.eth.Contract(
        DelphiStakeFactoryJSON.abi,
        factoryAddress
    )
    const tokenInstance = await new web3js.eth.Contract(EIP20JSON.abi, token)

    const hash = await IPFS_function({ message: data })

    const DeployStake = new web3js.BatchRequest()

    DeployStake.add(
        tokenInstance.methods
            .approve(factoryAddress, value)
            .send.request({ from: ethAddress })
    )
    DeployStake.add(
        factoryInstance.methods
            .createDelphiStake(
                value,
                token,
                minimumFee,
                hash,
                stakeReleaseTime,
                arbiter
            )
            .send.request({ from: ethAddress })
    )
    DeployStake.execute()
}
