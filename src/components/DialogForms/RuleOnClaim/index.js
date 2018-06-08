import {ruleOnClaim} from '../../../services/delphi-contract/ClaimActions'
import validateRuleOnClaim from './validate'
const RuleOnClaim = (ethAddress, stakeAddress) => ({
    label:'Rule on the Claim',
    dialogProps:{
        title:'Rule on the Claim',
        description:"Make a ruling on this claim",
        onSubmit: ruleOnClaim(ethAddress, stakeAddress),
        formName:'RuleOnClaimForm',
        validate:validateRuleOnClaim,  
        fields:[
            {
                type:'select',
                label:'Ruling',
                name:'ruling',
                menu_options:[
                    {value:0, label:'Justified'},
                    {value:1, label:'Not Justified'},
                    {value:2, label:'Collusive'},
                    {value:3, label:'Inconclusive'}
                ]
            },
            {
                type:'number',
                label:'Claim ID',
                name:'claimId'
            }
        ]      
    },
})
export default RuleOnClaim

