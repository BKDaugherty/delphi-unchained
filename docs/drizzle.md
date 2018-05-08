# Drizzle

Drizzle is a Ethereum Dapp tool for React Applications!

Check out the formal docs here
https://github.com/trufflesuite/drizzle
http://truffleframework.com/docs/drizzle/getting-started

## Working with Drizzle

### Integration
To integrate drizzle into our application, we are using drizzle with our already
existing redux-store. To do this see these docs http://truffleframework.com/docs/drizzle/using-an-existing-redux-store

We need to utilize their redux-sagas, and their reducers to integrate them in our process.

Also, not mentioned in the docs, we still have to use our redux provider.

#### Connected Components

Drizzle provides a similar API to that of standard redux. To connect a container to
the drizzle redux store, we do something like this.
`
const mapOwnerActions = state => {
    return {
        ethAddress:state.accounts[0],
        ds:state.contracts.DelphiStake
    }
}

OwnerActions.contextTypes = {
    drizzle: PropTypes.object
}

const DrizzledOwnerActions = drizzleConnect(OwnerActions, mapOwnerActions)
`

Note that we have to extract drizzle from the context, and the public state with a classic map function. One weird thing about drizzle is that the api is a little different from that of react-redux's connect! Don't miss that!!!

In this connected component, ds shows the contract state, while drizzle.contracts.DelphiStake will provide the methods that we can call to mutate the contract.

#### Miscellaneous
* The address given by drizzle has some caps letters in it. To avoid capitilization differences when comparing strings we should probably toLowerCase them all or something like that when doing string comparisons.