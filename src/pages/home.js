import React from 'react'
import {Link} from 'react-router-dom'

import delphi from '../data/delphi'
import web3 from '../web3'

class Home extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            _value:100,
            _token:"0x0000000000000000000000000000000000000000",
            _data:"0x0010000ab4dd5",
            _lockupPeriod:10000,
            _arbiter:"0x0000000000000000000000000000000000000000",
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.createAStake = this.createAStake.bind(this)
    }

    createAStake = async () => {

        const accounts = await web3.eth.getAccounts()
        const activeAccount = accounts[0]
        delphi.methods.initDelphiStake(this.state._value,
            this.state._token, this.state._data, this.state._lockupPeriod, this.state._arbiter )
        .send({
            from:activeAccount
        }, (err,res) => {
            console.log(err, res)
        })
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
        <button onClick={this.createAStake}>
            Make your stake!!
        </button>
        <br/>
        <Link to="/about">Go about</Link>
    </div>)
    }
}

export default Home