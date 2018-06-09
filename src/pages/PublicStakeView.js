// This Module defines the page that a user will
// see as a public viewer of a stake. Lets try our
// best to create reusable components to simplify
// our work for the private stake view as well!

// Must import react in every module
import React from 'react'
// Import the pieces of Material-UI we need
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
// Import our custom components
import AppHeader from '../components/AppHeader'
import StakeCard from '../components/StakeCard'

import PropTypes from 'prop-types'

import DelphiAPI from '../services/delphi-backend/API'
import {drizzleConnect} from 'drizzle-react'

import NoItems from '../components/NoItems'

// Styles for this View
const styles = {
    title: {
        marginBottom: 16,
        fontSize: 18,
        color: 'white'
    },
    toolbar: {
        marginTop: 85
    },
    pos: {
        marginBottom: 10
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        overflowWrap: 'break-word',
        flexGrow: 1
    }
}

class PublicStakeView extends React.Component {
  state = {
      stakeInfo: null
  };

  constructor(props, context) {
      super(props)
      this.render = this.render.bind(this)
      this.getData = this.getData.bind(this)
      this.contracts = context.drizzle.contracts
  }

  componentDidMount() {
      // Get data for given stake
      this.getData(this.props.match.params.address)
  }

  async getData(address) {
      const stakeInfo = await DelphiAPI.GetStake(address)
      this.setState({ stakeInfo })
  }

  render() {
      // Extract classes from props to pass to simple card
      // Extract match from props to get the value from the store. Disabling the linter for
      // this extraction until we use it in our dispatch
      // eslint-disable-next-line
    const { match, classes, userEthAddress } = this.props;
      return (
          <div>
              <AppHeader userEthAddress={userEthAddress} />
              <div className={classes.toolbar} />
              {/* <h2>{match.params.address}</h2> */}
              {/* Conditionally render the stake*/}
              <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={16}
              >
                  <Grid item>
                      {this.state.stakeInfo ? (
                          <StakeCard
                              className={classes.root}
                              stake={this.state.stakeInfo}
                              classes={classes}
                              address={match.params.address}
                              contracts={this.contracts}
                              userEthAddress={userEthAddress}
                          />
                      ) : (
                          <NoItems
                              title={`There doesn't seem to be a stake at address ${
                                  match.params.address
                              }`}
                          />
                      )}
                  </Grid>
                  <Grid item>
                      {
                          <Button
                              variant="raised"
                              color="secondary"
                              onClick={() => this.getData(match.params.address)}
                          >
                Refresh
                          </Button>
                      }
                  </Grid>
              </Grid>
          </div>
      )
  }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    userEthAddress: state.accounts[0],
    drizzleStatus: state.drizzleStatus
})

PublicStakeView.contextTypes = {
    drizzle: PropTypes.object,
    web3: PropTypes.object
}

export default drizzleConnect(
    withStyles(styles)(PublicStakeView),
    mapStateToProps
)
