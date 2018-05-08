# Front End Design Conventions and Support Document

When developing in JavaScript, there are a lot of ways to do things. Here, we attempt to list out 
some of the ways we decided to do them.

**Markdown Document Convention**: Please use a linter for markdown.

## General JavaScript

### NO SEMICOLONS

It is very rare in JavaScript to actually need semi-colons. I personally am not a fan of the
semi-colon, and would prefer not to use them at all. If you see one, yell at me. 

### Function Definitions

There are far too many ways to define functions in JavaScript. I tend to prefer the following

* In a class

    ```javascript
    class PublicStakeView extends React.Component {
        constructor(props){
            super(props)    
            this.render = this.render.bind(this)
            this.getData = this.getData.bind(this)
        }
    }
    ```
* In general

    ```javascript
    const addTwoNums = (x,y) => (x + y)
    const doSomethingComplicated = oneArgument => {
        const intermediantResult = oneArgument + 5
        return intermediantResult
    }
    ```

### Avoid Iteration

When possible, don't iterate through a list. Instead use [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) or [foreach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)!

As an example, instead of this:

```javascript
const ClaimsView = ({claims}) => {
    for(claim in claims)
        return <ClaimView key={someUniqueValue} claim={claim}/>
}
```

Do this:
```javascript
const ClaimsView = ({claims}) => claims.map(claim => <ClaimView key={someUniqueValue} claim={claim}/>)
```




## React

### Binding this

See this [article](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56) for details.

We've chosen here to use method 4 discussed. Thus, when handling this in a stateful component, bind this using the constructor of the class, then, you can use it in the required method.

```javascript 
constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
```


### Container vs Component

Check out this [article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). if you haven't already by the creator of redux. He makes a distinction between presentational and container components. Brandon has in the past called these containers vs components, but we will stick to Dan Abramov's terminology from here on out.
 
TLDR: A presentational component doesn't know about state. It is simply concerned with how things look, and has no dependency on the app. Containers on the other hand, supply state to the components and are sort of like glue code.

### Functions vs Components

Try to make every rendering function a component!

Instead of this

```javascript 
function ClaimView(claim){
    return (
        <Typography color="textSecondary">
            Claim ID:  {claim.id} <br />
            Claim Amount: {claim.amount}<br />
            Fee: {claim.fee}<br />
            Surplus Fee: {claim.surplus_fee}<br />
        </Typography>
    )
}
```

Write this.

```javascript
const ClaimView = ({claim}) => (

    <Typography color="textSecondary">
        Claim ID:  {claim.id} <br />
        Claim Amount: {claim.amount}<br />
        Fee: {claim.fee}<br />
        Surplus Fee: {claim.surplus_fee}<br />
    </Typography>
)
```

### PropTypes

Always use PropTypes!!! It saves our time like crazy!!! Good job Gwen for starting this off. Check the [npm Package](https://www.npmjs.com/package/prop-types) out.

### props.key

When rendering multiple versions of the same component, React asks you to add a key prop to improve optimization.

Instead of this: 

```javascript
const ClaimsView = ({claims}) => claims.map(claim => <ClaimView claim={claim}/>)
```

Do this: 

```javascript
const ClaimsView = ({claims}) => claims.map(claim => <ClaimView key={someUniqueValue} claim={claim}/>)
```

## Redux

### General Overview

![alt text](https://camo.githubusercontent.com/9de527b9432cc9244dc600875b46b43311918b59/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343739302f415243482d5265647578322d657874656e6465642d7265616c2d6465636c657261746976652e676966 "Logo Title Text 1")

This is one of the better diagrams I've found for Redux. Here we can kind of see how data flows through the app.
Events are handled by the view, which dispatch actions. These actions are sent through our redux-thunk middleware and can call services. The results of these services are handled by other actions, and eventually are sent to our reducers, which mutate the global store. The view then rerenders only the state that is necessary.
