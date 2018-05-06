import React from 'react'
import Button from 'material-ui/Button'
// This Module defines the page that a user will
// see as a public viewer of a stake. Lets try our
// best to create reusable components to simplify 
// our work for the private stake view as well!

import {GetStakeInfoAtAddress} from '../services/delphi-backend'

class PublicStakeView extends React.Component {
    constructor(props){
        super(props)    
        this.render = this.render.bind(this)
        this.getData = this.getData.bind(this)
    }


    getData(address){
        const result = GetStakeInfoAtAddress(address)
        console.log(result)
    }

    render(){
        const {match} = this.props
        return <div><h2>{match.params.address}
            <Button raised onClick={() => this.getData(match.params.address)}>
                Load Info
            </Button>
        </h2></div>
    }
}

export default PublicStakeView