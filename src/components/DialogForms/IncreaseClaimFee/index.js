import {increaseClaimFee} from '../../../services/delphi-contract/ClaimActions'
import validateIncreaseClaimFee from './validate'

const IncreaseClaimFee = (ethAddress, stakeAddress) => ({
    label: 'Increase Claim Fee',
    dialogProps: {
        title: 'Increase Claim Fee',
        description:
      'By increasing the claim fee, you increase the chance that the arbiters will rule on the claim.',
        onSubmit: increaseClaimFee(ethAddress, stakeAddress),
        formName: 'IncreaseClaimFeeForm',
        validate: validateIncreaseClaimFee,
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

export default IncreaseClaimFee
