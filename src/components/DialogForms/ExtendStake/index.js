import {extendStakeReleaseTime} from '../../../services/delphi-contract/StakeActions'
import validateExtendStake from './validate'

const ExtendStake = (ethAddress, stakeAddress) => ({
    label: 'Extend the Stake',
    dialogProps: {
        title: 'Extend the Stake',
        description: 'Extend the stake\'s deadline',
        onSubmit: extendStakeReleaseTime(ethAddress, stakeAddress),
        formName: 'ExtendStakeForm',
        validate: validateExtendStake,
        fields: [
            {
                type: 'number',
                label: 'Deadline (Unix)',
                name: 'stakeReleaseTime'
            }
        ]
    }
})

export default ExtendStake
