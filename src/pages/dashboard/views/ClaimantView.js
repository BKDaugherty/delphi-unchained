/**
 * Specifies the components and pages that one will see if they are
 * signed into the Delphi platform as a claimant.
 */

import React from 'react'
import Grid from 'material-ui/Grid'
import NoItems from '../../../components/NoItems'
import StakeFeed from '../../../components/StakeFeed'
import ClaimFeed from '../../../components/ClaimFeed'
import DelphiAPI from '../../../services/delphi-backend/API'

const NoStakes = () => <NoItems title={"You don't seem to be whitelisted on any stakes"}/>
const NoClaims = () => <NoItems title={"You don't seem to have any outgoing claims"}/>

class ClaimantView extends React.Component{
    constructor(props){
        super(props)
        this.loadClaims = this.loadClaims.bind(this)
        this.loadStakes = this.loadStakes.bind(this)
    }

    state = {
        claims:[],
        stakes:[]
    }

    async loadClaims(){
        const claims = await DelphiAPI.GetClaimant(this.props.userEthAddress)
        if(claims){
            this.setState({claims})
        } else {
            this.setState({claims:[]})
        }
    }

    async loadStakes(){
        const stakes = await DelphiAPI.GetWhitelistee(this.props.userEthAddress)
        if(stakes){
            this.setState({stakes})
        } else {
            this.setState({stakes:[]})
        }
    }

    componentDidMount(){
        this.loadClaims()
        this.loadStakes()
    }

    render(){
        let {claims, stakes} = this.state
        return (
            <Grid container spacing={16}>
                <Grid item sm={6} md={6} lg={6} xl={6}>
                    {(claims && claims.length > 0) ? <ClaimFeed claims={claims}/> : <NoClaims/> }
                </Grid>
                <Grid item sm={6} md={6} lg={6} xl={6}>
                    {(stakes && stakes.length > 0) ? <StakeFeed stakes={stakes}/> : <NoStakes/> }
                </Grid>
             </Grid>
        )
    }
}


    

export default ClaimantView