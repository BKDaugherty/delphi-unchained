/**
 * Takes an array of cards as its child, and produces a scrollable feed
 */

import React from 'react'
import Grid from 'material-ui/Grid'

const CardFeed = props => (
    <Grid container wrap="nowrap" direction={'column'} spacing={16}>
        {props.children}
    </Grid>
)

export default CardFeed
