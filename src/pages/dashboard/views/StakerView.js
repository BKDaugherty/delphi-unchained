import React from 'react'
import Card, { CardContent, CardHeader} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import AddIcon from '@material-ui/icons/Add'
import Button from 'material-ui/Button'
import DialogForm from '../../../components/DialogForm'
import { withStyles } from 'material-ui'
import {DelphiStakeFactory, EIP20} from '../../../services/delphi-contract'
import {FACTORYADDRESS} from '../../../services/delphi-contract/conf'

const stake = {
    "staker": "0x627306090abab3a6e1400e9345bc60c78a8bef57",
    "value": 100,
    "token": {
      "name": "DelphiCoin",
      "symbol": "DC",
      "address": "0x5ed8cee6b63b1c6afce3ad7c92f4fd7e1b8fad9f"
    },
    "minimum_fee": 5,
    "data": "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t",
    "claim_deadline": 1525417344,
    "arbiter": {
      "name": "",
      "description": "",
      "address": "0x498bad589c7acd871945ed6ca30b7bab0a977af7"
    },
    "whitelisted_claimants": [
    "0x5ed8cee6b63b1c6afce3ad7c92f4fd7e1b8fad9f",
    "0x498bad589c7acd871945ed6ca30b7bab0a977af7",
    "0x554f8e6938004575bd89cbef417aea5c18140d92"
  ],
  "claims": [
    {
      "id": 0,
      "amount": 25,
      "fee": 5,
      "surplus_fee": 0,
      "data": "QmT4AeWE9Q9EaoyLJiqaZuYQ8mJeq4ZBncjjFH9dQ9uDVA",
      "ruling": 0,
      "ruled": 0,
      "settlement_failed": 1
    },
    {
      "id": 1,
      "amount": 25,"fee": 5,
      "surplus_fee": 0,
      "data": "QmT4AeWE9Q9EaoyLJiqaZuYQ8mJeq4ZBncjjFH9dQ9uDVA",
      "ruling": 0,
      "ruled": 0,
      "settlement_failed": 1
    },
    {
      "id": 2,
      "amount": 25,
      "fee": 5,
      "surplus_fee": 0,
      "data": "QmT4AeWE9Q9EaoyLJiqaZuYQ8mJeq4ZBncjjFH9dQ9uDVA",
      "ruling": 0,
      "ruled": 0,
      "settlement_failed": 1
    },
  ],
  "settlements": [
    {
      "amount": 10,
      "staker_agrees": 0,
      "claimant_agrees": 0
    }
  ]
}

const createDelphiStake = (ethAddress, factoryAddress) => async ({value, token, minimumFee, data, stakeReleaseTime, arbiter}) => {
  const factory = await DelphiStakeFactory.at(factoryAddress)
  const tokenInstance = await EIP20.at(token)
  const tokenResult = await tokenInstance.approve(factoryAddress, value, {from:ethAddress})
  console.log(tokenResult)
  const result = factory.createDelphiStake(value,token,minimumFee,data, stakeReleaseTime,arbiter, {from:ethAddress})
  console.log(await result)
  return result
}

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

const AddButtonAction = (ethAddress, factoryAddress) => ({
    title:'Create a Stake',
    description:'By creating a stake on Delphi, you can show someone you are worthy of their trust.',
    onSubmit: createDelphiStake(ethAddress, factoryAddress),
    formName:"AddStakeForm",
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



// View class

class StakerView extends React.Component{
  state = {
    stakes:[]
  }

  getStakes(){
    this.setState({stakes:[stake,stake,stake]})
  }

  render = () => {
    const addAction = AddButtonAction(this.props.userEthAddress, FACTORYADDRESS)
    return (<div>
      {this.state.stakes.length === 0? <NoStakesView/> : <StakesDisplay stakes={this.state.stakes}/>}
      <DialogForm ButtonComponent={StyledAddButton} dialogProps={addAction} />
    </div>)
  }
}

const StyledStakerView = (StakerView)

export default StyledStakerView