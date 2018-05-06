import React from 'react'
import {Link} from 'react-router-dom'
import web3 from '../web3/index.js'

import { withStyles } from 'material-ui/styles';

import {connect} from 'react-redux'

// Import Material UI Components
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

import AppHeader from '../components/AppHeader'

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
});

class Home extends React.Component {

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleStakeSearchSubmit = this.handleStakeSearchSubmit.bind(this)
    }

    // State of this component. When submitted, it will be sent as a route param
    state = {
        stakeAddress:"0x00000000000000000000000000000000"
    }

    // Called when our text input is changed
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    // Called when the search button is pressed
    handleStakeSearchSubmit = () => {
        // Dispatch navigation
        const {history} = this.props
        history.push(`/stake/${this.state.stakeAddress}`)
    }

    // Called when the home button is pressed
    handleHomeButtonPress = () => {
    }

    render(){
        // Extract the style from withStyles wrapper
        const {classes, ethAddress} = this.props

        return (
        <div>
            <AppHeader ethAddress={ethAddress}/>
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
                onClick={() => this.handleStakeSearchSubmit()}>
                GO!
                </Button>
            </Paper>
            
        </div>
    )
    }

}

// This function takes the global state, and maps the portion we want into 
// our props
const mapStateToProps = (state) => ({ ethAddress: state.web3.ethAddress})

export default connect(mapStateToProps)(withStyles(styles)(Home))