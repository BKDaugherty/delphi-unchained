import React from 'react'
import StakeCard from '../../../components/StakeCard'
import Typography from 'material-ui/Typography'

const styles = {
    card: {
        minWidth: 275,
        //maxWidth: 500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        fontSize: 17,
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 18,
        color: 'black',
    },
    pos: {
        marginBottom: 10,
    },
    root: {
        display:'flex',
        flexDirection:'row',
        marginTop:60,
        flexGrow: 1,
        },
    flex: {
        flex: 1,
        },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        },
}

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

export default (props) => (
    <div>
      <Typography variant='headline' component='h2'>
          Staker View
      </Typography>
      <StakeCard classes={styles} stake={stake}/>
    </div>
)