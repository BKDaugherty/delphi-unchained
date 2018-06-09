import {createDelphiStake} from './../../../services/delphi-contract/FactoryActions'
import validateCreateDelphiStakeForm from './validate'

const CreateStakeDialogForm = (ethAddress, factoryAddress) => ({
    title: 'Create a Stake',
    description:
    'By creating a stake on Delphi, you can show someone you are worthy of their trust.',
    onSubmit: createDelphiStake(ethAddress, factoryAddress),
    validate: validateCreateDelphiStakeForm,
    formName: 'CreateStakeForm',
    fields: [
        {
            type: 'number',
            label: 'Amount to Stake',
            name: 'value'
        },
        {
            type: 'text',
            label: 'Token Address',
            name: 'token',
            multiline: true
        },
        {
            type: 'number',
            label: 'Minimum Fee',
            name: 'minimumFee'
        },
        {
            type: 'text',
            label: 'Data',
            name: 'data',
            multiline: true
        },
        {
            type: 'number',
            label: 'Stake Release Time',
            name: 'stakeReleaseTime'
        },
        {
            type: 'text',
            label: 'Arbiter Address',
            name: 'arbiter',
            multiline: true
        }
    ]
})

export default CreateStakeDialogForm
