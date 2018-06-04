import React from 'react'
import CardFeed from './CardFeed'
import ClaimCard from './ClaimCard'
import Grid from 'material-ui/Grid'

export default ({claims}) => (
    <CardFeed>
        {/* Claim Card should just get the address itself...*/}
        {claims.map( (claim, key) => (<Grid item key={key}> <ClaimCard claim={claim}/> </Grid>))}
    </CardFeed>
)