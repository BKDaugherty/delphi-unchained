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
    },
})
export default RuleOnClaim

