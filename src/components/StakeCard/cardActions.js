// Defines the set of actions that can be done


// This really makes me feel like there is a better way...
// Need to add in other contracts as well...

// Staker Actions

const whitelistClaimant = (ethAddress, contract) => ({claimantAddress, claimantDeadline}) => {
    return contract.methods.whitelistClaimant(claimantAddress, claimantDeadline).send({from:ethAddress})
}

const increaseStake = (ethAddress, contract) => (amount) => {
    return contract.methods.increaseStake(amount).send({from:ethAddress})
}

const extendStakeReleaseTime = (ethAddress, contract) => (stakeReleaseTime) => {
    return contract.methods.extendStakeReleaseTime(stakeReleaseTime).send({from:ethAddress})
}

const withdrawStake = (ethAddress, contract) => () => {
    return contract.methods.withdrawStake().send({from:ethAddress})
}

// Claimant Actions

const openClaim = (ethAddress, contract) => (amount, fee, data, claimSkipSettlement) => {
    const method = claimSkipSettlement ? contract.methods.openClaimWithoutSettlement : contract.methods.openClaim
    return method(ethAddress, amount, fee, data).send({from:ethAddress})
}


export const stakerActions = (ethAddress, contracts) =>[
    {
        label:"Whitelist a Claimant", // Label of shown button
        dialogProps:{
            title:'whitelistClaimant',
            description:'By whitelisting a claimant, you can allow someone to make a claim on your stake.',
            onSubmit: whitelistClaimant(ethAddress, contracts.DelphiStake),
            formName:"WhitelistClaimantForm",
            fields:[{
                type:'text',
                label:'Address of Claimant',
                name:'claimantAddress',
                multiline:true,
            },
            {
                type:'number',
                label:'Claim Deadline (Unix)',
                name:'claimantDeadline',
            }]
        }
    },            
    {
        label:"Increase Stake Amount",
        dialogProps:{
            title:'Increase the Staked Amount',
            description:'Increase the amount of funds in the stake.',
            onSubmit: increaseStake(ethAddress, contracts),
            formName:'IncreaseStakeForm',
            fields:[{
                type:'number',
                label:'Amount to Increase',
                name:'increaseStakeAmount'
            }]
        }
    },
    {
        label:'Extend the Stake',
        dialogProps:{
            title:'Extend the Stake',
            description:"Extend the stake's deadline",
            onSubmit: extendStakeReleaseTime(ethAddress, contracts.DelphiStake),
            formName:'ExtendStakeForm',
            fields:[{
                type:'number',
                label:'Deadline (Unix)',
                name:'extendStake',
            }],
            
        },
    },
    {
        label:'Withdraw the Stake',
        dialogProps:{
            title:'Withdraw the Stake',
            description:'Are you sure you would like to withdraw your stake?',
            onSubmit:withdrawStake(ethAddress, contracts),
            formName:'WithdrawStakeForm',
        }
    }
]

export const arbiterActions = [

]

export const claimantActions = (ethAddress, contracts) => [
    {
        label:'Open a Claim',
        dialogProps:{
            title:'Open a Claim',
            description:"Open a claim against this stake",
            formName:'OpenClaimForm',
            onSubmit:openClaim(ethAddress, contracts),
            fields:[
            {
                type:'number',
                label:'Amount',
                name:'claimAmount',
            },
            {
                type:'number',
                label:'Fee',
                name:'claimFee',
            },
            {
                type:'text',
                label:'Data',
                name:'claimData'
            },
            {
                type:'checkbox',
                label:'Skip Settlement',
                name:'claimSkipSettlement'
            },
            ],
        }
    }
]

export const publicActions = [{
    name:'learnMore',
    label:'Learn More About This Staker',
    onSubmit:console.log,
    
}
]
