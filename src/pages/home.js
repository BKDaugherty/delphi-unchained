import React from 'react'
// import web3 from '../web3/index.js'

import { withStyles } from 'material-ui/styles';
import {drizzleConnect} from 'drizzle-react'

// Import Material UI Components
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Paper  from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid'

import AppHeader from '../components/AppHeader'

const styles = theme => ({
    root: theme.mixins.gutters({
      marginTop: theme.spacing.unit * 20,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'space-around'
    }),
    container: {
        display: 'flex',
        flexDirection:'column',
        flex:1,
        padding:10,
        margin:20,
    },
    fieldContainer:{
        paddingLeft:theme.spacing.unit * 2,
        paddingRight:theme.spacing.unit * 2
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        alignSelf:'center',
    },
    button:{
        alignSelf:'center',
    },
    basePage:{
        flexGrow:1,
        marginTop: theme.spacing.unit * 20,
        flexDirection:'column'

    }
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
        <div className={classes.basePage}>
            <AppHeader ethAddress={ethAddress}/>
            <Grid justify='center' direction='column' alignItems='center' container spacing={24}>
                <Grid item>
                <Typography variant="headline" component="h3">
                    Delphi Stake Explorer
                </Typography>
                </Grid>
                <Grid item zeroMinWidth>
                    <Paper className={classes.fieldContainer} elevation={4}>
                        <TextField
                                multiline
                                id="stakeAddress"
                                className={classes.textField}
                                value={this.state.stakeAddress}
                                onChange={this.handleChange('stakeAddress')}
                                margin="normal"
                                />
                    </Paper>
                </Grid>
                <Grid item>
                    <Button className={classes.button} 
                        variant="raised" 
                        color="primary"
                        onClick={() => this.handleStakeSearchSubmit()}>
                        Search for a Stake
                    </Button>
                </Grid>
            </Grid>                            
        </div>
    )
    }

}

// This function takes the global state, and maps the portion we want into 
// our props
const mapStateToProps = (state) => ({ ethAddress: state.accounts[0]})

export default drizzleConnect(withStyles(styles)(Home), mapStateToProps)
