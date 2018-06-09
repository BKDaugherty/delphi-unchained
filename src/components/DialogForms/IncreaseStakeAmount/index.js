import {increaseStakeAmount} from '../../../services/delphi-contract/StakeActions'
import validateIncreaseStakeAmount from './validate'

const IncreaseStakeAmount = (ethAddress, stakeAddress, tokenAddress) => ({
    label: 'Increase Stake Amount',
    dialogProps: {
        title: 'Increase the Staked Amount',
        description: 'Increase the amount of funds in the stake.',
        onSubmit: increaseStakeAmount(ethAddress, stakeAddress, tokenAddress),
        formName: 'IncreaseStakeForm',
        validate: validateIncreaseStakeAmount,
        fields: [
            {
                type: 'number',
                label: 'Amount to Increase',
                name: 'increaseStakeAmount'
            }
        ]
    }
})

export default IncreaseStakeAmount
