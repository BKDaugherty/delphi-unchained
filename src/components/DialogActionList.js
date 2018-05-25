import React from 'react'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import DialogForm from './DialogForm'

const DialogActionList = ({actions}) => (
    <Grid container spacing={16}>
        {actions ? 
            actions.map(
                (action, key) => (
                    <Grid item key={key}> 
                        { action.dialogProps ? 
                        <DialogForm {...action}/> 
                        : <Button {...action}>{action.label}</Button> 
                        } 
                    </Grid> )
            ) 
        : null }
    </Grid>
)

export default DialogActionList