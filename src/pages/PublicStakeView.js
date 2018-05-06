import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import HomeIcon from '@material-ui/icons/Home';


// This Module defines the page that a user will
// see as a public viewer of a stake. Lets try our
// best to create reusable components to simplify 
// our work for the private stake view as well!


var state = {stakerInfo: {
        "data": {
            "staker": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
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
                "id": 0,  
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
        },
        "errors": []
      }}

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
        flexGrow: 1,
      },
    flex: {
        flex: 1,
      },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
  };

//Input: none
//Output: fomatted information on a stake  
function formatClaimInfo(){
    var arrayLength = state.stakerInfo.data.claims;
    if(arrayLength === 0){
        return ("Number of Current Claims: 0")
    }
    else{
        var i;
        for(i in arrayLength){
            return getClaimInfo(i);
        }
    }    
}  
function getClaimInfo(index) {
       var claimString = JSON.stringify(state.stakerInfo.data.claims[index]);
       var claimData = JSON.parse(claimString);
        
        return(
            <Typography color="textSecondary">
            Claim ID:  {claimData.id} <br />
            Claim Amount: {claimData.amount}<br />
            Fee: {claimData.fee}<br />
            Surplus Fee: {claimData.surplus_fee}<br />
            </Typography>    
        )
}  
  
function SimpleCard(props) {

    var claims_list = state.stakerInfo.data.claims;
    var i;

    const { classes } = props;
    const bull = <span className={classes.bullet}>•</span>;
    
    return (
        //Header Bar
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Stake View
            </Typography>
            <IconButton color="inherit" aria-label="Menu">
                <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Information for stake address: {state.stakerInfo.data.token.address}
              </Typography>
              <Typography variant="headline" component="h2">
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Stake Amount: {state.stakerInfo.data.value} <br />
                Claim Deadline: {state.stakerInfo.data.claim_deadline} <br />
                Number of Current Claims: {claims_list.length}
              </Typography>

                {formatClaimInfo()}
              
            </CardContent>
            <CardActions>
              <Button size="small">Learn More About This Staker</Button>
            </CardActions>
        </Card>
        </div>
      );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(SimpleCard);

//export default withRouter(PublicStakeView)
