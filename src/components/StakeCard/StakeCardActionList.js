import React from 'react'
import DialogForm from '../DialogForm'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'

const StakeCardAction = (props) => {
    const {dialog, label, onSubmit} = props
    return ( 
            dialog ? (<DialogForm {...props}/>) 
                : <Button onClick={onSubmit}><Typography>{label}</Typography></Button>
    )
}

const StakeCardActionList = ({actions}) => <Grid container direction='row' spacing={16}>{(actions.map((prop,key) => (<Grid item key={key}><StakeCardAction key={key} {...prop}/></Grid>)))}</Grid>


export default StakeCardActionList
