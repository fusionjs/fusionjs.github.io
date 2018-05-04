# Simulation testing

It is often useful to simulate a request/render of a Fusion application. The `fusion-test-utils` library exports some utilities to make this easy.
You can create a `test-app` file that will load your Fusion app from `src/main.js` and register some commonly used mocks. In the following example, we will use that test utility to test a server side render and browser side render of an application including the data fetching it does.

The test in `src/components/__tests__/hello.node.js` tests server-side rendering
and the test in `src/components/__tests__/hello.browser.js` tests browser
rendering.

```js
// src/redux.js
export default {
  reducer: (state, {payload}) => ({...state, ...payload}), // contrived reducer; normally would use proper reducer composition
  preloadedState: {},
};

// src/components/hello.js
import React from 'react';
import {withRPCRedux} from 'fusion-plugin-rpc-redux-react';
import {prepared} from 'fusion-react-async';
import {compose} from 'redux';
import {connect} from 'react-redux';

const Hello = ({name}) => <div>Hello {name}</div>;

export default compose(
  connect(({name}) => ({name})),
  withRPCRedux('getUser'),
  prepared(props => {
    return (
      props.user ||
      props.getUser()
    );
  })
)(Hello);

// src/components/__tests__/hello.node.js
import loadApp from '../../test-utils/test-app';
import React from 'react';
import App from 'fusion-react';
import Redux from 'fusion-plugin-react-redux';
import {mock as MockRPC, RPCHandlersToken, RPCToken} from 'fusion-plugin-rpc-redux-react';
import {test, getSimulator} from 'fusion-test-utils';

test('getUser works', async assert => {
  const app = await loadApp();
  app.register(RPCToken, MockRPC);
  app.register(RPCHandlersToken, {
    async getUser() {
      return {name: 'Bob'}
    }
  });
  const simulator = getSimulator(app);
  const ctx = await render(app, '/');
  assert.ok(ctx.rendered.includes('Bob'), 'returns data');
});

// src/components/__tests__/hello.browser.js
import loadApp from '../../test-utils/test-app';
import React from 'react';
import App from 'fusion-react';
import Redux from 'fusion-plugin-react-redux';
import {mock as MockRPC, RPCHandlersToken, RPCToken} from 'fusion-plugin-rpc-redux-react';
import {test, getSimulator} from 'fusion-test-utils';

test('getUser works', async assert => {
  const app = await loadApp();
  app.register(RPCToken, MockRPC);
  app.register(RPCHandlersToken, {
    async getUser() {
      return {name: 'Bob'}
    }
  });
  const simulator = getSimulator(app);
  const ctx = await simulator.render(app, '/');
  assert.equal(ctx.rendered.find(Hello).text(), 'Hello Bob', 'renders');
});
```
