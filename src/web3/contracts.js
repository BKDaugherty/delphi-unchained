import DelphiStakeArtifact from '../artifacts/DelphiStake.json'
import web3Instance from './index'
import * as contract from 'truffle-contract'

const setupContract = (artifact) => {
    let baseContract = contract(artifact)

    // Allow for the setup of either web3js or metamask
    const provider = web3Instance.currentProvider ? web3Instance.currentProvider : web3Instance.givenProvider

    // Set the provider for the base contract
    baseContract.setProvider(provider)

    return baseContract
}

export const DelphiStake = setupContract(DelphiStakeArtifact)




