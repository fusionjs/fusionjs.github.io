---
title: State management
path: /state-management/
---

# State management

State management can be accomplished in different ways:

1. Using React local component state / React Hooks (`useState`)
2. Integrating with a library like Redux

Generally, smaller projects will be fine with just using local state. Larger projects may benefit from having a central state management system like Redux. Practically, you'll find that a combination of both will be best. Local state for components that contain data that is not important to any other parts of your app. Redux for data that needs to be shared across the app.

### Using Redux

Redux is a state management library for web applications and works especially well with React. Redux integrations are provided via the [fusion-plugin-react-redux](/api/fusion-plugin-react-redux) plugin. For debugging, the plugin supports [`redux-devtools-extension`](https://github.com/zalmoxisus/redux-devtools-extension) out of the box.

### Configuration

In addition to the plugin itself, [`fusion-plugin-react-redux`](/api/fusion-plugin-react-redux) exports a handful of tokens that can be used to customize the Redux setup.

```js
// The plugin itself
app.register(ReduxToken, ReactReduxPlugin);
// Root reducer
app.register(ReducerToken, reduxOptions.reducer);
 // Any special enhancers for the Redux store
app.register(EnhancerToken, ActionEmitterEnhancerPlugin);
```

Under the hood, the plugin will set up a provider for you so you don't need to manually wrap your React tree with a provider. This occurs on both the client and the server and the plugin will handle hydration of the client side store. This means that any actions that fire on the server that change the current Redux state will be reflected on the client.

### Reducers

[`fusion-plugin-react-redux`](/api/fusion-plugin-react-redux) expects a reducer to be registered to `ReducerToken`. We can define that in `src/redux.js`:

```js
// src/redux.js
export default {
  reducer: myReducer,
};
```

For example, given a state tree `{count: 0}` that responds to an action `{type: 'INCREMENT'}`, you would export this:

```js
// src/redux.js
export default {
  reducer: (state, action) => ({
    count: state.count + (action.type === 'INCREMENT' ? 1 : 0),
  }),
};
```

**Note**: Unlike the example above, you should typically refactor a root reducer so that each key in the state object is handled by its own reducer. See [`combineReducers`](https://redux.js.org/docs/api/combineReducers.html).

### Components

Use `connect` from `react-redux` to expose the Redux state to React props:

```js
// src/components/root.js
import {connect} from 'react-redux';

const hoc = connect(
  ({count}) => ({count}), // copies state.count into props.count
  dispatch => ({
    // defines that props.increment dispatches a `INCREMENT` action
    increment() {
      dispatch({type: 'INCREMENT'});
    },
  })
);

const Component = ({count, increment}) => (
  <button onClick={increment}>{count}</button>
);

export default hoc(Component);
```

### Enhancers

If you need to add [enhancers](https://github.com/reactjs/redux/blob/master/docs/Glossary.md#store-enhancer) or [middlewares](https://github.com/reactjs/redux/blob/master/docs/Glossary.md#middleware), export them like this:

```js
// src/redux.js
export default {
  reducer,
  enhancer: myEnhancer,
};
```
