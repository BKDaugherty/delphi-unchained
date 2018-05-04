import React from 'react'
import {Link} from 'react-router-dom'

import web3 from '../web3/index.js'
import {DelphiStake} from '../web3/contracts'

class Home extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            _value:100,
            _token:"0x0000000000000000000000000000000000000000",
            _data:"0x0010000ab4dd5",
            _lockupPeriod:10000,
            _arbiter:"0x0000000000000000000000000000000000000001",
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.initStake = this.initStake.bind(this)
        this.deployAStake = this.deployAStake.bind(this)
    }

    deployAStake = async () => {
        const accounts = await web3.eth.getAccounts()

        // Get the eth address of the current user
        const activeAccount = accounts[0]

        console.log("Deploying stake")

        // Create a Delphi Stake instance and deploy it --> New vs deployed? probably just need to use deployed
        const stakeContract = await DelphiStake.new({from:activeAccount})

        // Log the created contract instance --> This should be stored in the
        // User's store!
        console.log("Contract")
        console.log(stakeContract)

        return stakeContract
    }

    initStake = async () => {
        // Deploy a new instance
        const stakeContract = await this.deployAStake()

        stakeContract.initDelphiStake()

        // Call a method on the deployed instance! 
        stakeContract.claimableStake().then(result => {
            console.log("Claimable Stake:", result)
        })

        stakeContract.initDelphiStake()

        // Should call stakeContract.initDelphiStake here, but I haven't gotten it to work yet!


    }



    handleInputChange = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({[name]:value})
    }
    
    render(){
    return ( 
    <div>
        <h1>Create a Stake!</h1>
        <form>
            <label>
                Amount:
                <input 
                 name="_value"
                 type="number" 
                 value={this.state._value}
                 onChange={this.handleInputChange}/>
            </label>
            <br/>
            <label>
                Token:
                <input 
                 name="_token"
                 type="text" 
                 value={this.state._token}
                 onChange={this.handleInputChange}/>
            </label>
            <br />
            <label>
                Data Hash:
                <input 
                 name="_data"
                 type="text" 
                 value={this.state._data}
                 onChange={this.handleInputChange}/>
            </label>
            <br/>
            <label>
                Lockup Period:
                <input 
                 name="_lockupPeriod"
                 type="number" 
                 value={this.state._lockupPeriod}
                 onChange={this.handleInputChange}/>
            </label>
            <br/>
            <label>
                Arbiter Address:
                <input 
                 name="_arbiter"
                 type="text" 
                 value={this.state._arbiter}
                 onChange={this.handleInputChange}/>
            </label>
        </form> 
        <button onClick={this.initStake}>
            Make your stake!!
        </button>
        <br/>
        <Link to="/about">Go about</Link>
    </div>)
    }
}

export default Home