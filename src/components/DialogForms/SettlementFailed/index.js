import {settlementFailed} from '../../../services/delphi-contract/ClaimActions'

const SettlementFailed = (ethAddress, stakeAddress) => ({
    label:'Fail the Settlement',
    dialogProps:{
        title:'Fail the Settlement',
        description:"By failing this settlement, you will advance directly into arbitration, and your fee will be lost.",
        onSubmit: settlementFailed(ethAddress, stakeAddress),
        formName:'SettlementFailedForm',
    },
})

export default SettlementFailed
