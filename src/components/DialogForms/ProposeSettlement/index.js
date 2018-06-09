import {proposeSettlement} from '../../../services/delphi-contract/ClaimActions'
import validateProposeSettlement from './validate'

const ProposeSettlement = (ethAddress, stakeAddress) => ({
    label: 'Propose a Settlement',
    dialogProps: {
        title: 'Propose a Settlement',
        description: 'Propose a settlement for this claim',
        onSubmit: proposeSettlement(ethAddress, stakeAddress),
        formName: 'ProposeSettlementForm',
        validate: validateProposeSettlement,
        fields: [
            {
                type: 'number',
                label: 'Id of Claim',
                name: 'claimId'
            },
            {
                type: 'number',
                label: 'Amount to increase fee',
                name: 'amount'
            }
        ]
    }
})

export default ProposeSettlement
