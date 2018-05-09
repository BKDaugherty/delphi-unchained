import React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {DialogActions,DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'

import PropTypes from 'prop-types'

class GeneralActionForm extends React.Component{
        state = this.props.fields? {
            open:false,
            // God damn this is insane --> This is the largest flex I have ever done
            //in JS
            ...this.props.fields.map(val => ({[val.id]:val.initialState}))
                .reduce((acc, x) => {
                    for (const key in x) acc[key] = x[key];
                    return acc;
            }, {})   
        } :  {open:false}

        handleClickOpen = () => {
            this.setState({open:true})
        }
    
        handleClose = () => {
            this.setState({open:false})
        }

        handleChange = name => event => {
            this.setState({
                [name]: event.target.value
            })
        }

        // Got a lil hacky here....
        onSubmit(){
            const {open, ...rest } = this.state
            const paramsObject = {...rest}
            const params = Object.values(paramsObject)
            this.props.onSubmit(...params).then(console.log).catch(console.error)
        }

        render(){
            return (
                <div>
                <Button onClick={this.handleClickOpen}>{this.props.label}</Button>

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

                        {this.props.fields ? (this.props.fields.map(value => (<TextField
                                                            multiline={value.type === 'text'}
                                                            label={value.label}
                                                            id={value.id}
                                                            key={`dialog-field-${value.id}`}
                                                            value={this.state[value.id]}
                                                            onChange={this.handleChange(value.id)}
                                                            margin="normal"
                                                        />))) : null}
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

export default GeneralActionForm