import React from 'react'
import NoItems from '../../../components/NoItems'
import ClaimFeed from '../../../components/ClaimFeed'
import DelphiAPI from '../../../services/delphi-backend/API'

const NoClaims = () => <NoItems title={"You don't seem to be the arbiter on any outgoing claims"}/>

class ArbiterView extends React.Component{
    state={
        claims:[]
    }

    async loadClaims(){
        const claims = await DelphiAPI.GetArbiter(this.props.userEthAddress)

        if(claims){
            this.setState({claims:claims})
        } else {
            this.setState({claims:[]})
        }
    }

    componentDidMount(){
        this.loadClaims()
    }

    render(){
        const {claims} = this.state
        return (
            (claims && claims.length > 0) ? <ClaimFeed claims={claims}/> : <NoClaims/> 
        )
    }
}


export default ArbiterView