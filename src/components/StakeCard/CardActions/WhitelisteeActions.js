/**
 * Specifies the actions that a whitelistee can take on
 * a stake card
 */

import OpenClaim from '../../DialogForms/OpenClaim';

const ApplyEthAddresses = (actions) => (ethAddress, stakeAddress) => actions.map(action => action(ethAddress, stakeAddress))

const WhitelisteeActions = [OpenClaim]

export default ApplyEthAddresses(WhitelisteeActions)