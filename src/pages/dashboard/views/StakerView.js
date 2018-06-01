import React from 'react'
import Card, { CardContent, CardHeader} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import AddIcon from '@material-ui/icons/Add'
import Button from 'material-ui/Button'
import DialogForm from '../../../components/DialogForm'
import { withStyles } from 'material-ui'
import {DelphiStakeFactory, EIP20} from '../../../services/delphi-contract'
import {FACTORYADDRESS} from '../../../services/delphi-contract/conf'
import {createDelphiStake} from './../../../services/delphi-contract/FactoryActions'

import {
  validEthAddress, 
  validInteger, 
  validNumber, 
  validPositive, 
  validTimeInTheFuture,
  validRequired,
  CombinedValidator,
} from './../../../util/validation'

const ValidateRequiredAddress = CombinedValidator(validEthAddress, validRequired)
const ValidateRequiredPositiveInteger = CombinedValidator(validRequired, validNumber, validPositive, validInteger)
const ValidateRequiredPositiveNumber = CombinedValidator(validRequired, validNumber, validPositive)
const ValidateRequiredTimeInFuture = CombinedValidator(validRequired, validNumber, validInteger, validTimeInTheFuture )

const validateCreateDelphiStakeForm = ({value, token, minimumFee, data, stakeReleaseTime, arbiter}) => ({
    value:ValidateRequiredPositiveNumber({value:value}).error,
    token:ValidateRequiredPositiveNumber({value:token}).error,
    minimumFee:ValidateRequiredPositiveNumber({value:minimumFee}).error,
    data:validRequired({value:data}).error,
    stakeReleaseTime:ValidateRequiredTimeInFuture({value:stakeReleaseTime}).error,
    arbiter:ValidateRequiredAddress({value:arbiter}).error
  })    


const AddButton = props => (
  <Button {...props} variant='fab' color='primary' aria-label='add' className={props.classes.absoluteButton}>
    <AddIcon/>
  </Button>
)

const styles = {
  absoluteButton:{
    position:'absolute',
    right:20,
    bottom:20
  }
}
const StyledAddButton = withStyles(styles)(AddButton)

const validateCreateDelphiStake = ({})

const CreateStakeDialogForm = (ethAddress, factoryAddress) => ({
    title:'Create a Stake',
    description:'By creating a stake on Delphi, you can show someone you are worthy of their trust.',
    onSubmit: createDelphiStake(ethAddress, factoryAddress),
    validate: validateCreateDelphiStakeForm,
    formName:"CreateStakeForm",
    fields:[{
        type:'number',
        label:'Amount to Stake',
        name:'value',
    },
    {
      type:'text',
      label:'Token Address',
      name:'token',
      multiline:true,
  },
  {
    type:'number',
    label:'Minimum Fee',
    name:'minimumFee',
  },
  {
    type:'text',
    label:'Data',
    name:'data',
    multiline:true,
  },
  {
    type:'number',
    label:'Stake Release Time',
    name:'stakeReleaseTime',
  },
  {
    type:'text',
    label:'Arbiter Address',
    name:'arbiter',
    multiline:true,
  }]
  }
)

const NoStakesView = (props) => (
  <Card>
    <CardHeader align='center' title="You don't have anything staked" component='h1'/>
    <CardContent>
      <Typography align='center'>To gain the trust of others, you can create a stake by pressing the button in the bottom right corner of the screen.</Typography>
    </CardContent>
  </Card>
)

const StakesDisplay = ({stakes}) => (<div/>)

class StakerView extends React.Component{
  state = {
    stakes:[]
  }

  getStakes(){
    // this.setState({stakes:[stake,stake,stake]})
  }

  render = () => {
    const addAction = CreateStakeDialogForm(this.props.userEthAddress, FACTORYADDRESS)
    return (<div>
      {this.state.stakes.length === 0? <NoStakesView/> : <StakesDisplay stakes={this.state.stakes}/>}
      <DialogForm ButtonComponent={StyledAddButton} dialogProps={addAction} />
    </div>)
  }
}

const StyledStakerView = (StakerView)

export default StyledStakerView