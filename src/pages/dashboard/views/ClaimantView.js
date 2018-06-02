import React from 'react'
import Grid from 'material-ui/Grid'
import NoItems from '../../../components/NoItems'
import ClaimCard from '../../../components/ClaimCard'
import StakeCard from '../../../components/StakeCard'

// Hardcoded data for now
const example_stake = {
    "address":"0x6ebbc30B70D7F9D1FF7a12bFC9100Cb10392FD98",
    "staker": "0x34Bf67EFba0bb1893e7D7f8eA846034e9d93b1D0",
    "value": 100,
    "token": {
      "name": "MattCoin",
      "symbol": "MC",
      "address": "0x6ea64ae4c9bcb1998b96732f475067998705d85e"
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

const example_claim = {
    "id": 0,
    "amount": 25,
    "fee": 5,
    "surplus_fee": 0,
    "data": "QmT4AeWE9Q9EaoyLJiqaZuYQ8mJeq4ZBncjjFH9dQ9uDVA",
    "ruling": 0,
    "ruled": 0,
    "settlement_failed": 1,
    "arbiter":'0x498bad589c7acd871945ed6ca30b7bab0a977af7',
    "stake":'0x627306090abab3a6e1400e9345bc60c78a8bef57',
    "claimant":"0x34Bf67EFba0bb1893e7D7f8eA846034e9d93b1D0",
  }

const NoStakes = () => <NoItems title={"You don't seem to be whitelisted on any stakes"}/>
const NoClaims = () => <NoItems title={"You don't seem to have any outgoing claims"}/>

// Feed title and other meta info?
const CardFeed = (props) => (
    <Grid container direction={'column'} spacing={16}>
        {props.children}
    </Grid>
)

// With Address decorator on claim cards?
const ClaimFeed = ({claims}) => (
    <CardFeed>
        {/* Claim Card should just get the address itself...*/}
        {claims.map( (claim, key) => (<Grid item key={key}> <ClaimCard claim={claim}/> </Grid>))}
    </CardFeed>
)

const StakeFeed = ({stakes}) => (
    <CardFeed>
        {/* Claim Card should just get the address itself...*/}
        {stakes.map( (stake, key) => (<Grid item key={key}> <StakeCard stake={stake}/> </Grid>))}
    </CardFeed>
)

class ClaimantView extends React.Component{
    render(){
        let {claims, stakes, userEthAddress} = this.props

        claims = [example_claim, example_claim]
        // stakes = [example_stake, example_stake]

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