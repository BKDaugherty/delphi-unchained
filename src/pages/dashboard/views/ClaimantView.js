import React from 'react'
import Card, {CardHeader, CardContent} from 'material-ui/Card'
import Typography from "material-ui/Typography";

const NoClaims = props => (
    <Card>
    <CardHeader align='center' title="You don't have any outgoing claims" component='h1'/>
    <CardContent>
    </CardContent>
  </Card>
)

export default (props) => (
    (props.claims && props.claims.length > 0) ? <NoClaims/> : <NoClaims/> 
)