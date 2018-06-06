/* 
    Defines the actions that a staker can perform on the
    staker card. Used to generate the dialog forms on the card.
*/

import ExtendStake from '../../DialogForms/ExtendStake'
import IncreaseStakeAmount from '../../DialogForms/IncreaseStakeAmount'
import WhitelistClaimant from '../../DialogForms/WhitelistClaimant'
import WithdrawStake from '../../DialogForms/WithdrawStake'


const ApplyEthAddresses = (actions) => (ethAddress, stakeAddress, tokenAddress) => actions.map(action => action(ethAddress,stakeAddress,tokenAddress))

const StakerActions = [
    ExtendStake,
    IncreaseStakeAmount,
    WhitelistClaimant,
    WithdrawStake
]

export default ApplyEthAddresses(StakerActions)