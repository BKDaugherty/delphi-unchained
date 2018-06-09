import {whitelistClaimant} from '../../../services/delphi-contract/StakeActions'
import validateWhitelistClaimant from './validate'

const WhitelistClaimant = (ethAddress, stakeAddress, tokenAddress) => ({
    label: 'Whitelist a Claimant',
    dialogProps: {
        title: 'Whitelist a claimant',
        description:
      'By whitelisting a claimant, you can allow someone to make a claim on your stake.',
        onSubmit: whitelistClaimant(ethAddress, stakeAddress),
        formName: 'WhitelistClaimantForm',
        validate: validateWhitelistClaimant,
        fields: [
            {
                type: 'text',
                label: 'Address of Claimant',
                name: 'claimantAddress',
                multiline: true
            },
            {
                type: 'number',
                label: 'Claim Deadline (Unix)',
                name: 'claimantDeadline'
            }
        ]
    }
})

export default WhitelistClaimant
