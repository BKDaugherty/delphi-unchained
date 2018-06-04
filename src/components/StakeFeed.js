import React from 'react'
import Grid from 'material-ui/Grid'
import CardFeed from './CardFeed'
import StakeCard from './StakeCard'

const StakeFeed = ({stakes}) => (
    <CardFeed>
        {/* Claim Card should just get the address itself...*/}
        {stakes.map( (stake, key) => (<Grid item key={key}> <StakeCard stake={stake}/> </Grid>))}
    </CardFeed>
)

export default StakeFeed