---
title: Forms
path: /forms/
---

# Adding and submitting a form

In this tutorial we look at how to create a simple form that prints out the value from an input when a button is pressed. For a bit more realism, we'll make the output value be set via an RPC call.

Before we start, let's sketch out what we want to display to the user:

```html
<form>
  <input />
  <button>Click me</button>
  <p>You wrote: ...</p>
</form>
```

Let's create a React component that looks like that:

```js
// src/components/form.js
import React from 'react';

const Form = () => (
  <form>
    <input />
    <button>Click me</button>
    <p>You wrote: ...</p>
  </form>
);

export default Form;
```

In order to see this component, reference it in `src/components/root.js`.

```js
// src/components/root.js
import Form from './form';

export default <Form />;
```

You can run the app via `yarn dev`, which should open a browser window pointing at `http://localhost:3000`.

Next, let's model our Redux store. We need a property to store the value of the input and a value to store the value that comes back from the server after an RPC call.

```js
{
  input: '',
  output: '',
}
```

We also need to dispatch an action when the input value changes, and another when the button is pressed.

Here's the reducer for setting the form input value:

```js
// src/reducers/form.js
export const input = (state, {type, value}) => {
  return type === 'SET_INPUT' ? value : state;
};
```

For submitting, we'll create an RPC reducer:

```js
// src/reducers/form.js (continued)
import {withRPCRedux} from 'fusion-plugin-rpc-redux-react';

const reducers = {
  start: state => state,
  success: (state, {value}) => value,
  failure: state => state,
};
export const output = withRPCRedux('submit', reducers, '');
```

Finally, let's compose the reducers into a root reducer:

```js
// src/redux.js
import {input, output} from './reducers/form.js';

export default {
  reducer: (state = {}, action) => ({
    input: input(state.input, action),
    output: output(state.output, action),
  }),
};
```

Next, let's expose the state and actions to the React component. To do that, we need to compose an HOC:

```js
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRPCRedux} from 'fusion-plugin-rpc-redux-react';

const hoc = compose(
  withRPCRedux('submit'),
  connect(
    ({input, output}) => ({input, output}),
    dispatch => ({
      setInput({value}) {
        dispatch({type: 'SET_INPUT', value});
      },
    })
  )
);
```

Now we can decorate the `Form` component:

```js
export default hoc(Form);
```

`Form` now receives the following props: `input`, `output` (via the mapStateToProps argument in `connect`), `setInput` (via `mapDispatchToProps`), and `submit` (via `withRPCRedux('submit', ...)`.

We can then wire up the React elements:

```js
const Form = ({input, output, setInput, submit}) => (
  <form>
    <input onInput={e => setInput({value: e.target.value})} value={input} />
    <button type="button" onClick={() => submit({value: input})}>
      Click me
    </button>
    {output && <p>You wrote: {output}</p>}
  </form>
);
```

As a final step, let's implement the server handler for the `submit` RPC call:

```js
// src/rpc/handlers.js
import {createPlugin} from 'fusion-core';

export default createPlugin({
  provides() {
    return {submit: value => value};
  },
});
```

Here's how the code looks when everything is put together:

```js
// src/redux.js
import {input, output} from './reducers/form.js';

export default {
  reducer: (state = {}, action) => ({
    input: input(state.input, action),
    output: output(state.output, action),
  }),
};

// src/reducers/form.js
import {createRPCReducer} from 'fusion-rpc-redux';

export const input = (state = '', {type, value}) => {
  return type === 'SET_INPUT' ? value : state;
};

const reducers = {
  start: state => state,
  success: (state, {payload}) => payload.value,
  failure: state => state,
};
export const output = createRPCReducer('submit', reducers, '');

// src/rpc/handlers.js
import {createPlugin} from 'fusion-core';

export default createPlugin({
  provides() {
    return {submit: value => value};
  },
});

// src/components/form.js
import React from 'react';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRPCRedux} from 'fusion-plugin-rpc-redux-react';

const hoc = compose(
  withRPCRedux('submit'),
  connect(
    ({input, output}) => ({input, output}),
    dispatch => ({
      setInput({value}) {
        dispatch({type: 'SET_INPUT', value});
      },
    })
  )
);

const Form = ({input, output, setInput, submit}) => (
  <form>
    <input onInput={e => setInput({value: e.target.value})} value={input} />
    <button type="button" onClick={() => submit({value: input})}>
      Click me
    </button>
    {output && <p>You wrote: {output}</p>}
  </form>
);

export default hoc(Form);

// src/components/root.js
import Form from './form';

export default <Form />;
```

### Running the app

Don't forget to run `cerberus` from the command line. Then start the app via `yarn dev`.
