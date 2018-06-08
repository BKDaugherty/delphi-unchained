/**
 * Specifies the actions that a whitelistee can take on
 * a stake card
 */

import OpenClaim from '../../DialogForms/OpenClaim';

const ApplyEthAddresses = (actions) => (ethAddress, stakeAddress, tokenAddress) => actions.map(action => action(ethAddress, stakeAddress, tokenAddress))

const WhitelisteeActions = [OpenClaim]

export default ApplyEthAddresses(WhitelisteeActions)