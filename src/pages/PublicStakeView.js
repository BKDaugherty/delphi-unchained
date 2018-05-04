import React from 'react'
import { withRouter } from 'react-router'

// This Module defines the page that a user will
// see as a public viewer of a stake. Lets try our
// best to create reusable components to simplify 
// our work for the private stake view as well!

class PublicStakeView extends React.Component {
    render(){
        const {match} = this.props
        return <div><h2>{match.params.address}</h2></div>
    }
}

export default PublicStakeView