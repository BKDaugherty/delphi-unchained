/**
 * Defines common functions to Claim Card Actions 
 */

export const SupplyActionsEthInfo = actions => (ethAddress, stakeAddress) => (
    actions ? actions.map(action => action(ethAddress, stakeAddress)) : []
)

export const GenerateActionsFromMap = StateToActionsMap => state => (ethAddress, stakeAddress) => {
    const Actions = StateToActionsMap(state)
    return SupplyActionsEthInfo(Actions)(ethAddress, stakeAddress)
}