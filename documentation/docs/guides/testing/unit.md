# Unit testing

Use unit testing to ensure that your methods behave as expected within the browser and Node environments.

### Testing a Redux reducer

#### Simple reducer

Testing Redux reducers is straightforward. Just call the reducer function with
the initial state and action you want, and assert on the shape of the returned
state.

```js
// src/redux.js
export default {
  reducer: (state, action) => state || {myDefaultState: 'foo'},
};

// src/__tests__/redux.node.js
import reduxOptions from '../redux';

test('Empty action', assert => {
  const state = reduxOptions.reducer(undefined, {});
  const expectedState = {myDefaultState: 'foo'};

  assert.deepEqual(state, expectedState, 'returns default state');
});
```

#### RPC reducer

RPC calls can trigger 3 different actions (start, success, failure). The names
for these action types are the RPC method name in all caps snake case followed
by either `_START`, `_SUCCESS` or `_FAILURE`). To test each case, pass an action
with the appropriate type.

```js
// src/reducers/user.js
export default createRPCReducer('getUser', {
  start: () => ({
    loading: true,
    user: null,
    error: null,
  }),
  success: (s, action) => ({
    user: action.payload.user,
    error: null,
    loading: false,
  }),
  failure: (s, action) => ({
    loading: false,
    error: action.payload,
    user: null,
  }),
});

// src/reducers/__tests__/user.node.js
import userReducer from '../user';

test('Empty action', assert => {
  const state = userReducer(undefined, {});
  const expectedState = {data: {}};

  assert.deepEqual(state, expectedState, 'returns default state');
});

test('getUser start', assert => {
  const action = {type: 'GET_USER_START', payload: {}};
  const state = userReducer(undefined, action);
  const expectedState = {user: null, error: null, loading: true};

  assert.deepEqual(state, expectedState, 'enables isLoading');
});

test('getUser success', assert => {
  const initialState = {user: null, error: null, loading: true};
  const action = {type: 'GET_USER_SUCCESS', payload: {user: {name: 'My Name'}}};
  const state = userReducer(initialState, action);
  const expectedState = {user: {name: 'My Name'}, error: null, loading: false};

  assert.deepEqual(state, expectedState, 'adds user and disables isLoading');
});

test('getUser failure', assert => {
  const initialState = {user: null, error: null, loading: true};
  const action = {
    type: 'GET_USER_FAILURE',
    payload: {error: 'Something went wrong'},
  };
  const state = userReducer(initialState, action);
  const expectedState = {
    user: null,
    error: 'Something went wrong',
    loading: false,
  };

  assert.deepEqual(state, expectedState, 'adds error and disables isLoading');
});
```

Normally, rather than testing RPC reducers in isolation, it's more convenient
and robust to write integration tests.
