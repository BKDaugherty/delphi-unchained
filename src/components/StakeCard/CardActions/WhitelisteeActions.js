/**
 * Specifies the actions that a whitelistee can take on
 * a stake card
 */

import {openClaim} from '../../../services/delphi-contract/StakeActions'
import {validateOpenClaim} from './WhitelisteeCardFormValidation'

const WhitelisteeActions = (ethAddress, stakeAddress) => [
    {
        label:'Open a Claim',
        dialogProps:{
            title:'Open a Claim',
            description:"Open a claim against this stake",
            formName:'OpenClaimForm',
            onSubmit:openClaim(ethAddress, stakeAddress),
            validate:validateOpenClaim,
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

export default WhitelisteeActions