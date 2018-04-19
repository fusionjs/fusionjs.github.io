---
title: State management
date:  2017-10-31
path: /state-management/
category: Guides
---

# State management

### Redux

Redux is the recommended state management library for web applications at Uber. Fusion.js provides Redux integrations for its RPC plugins, and there are also [open source developer tools available](https://github.com/zalmoxisus/redux-devtools-extension).

If you've never used Redux, refer to the [required knowledge](/docs/getting-started/required-knowledge#redux) section.

---

### Where to put reducers

We recommend exporting a root reducer from `src/redux.js`:

```js
export default {
  reducer: myReducer,
};
```

For example, given a state tree `{count: 0}` that responds to an action `{type: 'INCREMENT'}`, you would export this:

```js
export default {
  reducer: (state, action) => ({
    count: state.count + (action.type === 'INCREMENT' ? 1 : 0),
  }),
};
```

**Note**: Unlike the example above, you should typically refactor a root reducer so that each key in the state object is handled by its own reducer. See [`combineReducers`](https://redux.js.org/docs/api/combineReducers.html).

The Fusion.js [fusion-plugin-react-redux plugin](/api/fusion-plugin-react-redux) will setup a provider for you, so you don't need to manually wrap your React tree with a provider.

Use `connect` from `react-redux` to expose redux state to React props:

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

To see how to integrate Redux with RPC calls, refer to the [fetching data](/docs/guides/fetching-data) section.

---

### Where to put enhancers

If you need to add [enhancers](https://github.com/reactjs/redux/blob/master/docs/Glossary.md#store-enhancer) or [middlewares](https://github.com/reactjs/redux/blob/master/docs/Glossary.md#middleware), export them like this:

```js
export default {
  reducer,
  enhancer: myEnhancer,
};
```
