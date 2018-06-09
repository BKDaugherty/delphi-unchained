import {withdrawStake} from '../../../services/delphi-contract/StakeActions'

const WithdrawStake = (ethAddress, stakeAddress, tokenAddress) => ({
    label: 'Withdraw the Stake',
    dialogProps: {
        title: 'Withdraw the Stake',
        description: 'Are you sure you would like to withdraw your stake?',
        onSubmit: withdrawStake(ethAddress, stakeAddress, tokenAddress),
        formName: 'WithdrawStakeForm'
    }
})

export default WithdrawStake
