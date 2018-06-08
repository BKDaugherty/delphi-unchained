import React from 'react'
import Button from 'material-ui/Button'
import Dialog, {DialogActions,DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import {Checkbox, TextField } from 'redux-form-material-ui'

const ContractMethodInputField = ({type, menu_options, ...rest}) => {

    // Set the component to be used by the Field
    let fieldComponent;
    if(type === 'checkbox') fieldComponent = Checkbox
    else if (type === 'select-field') {
        return (
        <Field component='select' {...rest}>
            {menu_options.map( (item, key) => <option key={key} value={item.value}>{item.label}</option>)}
        </Field>
        )

    }
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

    submit = values => {
        // console.log(values)
        this.props.ContentComponentProps.onSubmit({...values})
        this.handleClose()
    }

    render = () => {
        const DialogContentComponent = this.props.DialogContentComponent
        const ContentComponentProps = this.props.ContentComponentProps
        const ButtonComponent = this.props.ButtonComponent
        return (
        <div>
            {ButtonComponent ? <ButtonComponent onClick={this.handleOpen}/> : <Button variant='raised' color='primary' onClick={this.handleOpen}>{this.props.label}</Button>}
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}>
                {<DialogContentComponent {...ContentComponentProps} onSubmit={this.submit.bind(this)}
                 handleClose={this.handleClose} />}
            </Dialog>
        </div> )
    }
}

DialogButton.propTypes = {
    label:PropTypes.string,
    DialogContentComponent:PropTypes.func,
    ContentComponentProps:PropTypes.object,
    ButtonComponent:PropTypes.func
}

const DialogForm = (props) => (
    <DialogButton 
        label={props.label}
        DialogContentComponent={reduxForm({form:props.dialogProps.formName, validate:props.dialogProps.validate})(ContractDialogMethodForm)}
        ContentComponentProps={props.dialogProps}
        ButtonComponent={props.ButtonComponent}
    />
)

DialogForm.propTypes = {
    label:PropTypes.string,
    dialogProps:PropTypes.shape({
        title:PropTypes.string,
        description:PropTypes.string,
        handleSubmit:PropTypes.func,
        validate:PropTypes.func,
        fields:PropTypes.array,
        formName:PropTypes.string
    })
}

export default DialogForm