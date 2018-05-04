# Front End Design Conventions

When developing in JavaScript, there are a lot of ways to do things. Here, we attempt to list out 
some of the ways we decided to do them.

## Terminology

### Redux Explained
![alt text](https://camo.githubusercontent.com/9de527b9432cc9244dc600875b46b43311918b59/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343739302f415243482d5265647578322d657874656e6465642d7265616c2d6465636c657261746976652e676966 "Logo Title Text 1")

This is one of the better diagrams I've found for Redux. Here we can kind of see how data flows through the app.
Events are handled by the view, which dispatch actions. These actions are sent through our redux-thunk middleware and can call services. The results of these services are handled by other actions, and eventually are sent to our reducers, which mutate the global store. The view then rerenders only the state that is necessary.

### Container vs Component

Check out this (https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0 "article") if you haven't already by the creator of redux. He makes a distinction between presentational, and container components. Brendon has in the past called these containers vs components, but we will stick to Dan Abramov's terminology from here on out. 
 
TLDR: A presentational component doesn't know about state. It is simply concerned with how things look, and has no dependency on the app. Containers on the other hand, supply state to the components and are sort of like glue code.

### Binding this

See this (https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56 "article") for details. 

We've chosen here to use method 4 discussed. Thus, when handling this in a stateful component, 
bind this using the constructor of the class, then, you can use it in the required method.

`   
constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
`