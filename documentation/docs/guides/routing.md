---
title: Routing
path: /routing/
---

# Component-based routing

Fusion apps can use the [fusion-plugin-react-router](/api/fusion-plugin-react-router) to integrate routing features into the component tree. The plugin uses `react-router` under the hood, and exposes a similar API that you can use to add routing behavior anywhere in your component tree.

### Example

```js
import React from 'react';
import {
  Router,
  Route,
  Link,
  Switch,
  NotFound,
} from 'fusion-plugin-react-router';

const Home = () => <div>Hello</div>;
const Test = () => <div>Test</div>;
const PageNotFound = () => (
  <NotFound>
    <div>404</div>
  </NotFound>
);

const root = (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/test">Test</Link>
      </li>
      <li>
        <Link to="/404">404</Link>
      </li>
    </ul>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/test" component={Test} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);
```

## Async loading routes

The [fusion-plugin-react-router](/api/fusion-plugin-react-router) integrates nicely with the [fusion-react](/api/fusion-react) library to support async loading routes. This means that you will only load the code for the route that the user is currently visiting, and can make significant performance improvements to your application.

### Example

```js
// src/components/root.js
import React from 'react';
import {split} from 'fusion-react';
import {Route} from 'fusion-plugin-react-router';

const LoadingComponent = () => <div>Loading...</div>;
const ErrorComponent = () => <div>Error loading component</div>;
const BundleSplitHello = split({
  load: () => import('./components/hello'),
  LoadingComponent,
  ErrorComponent
});

const root = (
  <div>
    <div>This is part of the initial bundle</div>
    <Route path="/hello" component={BundleSplitHello} />
  </div>
)
export default root;

// ...
// src/components/hello.js
export default () => (
  <div>
    This is part of a separate bundle that gets loaded asynchronously
    when the BundleSplit component gets mounted
  </div>
)
```

## Working with URL parameters

Let's look at how to use URL parameters as arguments to data fetching. We'll build an app that displays links to vehicles and when a user clicks on one, it will display some information about that vehicle.

Let's define the states of our application:

* viewing the links to vehicles
* viewing a page for a valid vehicle
* viewing a page for a non-existent vehicle (i.e. a bogus vehicle id)

For simplicity, let's put the links on the top of all pages:

```js
// src/components/root.js
import React from 'react';
import {Link} from 'fusion-plugin-react-router';
import Vehicle from './vehicle';

export default (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/vehicle/1234">Valid vehicle</Link>
      </li>
      <li>
        <Link to="/vehicle/0">Invalid vehicle</Link>
      </li>
    </ul>
  </div>
);
```

Next, let's add a parameterized route below our list of links:

```js
// src/components/root.js
import React from 'react';
import {Link, Route} from 'fusion-plugin-react-router';
import Vehicle from './vehicle';

export default (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/vehicle/1234">Valid vehicle</Link>
      </li>
      <li>
        <Link to="/vehicle/0">Invalid vehicle</Link>
      </li>
    </ul>
    <Route path="/vehicle/:id" component={Vehicle} />
  </div>
);
```

Notice that `path="/:id"` matches if the URL is a `/vehicle/` followed by some text. We'll create the `Vehicle` component shortly.

Now, let's create a fake RPC method that returns dummy vehicle data for `id=1234` and an error for `id=0`:

```js
// src/rpc/handlers.js
export default {
  getVehicle: async ({id}) => {
    if (id === '1234') return {make: 'Ford', model: 'Focus'};
    else throw new Error('Invalid vehicle id');
  },
};
```

Note that the parameter is a string.

Let's create a Redux reducer to handle RPC call actions:

```js
// src/redux.js
import {createRPCReducer} from 'fusion-plugin-rpc-redux-react';

export default {
  reducer: createRPCReducer('getVehicle', {
    start: state => ({
      ...state,
      make: '',
      model: '',
      error: '',
    }),
    success: (state, {payload}) => ({
      ...state,
      make: payload.make,
      model: payload.model,
      error: '',
    }),
    failure: (state, {payload}) => ({
      ...state,
      make: '',
      model: '',
      error: payload.message,
    }),
  }),
};
```

Next, let's create a higher order React component that can consume our Redux state and our RPC method. First we compose the `reactor` and a `connect` HOCs

```js
// src/components/vehicle.js
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRPCRedux} from 'fusion-plugin-rpc-redux-react';

const hoc = compose(
  withRPCRedux('getVehicle'),
  connect(({make, model, error}) => ({make, model, error}))
);
```

Now we can create the `Vehicle` component and decorate it with the HOC:

```js
// src/components/vehicle.js
import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRPCRedux} from 'fusion-plugin-rpc-redux-react';

class Vehicle extends React.Component {
  renderLoading() {
    return <div>loading...</div>;
  }
  renderError() {
    return <div>{this.props.error}</div>;
  }
  render() {
    const {make, model, error} = this.props;
    if (error) return this.renderError();
    else if (!make) return this.renderLoading();
    return (
      <table>
        <tbody>
          <tr>
            <th>Make</th>
            <td>{make}</td>
          </tr>
          <tr>
            <th>Model</th>
            <td>{model}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const hoc = compose(
  withRPCRedux('getVehicle'),
  connect(({make, model, loading, error}) => ({make, model, loading, error}))
);

export default hoc(Vehicle);
```

You may have noticed that we're only reading from the Redux state at this point, but we never called `getVehicle` anywhere.

In order to call that method, we first need to access the `:id` parameter that is provided by the URL. This can be found in `props.match.params.id`.

In addition, there are actually two separate scenarios where we need to make a new `getVehicle` call: when a component is created and when it's updated with a different id. These are handled by the `componentDidMount` and `componentDidUpdate` lifecycle methods, respectively. Here's what those two methods end up looking like:

```js
class Vehicle extends React.Component {
  componentDidMount() {
    this.props.getVehicle({id: this.props.match.params.id});
  }
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    const oldId = oldProps.match && oldProps.match.params.id;
    const newId = newProps.match && newProps.match.params.id;
    if (oldId !== newId) {
      this.props.getVehicle({id: newId});
    }
  }
  // ... rest of the render methods
}
```

And here's the complete component file:

```js
// src/components/vehicle.js
import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRPCRedux} from 'fusion-plugin-rpc-redux-react';

class Vehicle extends React.Component {
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    const oldId = oldProps.match && oldProps.match.params.id;
    const newId = newProps.match && newProps.match.params.id;
    if (oldId !== newId) {
      this.props.getVehicle({id: newId});
    }
  }
  componentDidMount() {
    this.props.getVehicle({id: this.props.match.params.id});
  }
  renderLoading() {
    return <div>loading...</div>;
  }
  renderError() {
    return <div>{this.props.error}</div>;
  }
  render() {
    const {make, model, error} = this.props;
    if (error) return this.renderError();
    else if (!make) return this.renderLoading();
    return (
      <table>
        <tbody>
          <tr>
            <th>Make</th>
            <td>{make}</td>
          </tr>
          <tr>
            <th>Model</th>
            <td>{model}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const hoc = compose(
  withRPCRedux('getVehicle'),
  connect(({make, model, loading, error}) => ({make, model, loading, error}))
);

export default hoc(Vehicle);
```

Run `yarn dev` to see the application running at `http://localhost:3000`
