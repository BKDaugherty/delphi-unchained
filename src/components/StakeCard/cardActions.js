// Defines the set of actions that can be done
export const stakerActions = (ethAddress, contract) => [
    {
        name:'whitelistClaimant',
        label:'Whitelist a Claimant',
        fields:[
            {
                type:'text',
                label:'Address of Claimant',
                id:'claimantAddress',
            },
            {
                type:'number',
                label:'Claim Deadline (Unix)',
                id:'claimantDeadline',
            }
    ],
        // To be displayed inside the modal...
        onSubmit: (argument) => contract.methods.whitelistClaimant(ethAddress, argument).send({from:ethAddress}),
        dialog:true,
        //Potential for icon in button???
    },
    {
        name:'increaseStake',
        label:'Increase your Stake',
        fields:[{
            type:'number',
            label:'Amount to Increase',
            id:'increaseStakeAmount',
        }],
        onSubmit: (argument) => contract.methods.increaseStake(argument).send({from:ethAddress}),
        dialog:true
    },
    {
        name:'extendStakeReleaseTime',
        label:'Extend the Stake',
        fields:[{
            type:'number',
            label:'Deadline (Unix)',
            id:'extendStake',
        }],
        onSubmit:(argument) => contract.methods.extendStakeReleaseTime(argument).send({from:ethAddress}),
        dialog:true
    },
    {
        name:'withdrawStake',
        label:'Withdraw your Stake',
        description:'Are you sure you would like to withdraw your stake?',
        onSubmit:() => contract.methods.withdrawStake().send({from:ethAddress}),
        dialog:true
    }
]

export const arbiterActions = [

]

export const claimantActions = (ethAddress, contract) => [
    {
        name:'openClaim',
        label:'Open a Claim',
        fields:[
            {
                type:'number',
                label:'Amount',
                id:'claimAmount',
            },
            {
                type:'number',
                label:'Fee',
                id:'claimFee',
            },
            {
                type:'text',
                label:'Data',
                id:'claimData'
            },
            {
                type:'checkbox',
                label:'Skip Settlement',
                id:'claimSkipSettlement'
            },
        ],
        dialog:true,
        onSubmit:(amount, fee, data, claimSkipSettlement) => {
            const method = claimSkipSettlement ? contract.methods.openClaimWithoutSettlement : contract.methods.openClaim
            return method(ethAddress, amount, fee, data).send({from:ethAddress})
        }

    }
]

export const publicActions = [{
    name:'learnMore',
    label:'Learn More About This Staker',
    onSubmit:console.log
}
]
