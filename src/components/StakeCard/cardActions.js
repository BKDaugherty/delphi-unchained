// Defines the set of actions that can be done
export const stakerActions = ({ethAddress, contract}) => [
    {
        name:'whitelistClaimant',
        label:'Whitelist a Claimant',
        fields:[{
            type:'text',
            label:'Address of Claimant',
            id:'claimantAddress',
            initialState:'0xf17f52151EbEF6C7334FAD080c5704D77216b732'
        }],
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
            initialState:0,
        }],
        onSubmit: (argument) => contract.methods.increaseStake(argument).send({from:ethAddress}),
        dialog:true
    },
    {
        name:'extendStakeReleaseTime',
        label:'Extend the Stake',
        fields:[{
            type:'time',
            label:'Unix Time Deadline',
            id:'extendStake',
            initialState:0,
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

export const claimantActions = [

]

export const publicActions = [{
    name:'learnMore',
    label:'Learn More About This Staker',
    onSubmit:console.log
}
]
