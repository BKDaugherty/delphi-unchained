import React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {DialogActions,DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox';
import {InputLabel} from 'material-ui/Input'

// Clean this component up!!! This will be essential for development!!!

class GeneralActionForm extends React.Component{
        state = this.props.fields? {
            // State to tell if the action form is open
            open:false,
            // Maps the 
            ...this.props.fields.map(val => ({[val.id]:val.initialState}))
                .reduce((acc, x) => {
                    for (const key in x) acc[key] = x[key];
                    return acc;
            }, {})   
        } :  {open:false}

        // Called when the intial button is pressed
        handleClickOpen = () => {
            this.setState({open:true})
        }
    
        // Called to close 
        handleClose = () => {
            this.setState({open:false})
        }

        // Called to change state of fields
        handleChange = name => event => {
            this.setState({
                [name]: event.target.value
            })
        }

        // Calls the passed in submission function for the form
        // and passes all arguments held in state
        onSubmit(){
            const {open, ...rest } = this.state
            const paramsObject = {...rest}
            const params = Object.values(paramsObject)

            // The function passed in should register its own callbacks to better catch
            // errors and handle data. Here we have added these for debugging

            this.props.onSubmit(...params).then(console.log).catch(console.error)
        }

        render(){
            return (
                <div>
                <Button variant='raised' color='primary' onClick={this.handleClickOpen}>{this.props.label}</Button>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">{this.props.label}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.description}
                        </DialogContentText>

                        {this.props.fields ? <Grid container spacing={16} direction='row' alignItems='center'>
                                                {this.props.fields.map(value => (
                                                <Grid item key={`dialog-grid-${value.id}`}>
                                                    {value.type === "checkbox" ? 
                                                    <InputLabel>
                                                        {value.label}
                                                        <Checkbox
                                                        key={`dialog-field-${value.id}`}
                                                        label={value.label}
                                                        id={value.id}
                                                        checked={this.state[value.id]}
                                                        onChange={() => this.setState({[value.id]:!this.state[value.id]})}
                                                        margin='normal'
                                                    />
                                                    </InputLabel>
                                                    
                                                    :
                                                    <TextField
                                                            key={`dialog-field-${value.id}`}
                                                            type={value.type}
                                                            multiline={value.type === 'text'}
                                                            label={value.label}
                                                            id={value.id}
                                                            value={this.state[value.id]}
                                                            onChange={this.handleChange(value.id)}
                                                            margin="normal"
                                                        />}
                                                </Grid>))}
                                            </Grid> : null}
                    </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => {this.onSubmit()
                                                    this.handleClose()}} 
                                                    color="primary">
                                Send
                            </Button>
                        </DialogActions>
                </Dialog>
        </div>)
    }
}

GeneralActionForm.propTypes = {
    open:PropTypes.bool.isRequired,
    fields:PropTypes.object,
}

export default GeneralActionForm