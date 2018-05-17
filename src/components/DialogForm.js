import React from 'react'
import Button from 'material-ui/Button'
import Dialog, {DialogActions,DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import {Checkbox, TextField} from 'redux-form-material-ui'

const ContractMethodInputField = ({type, ...rest}) => {

    // Set the component to be used by the Field
    let fieldComponent;
    if(type === 'checkbox') fieldComponent = Checkbox
    else fieldComponent = TextField
    return (<Field component={fieldComponent} type={type} {...rest}/>)
}

ContractMethodInputField.propTypes = {
    name:PropTypes.string,
    label:PropTypes.string,
    type:PropTypes.string,
    // Necessary?
    multiline:PropTypes.bool,
    rows:PropTypes.number,
    placeholder:PropTypes.string,
}

const ContractDialogMethodForm = ({title, description, handleSubmit, handleClose, pristine, reset, submitting, fields}) => (
    <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
        {/* Gives an explanation of what is going on in this dialog's function*/}
        <DialogContentText>{description}</DialogContentText>

        {/* Each field is mapped to a contract method input field with a grid for nice formatting*/}
        {fields ? 
            <Grid container spacing={16} direction='row' alignItems='center'>
            {fields.map((field, key) => ( 
                <Grid item key={key}> 
                    <ContractMethodInputField {...field}/> 
                </Grid> ))}
            </Grid>
            : null 
        }
        </DialogContent>
        <DialogActions>
            {fields ? <Button color="secondary" onClick={reset} disabled={fields && (pristine || submitting)}>Reset</Button> : null }
            <Button color="primary" onClick={handleClose}>Cancel</Button>
            <Button color="primary" disabled={fields && (pristine || submitting)} onClick={handleSubmit}>Send</Button>
        </DialogActions>
    </form>
)

class DialogButton extends React.Component{
    
    constructor(props){
        super(props)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }

    state = {open:false}
    
    // Closes the dialog
    handleClose = () => {
        this.setState({open:false})
    }
    // Opens the dialog
    handleOpen = () => {
        this.setState({open:true})
    }

    render = () => {
        const DialogContentComponent = this.props.DialogContentComponent
        const ContentComponentProps = this.props.ContentComponentProps

        return (
        <div>
            <Button variant='raised' color='primary' onClick={this.handleOpen}>{this.props.label}</Button>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}>
                {<DialogContentComponent onSubmit={
                    values => {
                        this.props.dialogProps.onSubmit(values)
                        this.handleClose()
                    }
                } handleClose={this.handleClose} {...ContentComponentProps}/>}
            </Dialog>
        </div> )
    }
}

DialogButton.propTypes = {
    label:PropTypes.string,
    DialogContentComponent:PropTypes.func,
    ContentComponentProps:PropTypes.object,
}

const DialogForm = (props) => (
    <DialogButton 
        label={props.label}
        DialogContentComponent={reduxForm({form:props.dialogProps.formName})(ContractDialogMethodForm)}
        ContentComponentProps={props.dialogProps}
    />
)

DialogForm.propTypes = {
    label:PropTypes.string,
    dialogProps:PropTypes.shape({
        title:PropTypes.string,
        description:PropTypes.string,
        handleSubmit:PropTypes.func,
        fields:PropTypes.array,
        formName:PropTypes.string
    })
}

export default DialogForm