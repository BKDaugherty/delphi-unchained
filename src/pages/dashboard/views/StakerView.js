import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import Button from 'material-ui/Button'
import DialogForm from '../../../components/DialogForm'
import { withStyles } from 'material-ui'
import {FACTORYADDRESS} from '../../../services/delphi-contract/conf'

import NoItems from '../../../components/NoItems'
import StakeFeed from '../../../components/StakeFeed'
import CreateDelphiStakeForm from '../../../components/DialogForms/CreateDelphiStake'
import DelphiAPI from '../../../services/delphi-backend/API'

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


const NoStakesView = () => (<NoItems title="You don't have anything staked" text="To gain the trust of others, you can create a stake by pressing the button in the bottom right corner of the screen."/>)

class StakerView extends React.Component{
  constructor(props){
    super(props)
    this.getStakes = this.getStakes.bind(this)
    this.state = {
      stakes:[]
    }
  }

  async getStakes(){
    //TODO: WEIRD LIFECYCLE BUG?
    const stakes = await DelphiAPI.GetStaker(this.props.userEthAddress)
    if(!stakes){
      this.setState({stakes:[]})
    } else {
      this.setState({stakes})
    }
  }

  componentDidMount(){
    this.getStakes()
  }
  
  render = () => {
    
    const addAction = CreateDelphiStakeForm(this.props.userEthAddress, FACTORYADDRESS)
    return (<div>
      {this.state.stakes.length === 0? <NoStakesView/> : <StakeFeed stakes={this.state.stakes}/>}
      <DialogForm ButtonComponent={StyledAddButton} dialogProps={addAction} />
    </div>)
  }

  
}

const StyledStakerView = (StakerView)

export default StyledStakerView