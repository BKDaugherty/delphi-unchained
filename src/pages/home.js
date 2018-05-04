import React from 'react'
import {Link} from 'react-router-dom'
import web3 from '../web3/index.js'

import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import HomeIcon from '@material-ui/icons/Home';
import IconButton from 'material-ui/IconButton';
import Paper  from 'material-ui/Paper';

import TextField from 'material-ui/TextField';

import Icon from 'material-ui/Icon';

import { withRouter } from 'react-router'



const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 8,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
    }),
    container: {
        display: 'flex',
        flexDirection:'row',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
      button:{

      }
});

class Home extends React.Component {

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.submitStakeSearch = this.submitStakeSearch.bind(this)
    }

    state = {
        stakeAddress:"0x00000000000000000000"
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    submitStakeSearch = () => {
        //Dispatch navigation
        const {history} = this.props
        history.push(`/stake/${this.state.stakeAddress}`)
    }

    render(){
        const {classes} = this.props
        return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Delphi Stake Explorer
                    </Typography>
                    <IconButton color="inherit" aria-label="Menu">
                        <HomeIcon />
                    </IconButton>
                </Toolbar>
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline" component="h3">
                        Search for your stake!
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                        id="stakeAddress"
                        label="Stake Address"
                        className={classes.textField}
                        value={this.state.stakeAddress}
                        onChange={this.handleChange('stakeAddress')}
                        margin="normal"
                        />
                    </form>
                    <Button className={classes.button} 
                    variant="raised" 
                    color="primary"
                    onClick={() => this.submitStakeSearch()}>
                    GO!
                    </Button>
                </Paper>
            </AppBar>
            
        </div>
    )
    }

}

export default withRouter(withStyles(styles)(Home))