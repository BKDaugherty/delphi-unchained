import React from 'react'
import Card, {CardHeader,CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const NoItems = ({title, text}) => (
    <Card>
        <CardHeader align='center' title={title} component='h1'/>
        <CardContent>
            {text ? <Typography align='center'>{text}</Typography> : null}
        </CardContent>
    </Card>
)


export default NoItems