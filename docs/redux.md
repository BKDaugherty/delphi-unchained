# Redux

## Action

### Action Creator

We do not specify individual action. Instead, we specify action creator, which is essentially a constructor of the action.

## Reducer

### A Reducer has the Same Name as the State it Manages

This rule is self-explaining. 

### Specify Default State

If the reducer receives `undefined` as the state argument, it must return what you consider to be the initial state of the application or component. Here is (again) an example from the todo app in Redux Tutorial:

```javascript
const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}
```

Because by default we want our application to show all the todo items, we specify that in the arguments. When the `state` argument is `undefined`, it will be automatically bound to `VisibilityFilters.SHOW_ALL`.

This pattern is necessary to create the initial state in idiomatic Redux. So to write Redux idiomatically, you don't specify the initial state with a separate `state` variable somewhere in the program. Instead, you specify the reducer of each state. Here, remark that every state should have its reducer. If one state does not require any reducer, which means that it will never change, then it should not be a state at all; a state here by definition can change and thus comes with a reducer to manage such change.

### Use CombineReducers

When we have a lot of states to manage, thus a lot of reducers, we will package them all together with `combineReducers`. Here is an example:

```javascript
export default combineReducers({
  todos,
  visibilityFilter
})
```

Remark that the sample code uses a ECMA2015 shorthand notation.

```javascript
{
  todos,
  visibilityFilter
}

// is a shorthand for

{
  todos: todos,
  visibilityFilter: visibilityFilter
}
```

So what does `combineReducers` return? It returns something that is often called the `rootReducer`. When it receives an action as argument, it will call every child reducer, and gather their results into a single state object, whose keys correspond to the keys of the passed reducer functions.

### Root Reducer, Store, and Initial State

If you follow all the above rules, now you have a very convenient way to create the store. The store is both the control and information center of the application. However, when you read the source code of Redux program, you often see people create the store of their application with the cryptic one-liner:

```javascript
const store = createStore(rootReducer)
```

The reducer seems to only supply the control logic. However, if the store both has the state information and control logic, how could you create the store with only a reducer?

The secret lies in the fact that a reducer by convention is named after the state it manages and specifies the initial state. So if you have the information about all the reducers, you automatically know the names and the initial values of all the states! 

The control logic of store is also very simple. When it receives an action, or in fancy jargons, when an action is dispatched, it just sends the action to the `rootReducer`, which will automatically applies the action to each reducer and returns the resulting state. The store can then update its state with the new state returned.

## Workflow

* Identify the states of the program and their initial values.
* Identify the potential ways to change the states. For each, create an action creator.
* Create a reducer for each state that changes the state according to the action.
* Combine the reducers with `combineReducers` and export it as `rootReducer`.
* Use `createStore(rootReducer)` to create the store of the application.
