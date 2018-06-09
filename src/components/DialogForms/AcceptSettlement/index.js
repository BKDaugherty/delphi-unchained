import {acceptSettlement} from './../../../services/delphi-contract/ClaimActions'

const AcceptSettlement = (ethAddress, stakeAddress) => ({
    label: 'Accept Settlement',
    dialogProps: {
        title: 'Accepting the Settlement',
        description:
      'By accepting this settlement, you will not move into arbitration, and your fee will be returned.',
        onSubmit: acceptSettlement(ethAddress, stakeAddress),
        formName: 'AcceptSettlementForm'
    }
})

export default AcceptSettlement
