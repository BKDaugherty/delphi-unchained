import React from 'react'
import Card, {CardHeader, CardContent} from 'material-ui/Card'

const NoClaims = props => (
    <Card>
    <CardHeader align='center' title="You don't seem to be the arbiter for any ongoing claims" component='h1'/>
    <CardContent>
    </CardContent>
  </Card>
)

export default (props) => (
    (props.claims && props.claims.length > 0) ? <NoClaims/> : <NoClaims/> 
)